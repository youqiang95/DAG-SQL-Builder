import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef, MenuProps } from 'antd';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import {MonacoEditorCustom} from '@/components/monaco'
import {genUniqId} from '@/common'
import { MenuOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Dropdown, Space } from 'antd';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  columnName: string;
  transform: string | null;
  source: string
}

interface EditableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  'data-row-key': string;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  })
  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 })?.replace(
      /translate3d\(([^,]+),/,
      'translate3d(0,',
    ),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  }

  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
          {React.Children.map(children, (child) => {
            if ((child as React.ReactElement).key === 'sort') {
              return React.cloneElement(child as React.ReactElement, {
                children: (
                  <MenuOutlined
                    ref={setActivatorNodeRef}
                    style={{ touchAction: 'none', cursor: 'move' }}
                    {...listeners}
                  />
                ),
              });
            }
            return child;
          })}
        </tr>
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const initTransformCode = dataIndex === 'transform' ? record[dataIndex] : ''
  const [transformCode, setTransformCode] = useState<string>(initTransformCode)
  const getMonacoEditorValueFunc = useRef<()=>string>(null)
  const inputRef = useRef<InputRef>(null);
  const cellEditorRef = useRef<HTMLDivElement>(null);
  const form = useContext(EditableContext)!;
  const isRequire = dataIndex === 'columnName'

  const resolveGetMonacoEditorValue = (func:()=>string)=>{
    getMonacoEditorValueFunc.current = func
  }

  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current.focus();
      cellEditorRef.current && cellEditorRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const onSureCellEditorValue = ()=>{
    if(getMonacoEditorValueFunc.current){
      const value = getMonacoEditorValueFunc.current()
      let newRecord = {...record}
      newRecord[dataIndex] = value
      handleSave(newRecord)
    }
    toggleEdit();
  }

  let childNode = children;

  if (editable) {
    if((dataIndex !== 'transform') && (dataIndex !== 'source') && (dataIndex !== 'columnName')){
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[
            {
              required: isRequire,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24, minHeight:20 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
    else {
      // use monaco editor
      childNode = editing ? (
        <div className='editable-cell-editor' ref={cellEditorRef}>
          <MonacoEditorCustom
            value={record[dataIndex]}
            language={'sql'}
            monacoModelId={record.key}
            onValueChange={(newValue: string)=>{}}
            resolveGetEditorValue={resolveGetMonacoEditorValue}
          />
          <span className='editable-cell-editor-buttons'>
            <Button className='editable-cell-editor-button' type="primary" onClick={onSureCellEditorValue}>确认</Button>
            <Button className='editable-cell-editor-button' type="primary" onClick={toggleEdit}>取消</Button>
          </span>
        </div>
      ) : (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24, minHeight:20 }} onClick={toggleEdit}>
          {children}
        </div>
      );
    }
  }
  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  columnName: string;
  transform: string | null;
  source: string;
  
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type BatchEditType = 'columnName' | 'transform' | 'source'
interface IBatchEditorButton {
  disabled:boolean,
  save: (editType: BatchEditType, value:string)=>void
}

const BatchEditorButton: React.FC<IBatchEditorButton> = (props)=>{
  const {disabled, save} = props
  const [isEditorOpen, setIsEditorOpen] = React.useState<boolean>(false)
  const [batchEditType, setBatchEditType] = React.useState<BatchEditType>(null)
  const getMonacoEditorValueFunc = useRef<()=>string>(null)
  const onOpenColumnNameEditor = () => {
    setBatchEditType('columnName')
    setIsEditorOpen(true)
  }
  const onOpenTransformEditor = () => {
    setBatchEditType('transform')
    setIsEditorOpen(true)
  }
  const onOpenSourceEditor = () => {
    setBatchEditType('source')
    setIsEditorOpen(true)
  }
  const closeEditor = ()=>{
    setIsEditorOpen(false)
  }
  const onEditorSure = ()=>{
    if(getMonacoEditorValueFunc.current){
      const value = getMonacoEditorValueFunc.current()
      save(batchEditType, value)
    }
    closeEditor();
  }
  const resolveGetMonacoEditorValue = (func:()=>string)=>{
    getMonacoEditorValueFunc.current = func
  }
  const items: MenuProps['items'] = [
    {
      label: <a onClick={onOpenColumnNameEditor}>列名</a>,
      key: '0',
    },
    {
      label: <a onClick={onOpenTransformEditor} >转换逻辑</a>,
      key: '1',
    },
    {
      label: <a onClick={onOpenSourceEditor} >来源</a>,
      key: '2',
    },
  ]
  return (
    <div className='editable-table-batch-edit-button'>
      <Dropdown disabled={disabled} menu={{ items }} trigger={['click']}>
        <Button disabled={disabled} type="primary" onClick={(e) => e.preventDefault()}>
          <Space>
            批量编辑
          </Space>
        </Button>
      </Dropdown>
      {
        isEditorOpen &&
        <div className='editable-table-batch-editor'>
          <MonacoEditorCustom
                value={''}
                language={'sql'}
                monacoModelId={genUniqId()}
                onValueChange={(newValue: string)=>{}}
                resolveGetEditorValue={resolveGetMonacoEditorValue}
          />
          <Space align='center'>
              <Button type="primary" onClick={onEditorSure}>确认</Button>
              <Button type="primary" onClick={closeEditor}>取消</Button>
          </Space>
        </div>
      }
    </div>
  )
}

interface IBatchDeleteButtonProps {
  handleDelete: ()=>void,
  disabled: boolean
}
const BatchDeleteButton: React.FC<IBatchDeleteButtonProps> = (props)=>{
  const {handleDelete, disabled} = props
  return (
    <Popconfirm title="确定批量删除?" disabled={disabled} onConfirm={() =>handleDelete()}>
      <Button type="primary" disabled={disabled} >批量删除</Button>
    </Popconfirm>
  )
}

const fixColumnName = (name:string, existNameList: string[])=>{
  if(existNameList.findIndex(existName=>existName === name)>=0){
    return fixColumnName(name + '_copy', existNameList)
  }
  else{
    return name
  }
}

interface IProps {
  dataSource: Item[],
  onDataSourceChange: (newData: Item[])=>void
}

export const EditableColumnsTable: React.FC<IProps> = (props) => {
  const {onDataSourceChange} = props
  const [dataSource, setDataSource] = React.useState<Item[]>(props.dataSource)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    onDataSourceChange(newData)
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      key: 'sort',
      title: '拖动工具',
      width: '5%'
    },
    {
      title: '列名',
      dataIndex: 'columnName',
      width: '20%',
      editable: true,
      // ellipsis: true
    },
    {
      title: '转换逻辑',
      dataIndex: 'transform',
      editable: true,
      // ellipsis: true,
      width: '40%',
    },
    {
      title: '来源',
      dataIndex: 'source',
      editable: true,
      // ellipsis: true,
      width: '20%'
    },
    {
      title: '删除',
      dataIndex: 'delete',
      width: '20%',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newRowData: DataType = {
      key: genUniqId(),
      columnName: fixColumnName('new_column', dataSource.map(item=>item.columnName)),
      transform: '',
      source: ''
    };
    const newData = [...dataSource, newRowData]
    setDataSource(newData);
    onDataSourceChange(newData)
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    onDataSourceChange(newData)
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  const onSelectRowsChange = (selectedRowKeys: string[])=>{
    setSelectedRowKeys(selectedRowKeys)
  }
  const saveBatch = (editType: BatchEditType, value:string)=>{
    const newData = [...dataSource];
    let columnIndex = null
    if(editType === 'columnName'){
      columnIndex = 'columnName'
    }
    else if(editType === 'transform'){
      columnIndex = 'transform'
    }
    else if(editType === 'source'){
      columnIndex = 'source'
    }
    if(!columnIndex){
      return 
    }
    for(let selectedRowKey of selectedRowKeys){
      const index = newData.findIndex((item) => selectedRowKey === item.key);
      let item = newData[index];
      item[columnIndex] = value
      newData.splice(index, 1, {
        ...item,
      });
    }
    setDataSource(newData);
    onDataSourceChange(newData)
  }

  const deleteBatch = ()=>{
    const newData = dataSource.filter((item) =>{
      return selectedRowKeys.findIndex((selectKey)=>selectKey === item.key) <0
    });
    setDataSource(newData);
    onDataSourceChange(newData)
  }

  const addColumnsBatch = ()=>{
    let newData = [...dataSource]
    for(let selectedRowKey of selectedRowKeys){
      const findRow = newData.find(item=>item.key === selectedRowKey)
      if(!findRow){
        continue
      }
      let newRow = {...findRow}
      newRow.key = genUniqId()
      newRow.columnName = fixColumnName(newRow.columnName, newData.map(row=>row.columnName))
      newRow.transform = ''
      newData.push(newRow)
    }
    setDataSource(newData)
    onDataSourceChange(newData)
  }

  React.useEffect(()=>{
    const newSelectedRowKeys = selectedRowKeys.filter((selectKey)=>{
      return dataSource.findIndex(row=>row.key===selectKey)>=0
    })
    setSelectedRowKeys(newSelectedRowKeys)
  }, [dataSource])

  React.useEffect(()=>{
    setDataSource(props.dataSource)
  }, [props.dataSource])

  return (
    <div>
        <div className='editable-table-operate'>
          <Space align='center'>
            <Button onClick={handleAdd} type="primary">
                新增列名
            </Button>
            <BatchEditorButton disabled={selectedRowKeys.length<=0} save={saveBatch}/>
            <BatchDeleteButton disabled={selectedRowKeys.length<=0} handleDelete={deleteBatch}/>
            <Button disabled={selectedRowKeys.length<=0} onClick={addColumnsBatch} type="primary">
                批量复制列
            </Button>
          </Space>
        </div>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys,
                  onChange: onSelectRowsChange
                }}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
                pagination={false}
                // rowKey="key"
            />
          </SortableContext>
        </DndContext>
    </div>
  );
};