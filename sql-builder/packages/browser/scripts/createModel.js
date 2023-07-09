const fs = require('fs')
const path = require('path')

const getCommonName = (name, dirName) => {
    return {
        modelInterfaceName: 'I' + name,
        modelClassName: name + 'Model',
        servicesInterfaceName: 'I' + name + 'Service',
        servicesClassName: name + 'Service',
        controllerInterfaceName: 'I' + name + 'Controller',
        controllerclassName: name + 'Controller'
    }
}

const genModelCode = (name, dirName)=>{
    const {modelInterfaceName, modelClassName} = getCommonName(name, dirName)
    const template = `// define model 
export interface ${modelInterfaceName} {
}

// 
export class ${modelClassName} implements ${modelInterfaceName} {
    constructor() {

    }
}`
    const writePath = path.join(dirName, 'model.ts')
    fs.writeFileSync(writePath, template)
} 

const genServicesCode = (name, dirName) => {
    const {
        modelInterfaceName, 
        modelClassName, 
        servicesInterfaceName, 
        servicesClassName
    } = getCommonName(name, dirName)
    const template = `import 'reflect-metadata';
import { singleton, container } from 'tsyringe';
import React from 'react'
import molecule from '@dtinsight/molecule'
import {${modelInterfaceName}, ${modelClassName}} from './model'

const Component = molecule.react.Component

export interface ${servicesInterfaceName} extends molecule.react.Component<${modelInterfaceName}> {
    
}

@singleton()
export class ${servicesClassName}
    extends Component<${modelInterfaceName}>
    implements ${servicesInterfaceName}
{
    protected state: ${modelInterfaceName};

    constructor() {
        super();
        this.state = container.resolve(${modelClassName});
    }
}

export const get${servicesClassName}= () =>{
    return container.resolve(${servicesClassName})
}

export const use${modelClassName} = ()=>{
    const service = get${servicesClassName}()
    const [model, setModel] = React.useState<${modelInterfaceName}>(service.getState())
    React.useEffect(()=>{
        service.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [service])
    return model
}
`
    const writePath = path.join(dirName, 'services.ts')
    fs.writeFileSync(writePath, template)
}

const genControllerCode = (name, dirName) => {
    const {
        servicesInterfaceName, 
        servicesClassName,
        controllerInterfaceName,
        controllerclassName
    } = getCommonName(name, dirName)
    const controllerPropServiceName = servicesClassName.charAt(0).toLowerCase() + servicesClassName.slice(1)
    const template = `import 'reflect-metadata';
import molecule from '@dtinsight/molecule'
import { container, singleton } from 'tsyringe';
import { ${servicesInterfaceName}, ${servicesClassName} } from './services';

const Controller = molecule.react.Controller
type Controller = molecule.react.Controller

export interface ${controllerInterfaceName} extends Partial<Controller> {
    
}

@singleton()
export class ${controllerclassName}
    extends Controller
    implements ${controllerInterfaceName}
{
    private readonly ${controllerPropServiceName}: ${servicesInterfaceName};

    constructor() {
        super();
        this.${controllerPropServiceName} = container.resolve(${servicesClassName});
    }

    public initView() {}
}`
    const writePath = path.join(dirName, 'controller.ts')
    fs.writeFileSync(writePath, template)
}

const run = (dirName, name) => {
    genModelCode(name, dirName)
    genServicesCode(name, dirName)
    genControllerCode(name, dirName)
}

const argv = process.argv.slice(2)

// argv[0]: dirname  argv[1]: name
run(argv[0], argv[1])


