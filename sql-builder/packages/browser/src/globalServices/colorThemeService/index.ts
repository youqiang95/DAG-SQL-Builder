import 'reflect-metadata';
import { singleton, container } from 'tsyringe'
import molecule from '@dtinsight/molecule'
import { editor as monacoEditor } from '@dtinsight/molecule/esm/monaco'
import type {IColorTheme} from './interface'
import {builtThemes, defaultThemeId} from './themes'
import React from 'react'

const Component = molecule.react.Component


// define model 
export interface IColorThemeModel {
    themes: Map<string, IColorTheme>,
    currentTheme: IColorTheme
    
}

// 
export class ColorThemeModel implements IColorThemeModel {
    themes: Map<string, IColorTheme>
    currentTheme: IColorTheme
    constructor() {
        this.themes = new Map<string, IColorTheme>()
        for(let theme of builtThemes){
            this.themes.set(theme.id, theme)
        }
        this.currentTheme = this.themes.get(defaultThemeId)  
    }
}


export interface IColorThemeService extends molecule.react.Component<IColorThemeModel> {
    addTheme: (theme: IColorTheme)=>void
    setTheme: (themeId: string)=>void
}

export function convertToCSSVars(colors: object) {
    let cssVars = '';
    for (const id in colors) {
        if (id) {
            const color = colors[id];
            if (color) {
                const colorName = id.replace('.', '-');
                cssVars += `--${colorName}: ${color}; \n`;
            }
        }
    }
    return `
        :root {
            ${cssVars}
        }
    `;
}

export function applyStyleSheetRules(
    styleSheetContent: string,
    rulesClassName: string
) {
    const themeStyles = document.head.getElementsByClassName(rulesClassName);
    if (themeStyles.length === 0) {
        const elStyle = document.createElement('style')
        elStyle.type = 'text/css';
        elStyle.className = rulesClassName;
        elStyle.innerHTML = styleSheetContent;
        document.head.appendChild(elStyle);
    } else {
        (themeStyles[0] as HTMLStyleElement).innerHTML = styleSheetContent;
    }
}

const DEFAULT_THEME_CLASS_NAME = 'custom-color-theme'

@singleton()
export class ColorThemeService
    extends Component<IColorThemeModel>
    implements IColorThemeService
{
    protected state: IColorThemeModel;

    constructor() {
        super();
        this.state = container.resolve(ColorThemeModel)
        this.setTheme(defaultThemeId)
    }

    addTheme = (theme: IColorTheme)=>{
        const preState = {...this.state}
        preState.themes.set(theme.id, {...theme})
        this.setState(preState)
    }

    setTheme = (themeId: string)=>{
        const themeData = this.state.themes.get(themeId)
        if(!themeData){
            return 
        }
        this.setState({
            currentTheme: {...themeData}
        })
        const styleSheetContent = convertToCSSVars(themeData.vsData.colors);
        applyStyleSheetRules(styleSheetContent, DEFAULT_THEME_CLASS_NAME);

        // Update monaco-editor theme
        monacoEditor.defineTheme(DEFAULT_THEME_CLASS_NAME, themeData.monacoData);
        monacoEditor.setTheme(DEFAULT_THEME_CLASS_NAME);
    }
}

export const getColorThemeService = ()=>{
    return container.resolve(ColorThemeService)
}


export const useColorThemeServiceModel = ()=>{
    const colorThemeService = getColorThemeService()
    const [model, setModel] = React.useState<IColorThemeModel>(colorThemeService.getState())
    React.useEffect(()=>{
        colorThemeService.onUpdateState((prevState, nextState)=>{
            setModel({...nextState})
        })
    }, [colorThemeService])
    return model
}