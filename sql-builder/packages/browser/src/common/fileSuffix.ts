export const getFileSuffixByLanguage = (lang: string)=>{
    switch(lang){
        case 'sqlgraph':
            return '.sg'
        case 'sql':
            return '.sql'
        case 'javascript':
            return '.js'
        case 'typescript':
            return '.ts'
        case 'python':
            return '.py'
        case 'java':
            return '.java'
        case 'textile':
            return '.txt'
        default:
            return ''
    }
}