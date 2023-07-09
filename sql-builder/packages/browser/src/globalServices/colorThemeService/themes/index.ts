import type {IColorTheme} from '../interface'
import {oneDarkProTheme} from './oneDarkPro'
import {githubPlusTheme} from './githubPlus'

export const builtThemes: IColorTheme[] = [
    oneDarkProTheme,
    githubPlusTheme
]

export const defaultThemeId =  oneDarkProTheme.id