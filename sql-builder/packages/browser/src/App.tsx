import molecule, { create} from '@dtinsight/molecule'
import '@dtinsight/molecule/esm/style/mo.css'
import extensions from './molecule-extensions'
import MyWorkbench from './components/workbench'
import {STORE_KEY} from '@dtinsight/molecule/esm/i18n/localeService'
import {sendPOSTRequest} from './api'
import ErrorPage from '@/components/errorPage'
import {useErrorPageStatusModel} from '@/globalServices'

// const MonacoEditor = molecule.component.MonacoEditor

window.addEventListener('error', (event) => {
    sendPOSTRequest('/api/clientReportError', {
        value: JSON.stringify({
            type: 'error',
            stack: (event.error && event.error.stack) || '',
            message: event.message || '',
            fileName: event.filename || ''
        })
    })
})

window.addEventListener('unhandledrejection', (event) => {
    sendPOSTRequest('/api/clientReportError', {
        value: JSON.stringify({
            type: 'unhandledrejection',
            stack: (event.reason && event.reason.stack) || ''
        })
    })
})
  
const moInstance = create({
    extensions: extensions,
})

moInstance.onBeforeInit(() => {
    // molecule.builtin.inactiveModule('activityBarData');
    localStorage.setItem(STORE_KEY, 'zh-CN')
})

moInstance.onBeforeLoad(() => {
    molecule.extension.inactive((ext) => {
        // Inactive the Extension which id is ExampleExt
        return ext.id === 'ExtendsFolderTree';
    });
});

const App = () => {
    const {isOpen} = useErrorPageStatusModel()
    if(!isOpen){
        return moInstance.render(<MyWorkbench />)
    }
    else {
        return <ErrorPage/>
    }
    
}
export default App