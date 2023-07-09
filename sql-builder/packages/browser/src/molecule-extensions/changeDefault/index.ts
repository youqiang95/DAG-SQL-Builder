import { IExtension } from '@dtinsight/molecule/esm/model/extension'
import { IExtensionService } from '@dtinsight/molecule/esm/services'
import {changeDefaultFn} from './changeFn'
import './index.less'

export class ChangeDefaultExtension implements IExtension {
    id: string = 'ChangeDefaultExtension';
    name: string = 'ChangeDefaultExtension';

    constructor(
        id: string = 'ChangeDefaultExtension', 
        name: string = 'ChangeDefaultExtension'
    ) {
        this.id = id;
        this.name = name;
    }

    activate(extensionCtx: IExtensionService): void {
        // change setting data
        changeDefaultFn()
    }

    dispose(extensionCtx: IExtensionService): void {
        throw new Error('Method not implemented.');
    }
}