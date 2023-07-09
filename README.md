# DAG-SQL-Builder

## Introduction:
  DAG-SQL-Builder is an editor that helps data developers write complex SQL. It advocates using DAG (Directed acyclic graph) to combine simple SQL to build complex SQL, Through this approach, you will have easier control over SQL with complex logic. In addition, its ”SQL-template“ functionality can reduce your time writing SQL and improve your work efficiency in SQL.

## Features:
  ### 1. Use DAG to build complex SQL
When it comes to complex SQL queries, using DAG (Directed acyclic graph) to build queries can provide many benefits. The following are some important features and advantages of using DAG to build complex SQL:
 - Visual query logic: Using the DAG canvas, you can visually see the dependency relationships and association logic between each sub query. This makes it easier to understand and debug complex SQL, and can help you better organize and optimize queries.
 - Reducing the probability of errors: Complex SQL often consists of multiple sub queries, which can be presented in hierarchical relationships using DAG. This reduces the probability of errors when the nesting level is too deep. At the same time, intuitively viewing the logic of sub queries on DAG can quickly locate and fix errors.
 - Code readability and maintainability: By displaying query logic on the DAG canvas, the code is easier to read and understand. For queries that need to be modified or maintained in the future, you can quickly recall the construction logic of the entire query without having to laboriously review the results of each sub query.
 - Modularization and reusability: When building complex SQL using DAG, simple SQL nodes can be combined together using reference functions (ref()). This modular approach makes it easy to reuse SQL fragments and reduce code duplication.

### 2. Use "SQL-template" functionality to reduce code load
	
 SQL is a language with strong paradigms, and its structure has strong "templatedness" (select xxx from xxx where xxx group by xxx). "SQL-template" is one of the very powerful functions in DAG-SQL Builder,
    It can help you generate these fixed SQL statements to reduce code load.

### 3. Support Jinja2 syntax to enhance SQL
	
 When using DAG SQL Builder, you can use the function of supporting Jinja2 syntax to enhance the flexibility and Reusability of SQL.
	Jinja2 is a template language that allows you to use control structures (such as if statements and for loops) in SQL. By using Jinja2, you can better organize and manage complex SQL code.

### 4. Support data source import
	
 When using DAG-SQL Builder, you can import real data source tables or views into DAG by importing data source nodes. DAG-SQL Builder extracts field information from the tables, which is very useful when using the "SQL-template" feature.

 ## Quick experience
 []
