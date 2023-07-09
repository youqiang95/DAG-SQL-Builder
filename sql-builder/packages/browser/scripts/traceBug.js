const { SourceMapConsumer } = require('source-map');
const fs = require('fs')


const getSourceInfoFromSourcemap = (filePath, line, column)=>{
    return new Promise(function(resolve, reject) {
        const sourceMap = fs.readFileSync(filePath, 'utf-8')
        const rawSourceMap = JSON.parse(sourceMap);
        SourceMapConsumer.with(rawSourceMap, null, consumer => {
            const pos = consumer.originalPositionFor({
                line: line,
                column: column,
            });
            const sourceInfo = {
                file: pos.source,
                line: pos.line,
                column: pos.column,
                name: pos.name
            }
            resolve(sourceInfo)
        });
    });
}

const readBugStack = ()=>{
    const bugInfoTxt = fs.readFileSync('./scripts/bugInfo.txt')
    const bugInfo = JSON.parse(bugInfoTxt)
    return bugInfo.stack
}

const parseBugStack = async (stack)=>{
    const regexStr = `editor\\.sqlzhushou\\.com/static/js/(.*?\\.js):(\\d+):(\\d+)`
    const regex = new RegExp(regexStr, 'g')
    const matchStrMap = new Map()
    stack.replaceAll(regex, (matchStr, sourceFile, line, column)=>{
        matchStrMap.set(matchStr, {sourceFile, line, column})
        return matchStr
    })
    let parsed = stack
    for(let [k, v] of matchStrMap){
        const {sourceFile, line, column} = v
        const sourceMapFile = './build/static/js/' + sourceFile + '.map'
        const sourceInfo = await getSourceInfoFromSourcemap(sourceMapFile, parseInt(line), parseInt(column))
        const newLine = sourceInfo.file + ':' + sourceInfo.line + ':' + sourceInfo.column
        parsed = parsed.replaceAll(k, newLine)
    }
    return parsed
}

const run = async ()=>{
    const stack = readBugStack()
    console.log('-------------- target stack ---------')
    console.log(stack)
    
    const parsed = await parseBugStack(stack)
    console.log('-------------- source stack ---------')
    console.log(parsed)

}

run().then()