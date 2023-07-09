import type { ICommandContributionConfig } from '@antv/xflow'
import {CustomCommands} from './cmdDefines'
import {NsAddNodeCmd, AddNodeCmd} from './addNode'
import {NsClearGraphCmd, ClearGraphCommand} from './clearGraph'
import {NsRenameNodeCmd, RenameNodeCommand} from './renameNode'
import {NsGraphRenderCustom, GraphRenderCustomCommand } from './renderGraphCustom'
import {NsAddDownStreamNodeCmd, AddDownStreamNodeCmd} from './addDownStreamNode'

// command contribution
export const commandContributions: ICommandContributionConfig[] = [
    {
        ...NsAddNodeCmd,
        CommandHandler: AddNodeCmd,
    },
    {
      ...NsClearGraphCmd,
      CommandHandler: ClearGraphCommand
    },
    {
        ...NsRenameNodeCmd,
      CommandHandler: RenameNodeCommand
    },
    {
      ...NsGraphRenderCustom,
      CommandHandler: GraphRenderCustomCommand
    },
    {
      ...NsAddDownStreamNodeCmd,
      CommandHandler: AddDownStreamNodeCmd
    }
]

export {
    CustomCommands,
    NsAddNodeCmd, 
    AddNodeCmd,
    NsClearGraphCmd,
    ClearGraphCommand,
    NsRenameNodeCmd,
    RenameNodeCommand,
    GraphRenderCustomCommand,
    NsAddDownStreamNodeCmd,
    AddDownStreamNodeCmd
}
  