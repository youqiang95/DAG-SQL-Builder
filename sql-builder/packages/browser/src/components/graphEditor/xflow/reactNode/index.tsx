import React from 'react'
import {
  ConsoleSqlOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import {Tooltip } from 'antd'
import type { NsGraph } from '@antv/xflow'
import './index.less'

// code node
export const CodeNode: NsGraph.INodeRender = props => {
    return (
      <div className='xflow-code-node'>
            <span className="icon">
                <ConsoleSqlOutlined />
            </span>
            <Tooltip placement="topRight" mouseEnterDelay={0.5} title={props.data.label}>
                <span className="label">{props.data.label} </span>
            </Tooltip>
      </div>
    )
}


// source node
export const SourceNode: NsGraph.INodeRender = props => {
  return (
    <div className='xflow-source-node'>
          <span className="icon">
              <DatabaseOutlined />
          </span>
          <Tooltip placement="topRight" mouseEnterDelay={0.5} title={props.data.label}>
              <span className="label">{props.data.label} </span>
          </Tooltip>
    </div>
  )
}
