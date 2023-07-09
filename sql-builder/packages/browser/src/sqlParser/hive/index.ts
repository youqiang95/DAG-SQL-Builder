import antlr4 from 'antlr4';
import MyGrammarLexer from './HiveLexer';
import MyGrammarParser from './HiveParser';
import {ExecStatementContext} from './HiveParser'
import type {RegularBodyContext} from './HiveParser'
import MyGrammarVisitor from './HiveParserVisitor';


class CustomVisitor extends MyGrammarVisitor<any> {
    columns: string[]
    constructor () {
        super();
        this.columns = []
    }

    visitRegularBody = (ctx: RegularBodyContext) =>{
        const root = ctx.parentCtx?.parentCtx?.parentCtx
        if(!(root instanceof ExecStatementContext)){
            return
        }
        const selectItemList = ctx.selectStatement()?.atomSelectStatement()?.selectClause()?.selectList()?.selectItem_list()
        if(selectItemList){
            for(let selectItem of selectItemList){
                const idList = selectItem.id__list()
                if(idList && idList.length>0){
                    for(let colIdCtx of idList){
                        if(colIdCtx.Identifier()){
                            const columnSplits = colIdCtx.Identifier().getText().split('.')
                            this.columns.push(columnSplits[columnSplits.length - 1])
                        }
                        else if (colIdCtx.nonReserved()){
                            this.columns.push(colIdCtx.nonReserved().getText())
                        }
                        else {
                            this.columns.push(colIdCtx.getText())
                        }                       
                    }
                }
                else {
                    const columnSplits = selectItem.getText().split('.')
                    this.columns.push(columnSplits[columnSplits.length - 1])
                }
            }
        }
    }
  }

export const extractColumnsFromSql = (sql:string)=>{
    try {
      const chars = new antlr4.InputStream(sql);
      const lexer = new MyGrammarLexer(chars);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new MyGrammarParser(tokens);
      const tree = parser.statement()
      const visitor = new CustomVisitor()
      tree.accept(visitor)
      const data = {
          columns: visitor.columns,
          asteriskTables: [],
          unnamedExpr: []
      }
      return data
    } catch (error) {
      console.log('extractColumnsFromSql:error', error)
      return {
          columns: [],
          asteriskTables: [],
          unnamedExpr: []
      }
    }
  }