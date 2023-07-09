
const data = {
    err: null,
    result: {
        id: 0,
        name: "Molecule-Demo",
        fileType: "RootFolder",
        location: "Molecule-Demo",
        isLeaf: false,
        data: "",
        children: [
            {
                id: 1,
                name: "test.js",
                location: "Molecule-Demo/test.js",
                fileType: "File",
                isLeaf: true,
                data: { language: "javascript", value: "console.log('Hello World');" }
            }, {
                id: 2,
                name: "test.css",
                fileType: "File",
                location: "Molecule-Demo/test.css",
                isLeaf: true,
                data: { language: "css", value: "mo { background-color: var(--workbenchBackground); color: var(--foreground); }" }
            }, {
                id: 5,
                name: "Sub Folder",
                isLeaf: false,
                fileType: "Folder",
                location: "Molecule-Demo/Sub Folder",
                children: [{
                    id: 11,
                    name: "test.js",
                    fileType: "File",
                    location: "Molecule-Demo/Sub Folder/test.js",
                    isLeaf: true,
                    data: { language: "javascript", value: "console.log('Hello World');" }
                }, {
                    id: 14,
                    name: "test.json",
                    location: "Molecule-Demo/Sub Folder/test.json",
                    isLeaf: true,
                    fileType: "File",
                    data: { language: "json", value: "{ \"language\": \"json\", \"value\": \"{}\" }" }
                }]
            },
            {
                id: 3,
                name: "haha.sg",
                fileType: "File",
                location: "Molecule-Demo/haha.sg",
                isLeaf: true,
                data: { language: "sqlgraph", value: {graphData: {nodes:[], edges:[]}, graphParams:{}}}
            }
        ]
    }
}

export default data