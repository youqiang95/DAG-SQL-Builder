import { IExtension } from '@dtinsight/molecule/esm/model'
import {ChangeDefaultExtension} from './changeDefault'

const extensions: IExtension[] = [
    new ChangeDefaultExtension(),
]

export default extensions;