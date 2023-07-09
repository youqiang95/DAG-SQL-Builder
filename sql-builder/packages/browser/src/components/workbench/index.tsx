import 'reflect-metadata';
import { container } from 'tsyringe';
import { EditorView } from '@dtinsight/molecule/esm/workbench/editor';
import { SidebarView} from '@dtinsight/molecule/esm//workbench/sidebar';
import { ActivityBarView } from '@dtinsight/molecule/esm/workbench/activityBar';
import { StatusBarView } from '@dtinsight/molecule/esm/workbench/statusBar';
import { PanelView } from '@dtinsight/molecule/esm/workbench/panel';
import { MenuBarView } from '@dtinsight/molecule/esm/workbench/menuBar';

import { ID_APP } from '@dtinsight/molecule/esm/common/id';
import { APP_PREFIX } from '@dtinsight/molecule/esm/common/const';
import { classNames, getFontInMac, prefixClaName, getBEMModifier, getBEMElement } from '@dtinsight/molecule/esm/common/className';

import { connect } from '@dtinsight/molecule/esm/react';

import { ILayoutController, LayoutController } from '@dtinsight/molecule/esm/controller/layout';
import { LayoutService } from '@dtinsight/molecule/esm/services';
import { ILayout, MenuBarMode } from '@dtinsight/molecule/esm/model/workbench/layout';
import { IWorkbench } from '@dtinsight/molecule/esm/model/workbench';
import { Display, Pane, SplitPane } from '@dtinsight/molecule/esm/components';

import {CreateFileModal, DeleteFileModal} from '@/components/modals'

const mainBenchClassName = prefixClaName('mainBench');
const workbenchClassName = prefixClaName('workbench');
const compositeBarClassName = prefixClaName('compositeBar');
const appClassName = classNames(APP_PREFIX, getFontInMac());
const workbenchWithHorizontalMenuBarClassName = getBEMModifier(
    workbenchClassName,
    'with-horizontal-menuBar'
);
const withHiddenStatusBar = getBEMModifier(
    workbenchClassName,
    'with-hidden-statusBar'
);
const displayActivityBarClassName = getBEMElement(
    workbenchClassName,
    'display-activityBar'
);

const layoutController = container.resolve(LayoutController);
const layoutService = container.resolve(LayoutService);

function WorkbenchView(props: IWorkbench & ILayout & ILayoutController) {
    const {
        activityBar,
        menuBar,
        sidebar,
        panel,
        statusBar,
        onPaneSizeChange,
        splitPanePos,
        horizontalSplitPanePos,
        onHorizontalPaneSizeChange
    } = props

    const getSizes = () => {
        if (panel.hidden) {
            return ['100%', 0];
        }
        if (panel.panelMaximized) {
            return [0, '100%'];
        }
        return horizontalSplitPanePos;
    };

    const isMenuBarVertical =
        !menuBar.hidden && menuBar.mode === MenuBarMode.vertical;
    const isMenuBarHorizontal =
        !menuBar.hidden && menuBar.mode === MenuBarMode.horizontal;
    const horizontalMenuBar = isMenuBarHorizontal
        ? workbenchWithHorizontalMenuBarClassName
        : null;
    const hideStatusBar = statusBar.hidden ? withHiddenStatusBar : null;
    const workbenchFinalClassName = classNames(
        workbenchClassName,
        horizontalMenuBar,
        hideStatusBar
    );

    const handleSideBarChanged = (sizes: number[]) => {
        if (sidebar.hidden) {
            const clientSize = sizes[1];
            const sidebarSize = splitPanePos[0];
            if (typeof sidebarSize === 'string') {
                // the sideBar size is still a default value
                const numbSize = parseInt(sidebarSize, 10);
                onPaneSizeChange?.([numbSize, clientSize - numbSize]);
            } else {
                onPaneSizeChange?.([sidebarSize, clientSize - sidebarSize]);
            }
        } else {
            onPaneSizeChange?.(sizes);
        }
    }

    return (
        <div id={ID_APP} className={classNames(appClassName, 'myMolecule')} tabIndex={0}>
            <div className={workbenchFinalClassName}>
                <Display visible={isMenuBarHorizontal}>
                    <MenuBarView mode={MenuBarMode.horizontal} />
                </Display>
                <div className={mainBenchClassName}>
                    <div className={compositeBarClassName}>
                        <Display visible={isMenuBarVertical}>
                            <MenuBarView mode={MenuBarMode.vertical} />
                        </Display>
                        <Display
                            visible={!activityBar.hidden}
                            className={displayActivityBarClassName}
                        >
                            <ActivityBarView />
                        </Display>
                    </div>
                    <SplitPane
                        sizes={sidebar.hidden ? [0, '100%'] : splitPanePos}
                        split="vertical"
                        allowResize={[false, true]}
                        onChange={handleSideBarChanged}
                    >
                        <Pane minSize={170} maxSize="80%">
                            <SidebarView />
                        </Pane>
                        {/* <Pane minSize="10%" maxSize="80%">
                            <EditorView />
                        </Pane> */}
                        <SplitPane
                            sizes={getSizes()}
                            showSashes={!panel.hidden && !panel.panelMaximized}
                            allowResize={[true, false]}
                            split="horizontal"
                            onChange={(sizes)=>{
                                onHorizontalPaneSizeChange && onHorizontalPaneSizeChange(sizes)
                            }}
                        >
                            <Pane minSize="10%" maxSize="80%">
                                <EditorView />
                            </Pane>
                            <PanelView />
                        </SplitPane>
                    </SplitPane>
                </div>
            </div>
            <Display visible={!statusBar.hidden}>
                <StatusBarView />
            </Display>
            <CreateFileModal/>
            <DeleteFileModal/>
        </div>
    );
}

export default connect(
    layoutService,
    WorkbenchView,
    layoutController
);
