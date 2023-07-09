const Logo = () =>{
    return (
        <img 
            src="SQLHelper.ico"
            className="mo-menuBar--horizontal__logo__content"
        >
        </img>
    )
}

export const menuBarData = {
    data: [
        {
            id: "File", 
            name: "文件", 
            data: [
                {
                    id: "workbench.action.quickCreateFile", 
                    name: "新建文件", 
                    keybinding: "Ctrl+N"
                }
            ]
        },  
        {
            id: "Help", 
            name: "帮助", 
            data: [
                {
                    id: "doc", 
                    name: "帮助文档"
                },
                {
                    id: 'customerSupport',
                    name: "用户支持"
                }
            ]
        },
        {
            id: "Feedback", 
            name: "反馈建议", 
            data: [
                {
                    id: "send_feedback", 
                    name: "提出反馈或建议"
                }
            ]
        },
        {
            id: "Examples", 
            name: "示例", 
            data: []
        }
    ],
    logo: <Logo/>
}