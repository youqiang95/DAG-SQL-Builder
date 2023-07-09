# DAG-SQL-Builder

## Introduction:
  DAG-SQL-Builder is an editor that helps data developers write complex SQL. It advocates using DAG (Directed acyclic graph) to combine simple SQL to build complex SQL, Through this approach, you will have easier control over SQL with complex logic. In addition, its ”SQL-template“ functionality can reduce your time writing SQL and improve your work efficiency in SQL.
  
  <img src='http://doc.sqlzhushou.com/guide/example-e-commerce/dag.png'/>

## Features:
  ### 1. Use DAG to build complex SQL
When it comes to complex SQL queries, using DAG (Directed acyclic graph) to build queries can provide many benefits. The following are some important features and advantages of using DAG to build complex SQL:
 - Visual query logic: Using the DAG canvas, you can visually see the dependency relationships and association logic between each sub query. This makes it easier to understand and debug complex SQL, and can help you better organize and optimize queries.
 - Reducing the probability of errors: Complex SQL often consists of multiple sub queries, which can be presented in hierarchical relationships using DAG. This reduces the probability of errors when the nesting level is too deep. At the same time, intuitively viewing the logic of sub queries on DAG can quickly locate and fix errors.
 - Code readability and maintainability: By displaying query logic on the DAG canvas, the code is easier to read and understand. For queries that need to be modified or maintained in the future, you can quickly recall the construction logic of the entire query without having to laboriously review the results of each sub query.
 - Modularization and reusability: When building complex SQL using DAG, simple SQL nodes can be combined together using reference functions (ref()). This modular approach makes it easy to reuse SQL fragments and reduce code duplication.
   
   <img src='http://doc.sqlzhushou.com/guide/ref-dag.png' />
   <img src='http://doc.sqlzhushou.com/guide/use-ref.png' />

### 2. Use "SQL-template" functionality to reduce code load
	
SQL is a language with strong paradigms, and its structure has strong "templatedness" (select xxx from xxx where xxx group by xxx). "SQL-template" is one of the very powerful functions in DAG-SQL Builder,
It can help you generate these fixed SQL statements to reduce code load.

### 3. Support Jinja2 syntax to enhance SQL
	
When using DAG SQL Builder, you can use the function of supporting Jinja2 syntax to enhance the flexibility and Reusability of SQL.
Jinja2 is a template language that allows you to use control structures (such as if statements and for loops) in SQL. By using Jinja2, you can better organize and manage complex SQL code.

 ```sql
{% set payment_methods = ["bank_transfer", "credit_card", "gift_card"] %}

select
    order_id,
    {% for payment_method in payment_methods %}
    sum(case when payment_method = '{{payment_method}}' then amount end) as {{payment_method}}_amount,
    {% endfor %}
    sum(amount) as total_amount
from app_data.payments
group by 1
```

### 4. Support data source import
	
 When using DAG-SQL Builder, you can import real data source tables or views into DAG by importing data source nodes. DAG-SQL Builder extracts field information from the tables, which is very useful when using the "SQL-template" feature.

 <img src='http://doc.sqlzhushou.com/guide/import-source-node-2.png' />

 ## Quick experience
 [Demo Landing](https://sqlzhushou.com)
 
 [Documentation](http://doc.sqlzhushou.com)

## 项目介绍
DAG-SQL-Builder是帮助数据开发人员编写复杂SQL的编辑器，它倡导使用DAG(有向无环图)的方式组合简单的SQL来构建复杂的SQL，
通过这种方式, 您会更容易掌控有复杂逻辑的SQL，另外，它的SQL模板功能可以减少您编写SQL的时间，提高您在SQL方面的工作效率。

## 特点
### 1. 使用DAG来构建复杂SQL 


当涉及到复杂的SQL查询时，使用DAG（有向无环图）来构建查询可以提供许多好处。以下是使用DAG来构建复杂SQL的一些重要功能和优势：

- 可视化查询逻辑：使用DAG画布，您可以直观地看到各个子查询之间的依赖关系和关联逻辑。这使得理解和调试复杂的SQL变得更加容易，并且可以帮助您更好地组织和优化查询。

- 减少错误发生的概率：复杂的SQL往往由多个子查询组成，而使用DAG可以将这些子查询以层级关系展示。这样，当嵌套层级过深时，减少了出错的概率。同时，在DAG上直观地查看子查询的逻辑，可以快速定位和修复错误。

- 代码可读性和维护性：通过在DAG画布上展示查询逻辑，使得代码更易于阅读和理解。对于日后需要修改或维护的查询，您可以迅速回想起整个查询的构建逻辑，而不需要费力回顾每个子查询的结果。

- 模块化和重用性：使用DAG构建复杂SQL时，可以利用引用函数（ref()）将简单的SQL节点组合在一起。这种模块化的方法使得可以轻松地重用SQL片段，并减少代码的重复性。
	
### 2. 使用模板功能减少代码量

SQL是一个有很强范式的语言，它的结构有很强的"模板性"(select xxx from xxx where xxx group by xxx), "生成模板"是DAG-SQL-Builder中非常强大的功能之一，
它可以帮助您生成这些固定的SQL以减少代码量。
	
### 3. 支持jinja2语法来增强SQL

当使用DAG-SQL-Builder时，您可以利用支持Jinja2语法的功能来增强SQL的灵活性和可重用性。
Jinja2是一种模板语言，它允许您在SQL中使用控制结构(例如if语句和for循环), 通过使用Jinja2，您可以更好地组织和管理复杂的SQL代码。
	
### 4. 支持数据源导入
当使用DAG-SQL-Builder时，您可以通过导入数据源节点将真实的数据源表或视图导入DAG中, DAG-SQL-Builder会提取表中的字段信息，这在使用"生成模板"功能时非常有用。
