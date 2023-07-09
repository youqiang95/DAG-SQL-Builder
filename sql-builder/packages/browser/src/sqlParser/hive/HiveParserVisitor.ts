// Generated from HiveParser.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


import { StatementContext } from "./HiveParser";
import { ExplainStatementContext } from "./HiveParser";
import { ExplainOptionContext } from "./HiveParser";
import { VectorizationOnlyContext } from "./HiveParser";
import { VectorizatonDetailContext } from "./HiveParser";
import { ExecStatementContext } from "./HiveParser";
import { LoadStatementContext } from "./HiveParser";
import { ReplicationClauseContext } from "./HiveParser";
import { ExportStatementContext } from "./HiveParser";
import { ImportStatementContext } from "./HiveParser";
import { ReplDumpStatementContext } from "./HiveParser";
import { ReplDbPolicyContext } from "./HiveParser";
import { ReplLoadStatementContext } from "./HiveParser";
import { ReplConfigsContext } from "./HiveParser";
import { ReplConfigsListContext } from "./HiveParser";
import { ReplTableLevelPolicyContext } from "./HiveParser";
import { ReplStatusStatementContext } from "./HiveParser";
import { DdlStatementContext } from "./HiveParser";
import { IfExistsContext } from "./HiveParser";
import { RestrictOrCascadeContext } from "./HiveParser";
import { IfNotExistsContext } from "./HiveParser";
import { ForceContext } from "./HiveParser";
import { RewriteEnabledContext } from "./HiveParser";
import { RewriteDisabledContext } from "./HiveParser";
import { StoredAsDirsContext } from "./HiveParser";
import { OrReplaceContext } from "./HiveParser";
import { CreateDatabaseStatementContext } from "./HiveParser";
import { DbLocationContext } from "./HiveParser";
import { DbManagedLocationContext } from "./HiveParser";
import { DbPropertiesContext } from "./HiveParser";
import { DbPropertiesListContext } from "./HiveParser";
import { DbConnectorNameContext } from "./HiveParser";
import { SwitchDatabaseStatementContext } from "./HiveParser";
import { DropDatabaseStatementContext } from "./HiveParser";
import { DatabaseCommentContext } from "./HiveParser";
import { TruncateTableStatementContext } from "./HiveParser";
import { DropTableStatementContext } from "./HiveParser";
import { InputFileFormatContext } from "./HiveParser";
import { TabTypeExprContext } from "./HiveParser";
import { PartTypeExprContext } from "./HiveParser";
import { TabPartColTypeExprContext } from "./HiveParser";
import { DescStatementContext } from "./HiveParser";
import { AnalyzeStatementContext } from "./HiveParser";
import { From_inContext } from "./HiveParser";
import { Db_schemaContext } from "./HiveParser";
import { ShowStatementContext } from "./HiveParser";
import { ShowTablesFilterExprContext } from "./HiveParser";
import { LockStatementContext } from "./HiveParser";
import { LockDatabaseContext } from "./HiveParser";
import { LockModeContext } from "./HiveParser";
import { UnlockStatementContext } from "./HiveParser";
import { UnlockDatabaseContext } from "./HiveParser";
import { CreateRoleStatementContext } from "./HiveParser";
import { DropRoleStatementContext } from "./HiveParser";
import { GrantPrivilegesContext } from "./HiveParser";
import { RevokePrivilegesContext } from "./HiveParser";
import { GrantRoleContext } from "./HiveParser";
import { RevokeRoleContext } from "./HiveParser";
import { ShowRoleGrantsContext } from "./HiveParser";
import { ShowRolesContext } from "./HiveParser";
import { ShowCurrentRoleContext } from "./HiveParser";
import { SetRoleContext } from "./HiveParser";
import { ShowGrantsContext } from "./HiveParser";
import { ShowRolePrincipalsContext } from "./HiveParser";
import { PrivilegeIncludeColObjectContext } from "./HiveParser";
import { PrivilegeObjectContext } from "./HiveParser";
import { PrivObjectContext } from "./HiveParser";
import { PrivObjectColsContext } from "./HiveParser";
import { PrivilegeListContext } from "./HiveParser";
import { PrivlegeDefContext } from "./HiveParser";
import { PrivilegeTypeContext } from "./HiveParser";
import { PrincipalSpecificationContext } from "./HiveParser";
import { PrincipalNameContext } from "./HiveParser";
import { WithGrantOptionContext } from "./HiveParser";
import { GrantOptionForContext } from "./HiveParser";
import { AdminOptionForContext } from "./HiveParser";
import { WithAdminOptionContext } from "./HiveParser";
import { MetastoreCheckContext } from "./HiveParser";
import { ResourceListContext } from "./HiveParser";
import { ResourceContext } from "./HiveParser";
import { ResourceTypeContext } from "./HiveParser";
import { CreateFunctionStatementContext } from "./HiveParser";
import { DropFunctionStatementContext } from "./HiveParser";
import { ReloadFunctionsStatementContext } from "./HiveParser";
import { CreateMacroStatementContext } from "./HiveParser";
import { DropMacroStatementContext } from "./HiveParser";
import { CreateViewStatementContext } from "./HiveParser";
import { ViewPartitionContext } from "./HiveParser";
import { ViewOrganizationContext } from "./HiveParser";
import { ViewClusterSpecContext } from "./HiveParser";
import { ViewComplexSpecContext } from "./HiveParser";
import { ViewDistSpecContext } from "./HiveParser";
import { ViewSortSpecContext } from "./HiveParser";
import { DropViewStatementContext } from "./HiveParser";
import { CreateMaterializedViewStatementContext } from "./HiveParser";
import { DropMaterializedViewStatementContext } from "./HiveParser";
import { CreateScheduledQueryStatementContext } from "./HiveParser";
import { DropScheduledQueryStatementContext } from "./HiveParser";
import { AlterScheduledQueryStatementContext } from "./HiveParser";
import { AlterScheduledQueryChangeContext } from "./HiveParser";
import { ScheduleSpecContext } from "./HiveParser";
import { ExecutedAsSpecContext } from "./HiveParser";
import { DefinedAsSpecContext } from "./HiveParser";
import { ShowFunctionIdentifierContext } from "./HiveParser";
import { ShowStmtIdentifierContext } from "./HiveParser";
import { TableCommentContext } from "./HiveParser";
import { CreateTablePartitionSpecContext } from "./HiveParser";
import { CreateTablePartitionColumnTypeSpecContext } from "./HiveParser";
import { CreateTablePartitionColumnSpecContext } from "./HiveParser";
import { PartitionTransformSpecContext } from "./HiveParser";
import { ColumnNameTransformConstraintContext } from "./HiveParser";
import { PartitionTransformTypeContext } from "./HiveParser";
import { TableBucketsContext } from "./HiveParser";
import { TableImplBucketsContext } from "./HiveParser";
import { TableSkewedContext } from "./HiveParser";
import { RowFormatContext } from "./HiveParser";
import { RecordReaderContext } from "./HiveParser";
import { RecordWriterContext } from "./HiveParser";
import { RowFormatSerdeContext } from "./HiveParser";
import { RowFormatDelimitedContext } from "./HiveParser";
import { TableRowFormatContext } from "./HiveParser";
import { TablePropertiesPrefixedContext } from "./HiveParser";
import { TablePropertiesContext } from "./HiveParser";
import { TablePropertiesListContext } from "./HiveParser";
import { KeyValuePropertyContext } from "./HiveParser";
import { KeyPropertyContext } from "./HiveParser";
import { TableRowFormatFieldIdentifierContext } from "./HiveParser";
import { TableRowFormatCollItemsIdentifierContext } from "./HiveParser";
import { TableRowFormatMapKeysIdentifierContext } from "./HiveParser";
import { TableRowFormatLinesIdentifierContext } from "./HiveParser";
import { TableRowNullFormatContext } from "./HiveParser";
import { TableFileFormatContext } from "./HiveParser";
import { TableLocationContext } from "./HiveParser";
import { ColumnNameTypeListContext } from "./HiveParser";
import { ColumnNameTypeOrConstraintListContext } from "./HiveParser";
import { ColumnNameColonTypeListContext } from "./HiveParser";
import { ColumnNameListContext } from "./HiveParser";
import { ColumnNameContext } from "./HiveParser";
import { ExtColumnNameContext } from "./HiveParser";
import { ColumnNameOrderListContext } from "./HiveParser";
import { ColumnParenthesesListContext } from "./HiveParser";
import { EnableValidateSpecificationContext } from "./HiveParser";
import { EnableSpecificationContext } from "./HiveParser";
import { ValidateSpecificationContext } from "./HiveParser";
import { EnforcedSpecificationContext } from "./HiveParser";
import { RelySpecificationContext } from "./HiveParser";
import { CreateConstraintContext } from "./HiveParser";
import { AlterConstraintWithNameContext } from "./HiveParser";
import { TableLevelConstraintContext } from "./HiveParser";
import { PkUkConstraintContext } from "./HiveParser";
import { CheckConstraintContext } from "./HiveParser";
import { CreateForeignKeyContext } from "./HiveParser";
import { AlterForeignKeyWithNameContext } from "./HiveParser";
import { SkewedValueElementContext } from "./HiveParser";
import { SkewedColumnValuePairListContext } from "./HiveParser";
import { SkewedColumnValuePairContext } from "./HiveParser";
import { SkewedColumnValuesContext } from "./HiveParser";
import { SkewedColumnValueContext } from "./HiveParser";
import { SkewedValueLocationElementContext } from "./HiveParser";
import { OrderSpecificationContext } from "./HiveParser";
import { NullOrderingContext } from "./HiveParser";
import { ColumnNameOrderContext } from "./HiveParser";
import { ColumnNameCommentListContext } from "./HiveParser";
import { ColumnNameCommentContext } from "./HiveParser";
import { OrderSpecificationRewriteContext } from "./HiveParser";
import { ColumnRefOrderContext } from "./HiveParser";
import { ColumnNameTypeContext } from "./HiveParser";
import { ColumnNameTypeOrConstraintContext } from "./HiveParser";
import { TableConstraintContext } from "./HiveParser";
import { ColumnNameTypeConstraintContext } from "./HiveParser";
import { ColumnConstraintContext } from "./HiveParser";
import { ForeignKeyConstraintContext } from "./HiveParser";
import { ColConstraintContext } from "./HiveParser";
import { AlterColumnConstraintContext } from "./HiveParser";
import { AlterForeignKeyConstraintContext } from "./HiveParser";
import { AlterColConstraintContext } from "./HiveParser";
import { ColumnConstraintTypeContext } from "./HiveParser";
import { DefaultValContext } from "./HiveParser";
import { TableConstraintTypeContext } from "./HiveParser";
import { ConstraintOptsCreateContext } from "./HiveParser";
import { ConstraintOptsAlterContext } from "./HiveParser";
import { ColumnNameColonTypeContext } from "./HiveParser";
import { ColTypeContext } from "./HiveParser";
import { ColTypeListContext } from "./HiveParser";
import { TypeContext } from "./HiveParser";
import { PrimitiveTypeContext } from "./HiveParser";
import { ListTypeContext } from "./HiveParser";
import { StructTypeContext } from "./HiveParser";
import { MapTypeContext } from "./HiveParser";
import { UnionTypeContext } from "./HiveParser";
import { SetOperatorContext } from "./HiveParser";
import { QueryStatementExpressionContext } from "./HiveParser";
import { QueryStatementExpressionBodyContext } from "./HiveParser";
import { WithClauseContext } from "./HiveParser";
import { CteStatementContext } from "./HiveParser";
import { FromStatementContext } from "./HiveParser";
import { SingleFromStatementContext } from "./HiveParser";
import { RegularBodyContext } from "./HiveParser";
import { AtomSelectStatementContext } from "./HiveParser";
import { SelectStatementContext } from "./HiveParser";
import { SetOpSelectStatementContext } from "./HiveParser";
import { SelectStatementWithCTEContext } from "./HiveParser";
import { BodyContext } from "./HiveParser";
import { InsertClauseContext } from "./HiveParser";
import { DestinationContext } from "./HiveParser";
import { LimitClauseContext } from "./HiveParser";
import { DeleteStatementContext } from "./HiveParser";
import { ColumnAssignmentClauseContext } from "./HiveParser";
import { PrecedencePlusExpressionOrDefaultContext } from "./HiveParser";
import { SetColumnsClauseContext } from "./HiveParser";
import { UpdateStatementContext } from "./HiveParser";
import { SqlTransactionStatementContext } from "./HiveParser";
import { StartTransactionStatementContext } from "./HiveParser";
import { TransactionModeContext } from "./HiveParser";
import { TransactionAccessModeContext } from "./HiveParser";
import { IsolationLevelContext } from "./HiveParser";
import { LevelOfIsolationContext } from "./HiveParser";
import { CommitStatementContext } from "./HiveParser";
import { RollbackStatementContext } from "./HiveParser";
import { SetAutoCommitStatementContext } from "./HiveParser";
import { AbortTransactionStatementContext } from "./HiveParser";
import { AbortCompactionStatementContext } from "./HiveParser";
import { MergeStatementContext } from "./HiveParser";
import { WhenClausesContext } from "./HiveParser";
import { WhenNotMatchedClauseContext } from "./HiveParser";
import { WhenMatchedAndClauseContext } from "./HiveParser";
import { WhenMatchedThenClauseContext } from "./HiveParser";
import { UpdateOrDeleteContext } from "./HiveParser";
import { KillQueryStatementContext } from "./HiveParser";
import { CompactionIdContext } from "./HiveParser";
import { CompactionPoolContext } from "./HiveParser";
import { CompactionTypeContext } from "./HiveParser";
import { CompactionStatusContext } from "./HiveParser";
import { AlterStatementContext } from "./HiveParser";
import { AlterTableStatementSuffixContext } from "./HiveParser";
import { AlterTblPartitionStatementSuffixContext } from "./HiveParser";
import { AlterStatementPartitionKeyTypeContext } from "./HiveParser";
import { AlterViewStatementSuffixContext } from "./HiveParser";
import { AlterMaterializedViewStatementSuffixContext } from "./HiveParser";
import { AlterMaterializedViewSuffixRewriteContext } from "./HiveParser";
import { AlterMaterializedViewSuffixRebuildContext } from "./HiveParser";
import { AlterDatabaseStatementSuffixContext } from "./HiveParser";
import { AlterDatabaseSuffixPropertiesContext } from "./HiveParser";
import { AlterDatabaseSuffixSetOwnerContext } from "./HiveParser";
import { AlterDatabaseSuffixSetLocationContext } from "./HiveParser";
import { AlterDatabaseSuffixSetManagedLocationContext } from "./HiveParser";
import { AlterStatementSuffixRenameContext } from "./HiveParser";
import { AlterStatementSuffixAddColContext } from "./HiveParser";
import { AlterStatementSuffixAddConstraintContext } from "./HiveParser";
import { AlterStatementSuffixUpdateColumnsContext } from "./HiveParser";
import { AlterStatementSuffixDropConstraintContext } from "./HiveParser";
import { AlterStatementSuffixRenameColContext } from "./HiveParser";
import { AlterStatementSuffixUpdateStatsColContext } from "./HiveParser";
import { AlterStatementSuffixUpdateStatsContext } from "./HiveParser";
import { AlterStatementChangeColPositionContext } from "./HiveParser";
import { AlterStatementSuffixAddPartitionsContext } from "./HiveParser";
import { AlterStatementSuffixAddPartitionsElementContext } from "./HiveParser";
import { AlterStatementSuffixTouchContext } from "./HiveParser";
import { AlterStatementSuffixArchiveContext } from "./HiveParser";
import { AlterStatementSuffixUnArchiveContext } from "./HiveParser";
import { PartitionLocationContext } from "./HiveParser";
import { AlterStatementSuffixDropPartitionsContext } from "./HiveParser";
import { AlterStatementSuffixPropertiesContext } from "./HiveParser";
import { AlterViewSuffixPropertiesContext } from "./HiveParser";
import { AlterStatementSuffixSerdePropertiesContext } from "./HiveParser";
import { TablePartitionPrefixContext } from "./HiveParser";
import { AlterStatementSuffixFileFormatContext } from "./HiveParser";
import { AlterStatementSuffixClusterbySortbyContext } from "./HiveParser";
import { AlterTblPartitionStatementSuffixSkewedLocationContext } from "./HiveParser";
import { SkewedLocationsContext } from "./HiveParser";
import { SkewedLocationsListContext } from "./HiveParser";
import { SkewedLocationMapContext } from "./HiveParser";
import { AlterStatementSuffixLocationContext } from "./HiveParser";
import { AlterStatementSuffixSkewedbyContext } from "./HiveParser";
import { AlterStatementSuffixExchangePartitionContext } from "./HiveParser";
import { AlterStatementSuffixRenamePartContext } from "./HiveParser";
import { AlterStatementSuffixStatsPartContext } from "./HiveParser";
import { AlterStatementSuffixMergeFilesContext } from "./HiveParser";
import { AlterStatementSuffixBucketNumContext } from "./HiveParser";
import { BlockingContext } from "./HiveParser";
import { CompactPoolContext } from "./HiveParser";
import { AlterStatementSuffixCompactContext } from "./HiveParser";
import { AlterStatementSuffixSetOwnerContext } from "./HiveParser";
import { AlterStatementSuffixSetPartSpecContext } from "./HiveParser";
import { AlterStatementSuffixExecuteContext } from "./HiveParser";
import { FileFormatContext } from "./HiveParser";
import { AlterDataConnectorStatementSuffixContext } from "./HiveParser";
import { AlterDataConnectorSuffixPropertiesContext } from "./HiveParser";
import { AlterDataConnectorSuffixSetOwnerContext } from "./HiveParser";
import { AlterDataConnectorSuffixSetUrlContext } from "./HiveParser";
import { LikeTableOrFileContext } from "./HiveParser";
import { CreateTableStatementContext } from "./HiveParser";
import { CreateDataConnectorStatementContext } from "./HiveParser";
import { DataConnectorCommentContext } from "./HiveParser";
import { DataConnectorUrlContext } from "./HiveParser";
import { DataConnectorTypeContext } from "./HiveParser";
import { DcPropertiesContext } from "./HiveParser";
import { DropDataConnectorStatementContext } from "./HiveParser";
import { TableAllColumnsContext } from "./HiveParser";
import { TableOrColumnContext } from "./HiveParser";
import { DefaultValueContext } from "./HiveParser";
import { ExpressionListContext } from "./HiveParser";
import { AliasListContext } from "./HiveParser";
import { FromClauseContext } from "./HiveParser";
import { FromSourceContext } from "./HiveParser";
import { AtomjoinSourceContext } from "./HiveParser";
import { JoinSourceContext } from "./HiveParser";
import { JoinSourcePartContext } from "./HiveParser";
import { UniqueJoinSourceContext } from "./HiveParser";
import { UniqueJoinExprContext } from "./HiveParser";
import { UniqueJoinTokenContext } from "./HiveParser";
import { JoinTokenContext } from "./HiveParser";
import { LateralViewContext } from "./HiveParser";
import { TableAliasContext } from "./HiveParser";
import { TableBucketSampleContext } from "./HiveParser";
import { SplitSampleContext } from "./HiveParser";
import { TableSampleContext } from "./HiveParser";
import { TableSourceContext } from "./HiveParser";
import { AsOfClauseContext } from "./HiveParser";
import { UniqueJoinTableSourceContext } from "./HiveParser";
import { TableNameContext } from "./HiveParser";
import { ViewNameContext } from "./HiveParser";
import { SubQuerySourceContext } from "./HiveParser";
import { PartitioningSpecContext } from "./HiveParser";
import { PartitionTableFunctionSourceContext } from "./HiveParser";
import { PartitionedTableFunctionContext } from "./HiveParser";
import { WhereClauseContext } from "./HiveParser";
import { SearchConditionContext } from "./HiveParser";
import { ValuesSourceContext } from "./HiveParser";
import { ValuesClauseContext } from "./HiveParser";
import { ValuesTableConstructorContext } from "./HiveParser";
import { ValueRowConstructorContext } from "./HiveParser";
import { FirstValueRowConstructorContext } from "./HiveParser";
import { VirtualTableSourceContext } from "./HiveParser";
import { SelectClauseContext } from "./HiveParser";
import { All_distinctContext } from "./HiveParser";
import { SelectListContext } from "./HiveParser";
import { SelectTrfmClauseContext } from "./HiveParser";
import { SelectItemContext } from "./HiveParser";
import { TrfmClauseContext } from "./HiveParser";
import { SelectExpressionContext } from "./HiveParser";
import { SelectExpressionListContext } from "./HiveParser";
import { Window_clauseContext } from "./HiveParser";
import { Window_defnContext } from "./HiveParser";
import { Window_specificationContext } from "./HiveParser";
import { Window_frameContext } from "./HiveParser";
import { Window_range_expressionContext } from "./HiveParser";
import { Window_value_expressionContext } from "./HiveParser";
import { Window_frame_start_boundaryContext } from "./HiveParser";
import { Window_frame_boundaryContext } from "./HiveParser";
import { GroupByClauseContext } from "./HiveParser";
import { Groupby_expressionContext } from "./HiveParser";
import { GroupByEmptyContext } from "./HiveParser";
import { RollupStandardContext } from "./HiveParser";
import { RollupOldSyntaxContext } from "./HiveParser";
import { GroupingSetExpressionContext } from "./HiveParser";
import { GroupingSetExpressionMultipleContext } from "./HiveParser";
import { GroupingExpressionSingleContext } from "./HiveParser";
import { HavingClauseContext } from "./HiveParser";
import { QualifyClauseContext } from "./HiveParser";
import { HavingConditionContext } from "./HiveParser";
import { ExpressionsInParenthesisContext } from "./HiveParser";
import { ExpressionsNotInParenthesisContext } from "./HiveParser";
import { ExpressionPartContext } from "./HiveParser";
import { ExpressionOrDefaultContext } from "./HiveParser";
import { FirstExpressionsWithAliasContext } from "./HiveParser";
import { ExpressionWithAliasContext } from "./HiveParser";
import { ExpressionsContext } from "./HiveParser";
import { ColumnRefOrderInParenthesisContext } from "./HiveParser";
import { ColumnRefOrderNotInParenthesisContext } from "./HiveParser";
import { OrderByClauseContext } from "./HiveParser";
import { ClusterByClauseContext } from "./HiveParser";
import { PartitionByClauseContext } from "./HiveParser";
import { DistributeByClauseContext } from "./HiveParser";
import { SortByClauseContext } from "./HiveParser";
import { TrimFunctionContext } from "./HiveParser";
import { Function_Context } from "./HiveParser";
import { Null_treatmentContext } from "./HiveParser";
import { FunctionNameContext } from "./HiveParser";
import { CastExpressionContext } from "./HiveParser";
import { CaseExpressionContext } from "./HiveParser";
import { WhenExpressionContext } from "./HiveParser";
import { FloorExpressionContext } from "./HiveParser";
import { FloorDateQualifiersContext } from "./HiveParser";
import { ExtractExpressionContext } from "./HiveParser";
import { TimeQualifiersContext } from "./HiveParser";
import { ConstantContext } from "./HiveParser";
import { PrepareStmtParamContext } from "./HiveParser";
import { ParameterIdxContext } from "./HiveParser";
import { StringLiteralSequenceContext } from "./HiveParser";
import { CharSetStringLiteralContext } from "./HiveParser";
import { DateLiteralContext } from "./HiveParser";
import { TimestampLiteralContext } from "./HiveParser";
import { TimestampLocalTZLiteralContext } from "./HiveParser";
import { IntervalValueContext } from "./HiveParser";
import { IntervalLiteralContext } from "./HiveParser";
import { IntervalExpressionContext } from "./HiveParser";
import { IntervalQualifiersContext } from "./HiveParser";
import { ExpressionContext } from "./HiveParser";
import { AtomExpressionContext } from "./HiveParser";
import { PrecedenceFieldExpressionContext } from "./HiveParser";
import { PrecedenceUnaryOperatorContext } from "./HiveParser";
import { PrecedenceUnaryPrefixExpressionContext } from "./HiveParser";
import { PrecedenceBitwiseXorOperatorContext } from "./HiveParser";
import { PrecedenceBitwiseXorExpressionContext } from "./HiveParser";
import { PrecedenceStarOperatorContext } from "./HiveParser";
import { PrecedenceStarExpressionContext } from "./HiveParser";
import { PrecedencePlusOperatorContext } from "./HiveParser";
import { PrecedencePlusExpressionContext } from "./HiveParser";
import { PrecedenceConcatenateOperatorContext } from "./HiveParser";
import { PrecedenceConcatenateExpressionContext } from "./HiveParser";
import { PrecedenceAmpersandOperatorContext } from "./HiveParser";
import { PrecedenceAmpersandExpressionContext } from "./HiveParser";
import { PrecedenceBitwiseOrOperatorContext } from "./HiveParser";
import { PrecedenceBitwiseOrExpressionContext } from "./HiveParser";
import { PrecedenceRegexpOperatorContext } from "./HiveParser";
import { PrecedenceSimilarOperatorContext } from "./HiveParser";
import { SubQueryExpressionContext } from "./HiveParser";
import { PrecedenceSimilarExpressionContext } from "./HiveParser";
import { PrecedenceSimilarExpressionMainContext } from "./HiveParser";
import { PrecedenceSimilarExpressionPartContext } from "./HiveParser";
import { PrecedenceSimilarExpressionAtomContext } from "./HiveParser";
import { PrecedenceSimilarExpressionQuantifierPredicateContext } from "./HiveParser";
import { QuantifierTypeContext } from "./HiveParser";
import { PrecedenceSimilarExpressionInContext } from "./HiveParser";
import { PrecedenceSimilarExpressionPartNotContext } from "./HiveParser";
import { PrecedenceDistinctOperatorContext } from "./HiveParser";
import { PrecedenceEqualOperatorContext } from "./HiveParser";
import { PrecedenceEqualExpressionContext } from "./HiveParser";
import { IsConditionContext } from "./HiveParser";
import { PrecedenceUnarySuffixExpressionContext } from "./HiveParser";
import { PrecedenceNotOperatorContext } from "./HiveParser";
import { PrecedenceNotExpressionContext } from "./HiveParser";
import { PrecedenceAndOperatorContext } from "./HiveParser";
import { PrecedenceAndExpressionContext } from "./HiveParser";
import { PrecedenceOrOperatorContext } from "./HiveParser";
import { PrecedenceOrExpressionContext } from "./HiveParser";
import { BooleanValueContext } from "./HiveParser";
import { BooleanValueTokContext } from "./HiveParser";
import { TableOrPartitionContext } from "./HiveParser";
import { PartitionSpecContext } from "./HiveParser";
import { PartitionValContext } from "./HiveParser";
import { PartitionSelectorSpecContext } from "./HiveParser";
import { PartitionSelectorValContext } from "./HiveParser";
import { PartitionSelectorOperatorContext } from "./HiveParser";
import { SubQuerySelectorOperatorContext } from "./HiveParser";
import { SysFuncNamesContext } from "./HiveParser";
import { DescFuncNamesContext } from "./HiveParser";
import { Id_Context } from "./HiveParser";
import { FunctionIdentifierContext } from "./HiveParser";
import { PrincipalIdentifierContext } from "./HiveParser";
import { NonReservedContext } from "./HiveParser";
import { Sql11ReservedKeywordsUsedAsFunctionNameContext } from "./HiveParser";
import { HintContext } from "./HiveParser";
import { HintListContext } from "./HiveParser";
import { HintItemContext } from "./HiveParser";
import { HintNameContext } from "./HiveParser";
import { HintArgsContext } from "./HiveParser";
import { HintArgNameContext } from "./HiveParser";
import { PrepareStatementContext } from "./HiveParser";
import { ExecuteStatementContext } from "./HiveParser";
import { ExecuteParamListContext } from "./HiveParser";
import { ResourcePlanDdlStatementsContext } from "./HiveParser";
import { RpAssignContext } from "./HiveParser";
import { RpAssignListContext } from "./HiveParser";
import { RpUnassignContext } from "./HiveParser";
import { RpUnassignListContext } from "./HiveParser";
import { CreateResourcePlanStatementContext } from "./HiveParser";
import { WithReplaceContext } from "./HiveParser";
import { ActivateContext } from "./HiveParser";
import { EnableContext } from "./HiveParser";
import { DisableContext } from "./HiveParser";
import { UnmanagedContext } from "./HiveParser";
import { AlterResourcePlanStatementContext } from "./HiveParser";
import { GlobalWmStatementContext } from "./HiveParser";
import { ReplaceResourcePlanStatementContext } from "./HiveParser";
import { DropResourcePlanStatementContext } from "./HiveParser";
import { PoolPathContext } from "./HiveParser";
import { TriggerExpressionContext } from "./HiveParser";
import { TriggerExpressionStandaloneContext } from "./HiveParser";
import { TriggerOrExpressionContext } from "./HiveParser";
import { TriggerAndExpressionContext } from "./HiveParser";
import { TriggerAtomExpressionContext } from "./HiveParser";
import { TriggerLiteralContext } from "./HiveParser";
import { ComparisionOperatorContext } from "./HiveParser";
import { TriggerActionExpressionContext } from "./HiveParser";
import { TriggerActionExpressionStandaloneContext } from "./HiveParser";
import { CreateTriggerStatementContext } from "./HiveParser";
import { AlterTriggerStatementContext } from "./HiveParser";
import { DropTriggerStatementContext } from "./HiveParser";
import { PoolAssignContext } from "./HiveParser";
import { PoolAssignListContext } from "./HiveParser";
import { CreatePoolStatementContext } from "./HiveParser";
import { AlterPoolStatementContext } from "./HiveParser";
import { DropPoolStatementContext } from "./HiveParser";
import { CreateMappingStatementContext } from "./HiveParser";
import { AlterMappingStatementContext } from "./HiveParser";
import { DropMappingStatementContext } from "./HiveParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `HiveParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class HiveParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `HiveParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.explainStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplainStatement?: (ctx: ExplainStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.explainOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplainOption?: (ctx: ExplainOptionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.vectorizationOnly`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVectorizationOnly?: (ctx: VectorizationOnlyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.vectorizatonDetail`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVectorizatonDetail?: (ctx: VectorizatonDetailContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.execStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecStatement?: (ctx: ExecStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.loadStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoadStatement?: (ctx: LoadStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replicationClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplicationClause?: (ctx: ReplicationClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.exportStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExportStatement?: (ctx: ExportStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.importStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportStatement?: (ctx: ImportStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replDumpStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplDumpStatement?: (ctx: ReplDumpStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replDbPolicy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplDbPolicy?: (ctx: ReplDbPolicyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replLoadStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplLoadStatement?: (ctx: ReplLoadStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replConfigs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplConfigs?: (ctx: ReplConfigsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replConfigsList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplConfigsList?: (ctx: ReplConfigsListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replTableLevelPolicy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplTableLevelPolicy?: (ctx: ReplTableLevelPolicyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replStatusStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplStatusStatement?: (ctx: ReplStatusStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.ddlStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDdlStatement?: (ctx: DdlStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.ifExists`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfExists?: (ctx: IfExistsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.restrictOrCascade`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRestrictOrCascade?: (ctx: RestrictOrCascadeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.ifNotExists`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNotExists?: (ctx: IfNotExistsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.force`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForce?: (ctx: ForceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rewriteEnabled`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRewriteEnabled?: (ctx: RewriteEnabledContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rewriteDisabled`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRewriteDisabled?: (ctx: RewriteDisabledContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.storedAsDirs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStoredAsDirs?: (ctx: StoredAsDirsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.orReplace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrReplace?: (ctx: OrReplaceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createDatabaseStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateDatabaseStatement?: (ctx: CreateDatabaseStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dbLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbLocation?: (ctx: DbLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dbManagedLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbManagedLocation?: (ctx: DbManagedLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dbProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbProperties?: (ctx: DbPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dbPropertiesList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbPropertiesList?: (ctx: DbPropertiesListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dbConnectorName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDbConnectorName?: (ctx: DbConnectorNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.switchDatabaseStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchDatabaseStatement?: (ctx: SwitchDatabaseStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropDatabaseStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropDatabaseStatement?: (ctx: DropDatabaseStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.databaseComment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabaseComment?: (ctx: DatabaseCommentContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.truncateTableStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTruncateTableStatement?: (ctx: TruncateTableStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropTableStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropTableStatement?: (ctx: DropTableStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.inputFileFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInputFileFormat?: (ctx: InputFileFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tabTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTabTypeExpr?: (ctx: TabTypeExprContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartTypeExpr?: (ctx: PartTypeExprContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tabPartColTypeExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTabPartColTypeExpr?: (ctx: TabPartColTypeExprContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.descStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescStatement?: (ctx: DescStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.analyzeStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnalyzeStatement?: (ctx: AnalyzeStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.from_in`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFrom_in?: (ctx: From_inContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.db_schema`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDb_schema?: (ctx: Db_schemaContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowStatement?: (ctx: ShowStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showTablesFilterExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowTablesFilterExpr?: (ctx: ShowTablesFilterExprContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.lockStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLockStatement?: (ctx: LockStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.lockDatabase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLockDatabase?: (ctx: LockDatabaseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.lockMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLockMode?: (ctx: LockModeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.unlockStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnlockStatement?: (ctx: UnlockStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.unlockDatabase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnlockDatabase?: (ctx: UnlockDatabaseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createRoleStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateRoleStatement?: (ctx: CreateRoleStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropRoleStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropRoleStatement?: (ctx: DropRoleStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.grantPrivileges`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrantPrivileges?: (ctx: GrantPrivilegesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.revokePrivileges`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRevokePrivileges?: (ctx: RevokePrivilegesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.grantRole`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrantRole?: (ctx: GrantRoleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.revokeRole`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRevokeRole?: (ctx: RevokeRoleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showRoleGrants`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowRoleGrants?: (ctx: ShowRoleGrantsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showRoles`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowRoles?: (ctx: ShowRolesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showCurrentRole`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowCurrentRole?: (ctx: ShowCurrentRoleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.setRole`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetRole?: (ctx: SetRoleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showGrants`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowGrants?: (ctx: ShowGrantsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showRolePrincipals`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowRolePrincipals?: (ctx: ShowRolePrincipalsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privilegeIncludeColObject`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivilegeIncludeColObject?: (ctx: PrivilegeIncludeColObjectContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privilegeObject`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivilegeObject?: (ctx: PrivilegeObjectContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privObject`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivObject?: (ctx: PrivObjectContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privObjectCols`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivObjectCols?: (ctx: PrivObjectColsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privilegeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivilegeList?: (ctx: PrivilegeListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privlegeDef`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivlegeDef?: (ctx: PrivlegeDefContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.privilegeType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrivilegeType?: (ctx: PrivilegeTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.principalSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrincipalSpecification?: (ctx: PrincipalSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.principalName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrincipalName?: (ctx: PrincipalNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.withGrantOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithGrantOption?: (ctx: WithGrantOptionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.grantOptionFor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGrantOptionFor?: (ctx: GrantOptionForContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.adminOptionFor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdminOptionFor?: (ctx: AdminOptionForContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.withAdminOption`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithAdminOption?: (ctx: WithAdminOptionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.metastoreCheck`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetastoreCheck?: (ctx: MetastoreCheckContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.resourceList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceList?: (ctx: ResourceListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.resource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource?: (ctx: ResourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.resourceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceType?: (ctx: ResourceTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createFunctionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateFunctionStatement?: (ctx: CreateFunctionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropFunctionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropFunctionStatement?: (ctx: DropFunctionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.reloadFunctionsStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReloadFunctionsStatement?: (ctx: ReloadFunctionsStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createMacroStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateMacroStatement?: (ctx: CreateMacroStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropMacroStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropMacroStatement?: (ctx: DropMacroStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createViewStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateViewStatement?: (ctx: CreateViewStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewPartition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewPartition?: (ctx: ViewPartitionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewOrganization`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewOrganization?: (ctx: ViewOrganizationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewClusterSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewClusterSpec?: (ctx: ViewClusterSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewComplexSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewComplexSpec?: (ctx: ViewComplexSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewDistSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewDistSpec?: (ctx: ViewDistSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewSortSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewSortSpec?: (ctx: ViewSortSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropViewStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropViewStatement?: (ctx: DropViewStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createMaterializedViewStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateMaterializedViewStatement?: (ctx: CreateMaterializedViewStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropMaterializedViewStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropMaterializedViewStatement?: (ctx: DropMaterializedViewStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createScheduledQueryStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateScheduledQueryStatement?: (ctx: CreateScheduledQueryStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropScheduledQueryStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropScheduledQueryStatement?: (ctx: DropScheduledQueryStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterScheduledQueryStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterScheduledQueryStatement?: (ctx: AlterScheduledQueryStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterScheduledQueryChange`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterScheduledQueryChange?: (ctx: AlterScheduledQueryChangeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.scheduleSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScheduleSpec?: (ctx: ScheduleSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.executedAsSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecutedAsSpec?: (ctx: ExecutedAsSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.definedAsSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinedAsSpec?: (ctx: DefinedAsSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showFunctionIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowFunctionIdentifier?: (ctx: ShowFunctionIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.showStmtIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShowStmtIdentifier?: (ctx: ShowStmtIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableComment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableComment?: (ctx: TableCommentContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createTablePartitionSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTablePartitionSpec?: (ctx: CreateTablePartitionSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createTablePartitionColumnTypeSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTablePartitionColumnTypeSpec?: (ctx: CreateTablePartitionColumnTypeSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createTablePartitionColumnSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTablePartitionColumnSpec?: (ctx: CreateTablePartitionColumnSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionTransformSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionTransformSpec?: (ctx: PartitionTransformSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameTransformConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameTransformConstraint?: (ctx: ColumnNameTransformConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionTransformType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionTransformType?: (ctx: PartitionTransformTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableBuckets`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableBuckets?: (ctx: TableBucketsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableImplBuckets`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableImplBuckets?: (ctx: TableImplBucketsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableSkewed`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableSkewed?: (ctx: TableSkewedContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rowFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRowFormat?: (ctx: RowFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.recordReader`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecordReader?: (ctx: RecordReaderContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.recordWriter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecordWriter?: (ctx: RecordWriterContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rowFormatSerde`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRowFormatSerde?: (ctx: RowFormatSerdeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rowFormatDelimited`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRowFormatDelimited?: (ctx: RowFormatDelimitedContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowFormat?: (ctx: TableRowFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tablePropertiesPrefixed`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTablePropertiesPrefixed?: (ctx: TablePropertiesPrefixedContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableProperties?: (ctx: TablePropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tablePropertiesList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTablePropertiesList?: (ctx: TablePropertiesListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.keyValueProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeyValueProperty?: (ctx: KeyValuePropertyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.keyProperty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeyProperty?: (ctx: KeyPropertyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowFormatFieldIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowFormatFieldIdentifier?: (ctx: TableRowFormatFieldIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowFormatCollItemsIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowFormatCollItemsIdentifier?: (ctx: TableRowFormatCollItemsIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowFormatMapKeysIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowFormatMapKeysIdentifier?: (ctx: TableRowFormatMapKeysIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowFormatLinesIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowFormatLinesIdentifier?: (ctx: TableRowFormatLinesIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableRowNullFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableRowNullFormat?: (ctx: TableRowNullFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableFileFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableFileFormat?: (ctx: TableFileFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableLocation?: (ctx: TableLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameTypeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameTypeList?: (ctx: ColumnNameTypeListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameTypeOrConstraintList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameTypeOrConstraintList?: (ctx: ColumnNameTypeOrConstraintListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameColonTypeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameColonTypeList?: (ctx: ColumnNameColonTypeListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameList?: (ctx: ColumnNameListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnName?: (ctx: ColumnNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.extColumnName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtColumnName?: (ctx: ExtColumnNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameOrderList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameOrderList?: (ctx: ColumnNameOrderListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnParenthesesList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnParenthesesList?: (ctx: ColumnParenthesesListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.enableValidateSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnableValidateSpecification?: (ctx: EnableValidateSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.enableSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnableSpecification?: (ctx: EnableSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.validateSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValidateSpecification?: (ctx: ValidateSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.enforcedSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnforcedSpecification?: (ctx: EnforcedSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.relySpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelySpecification?: (ctx: RelySpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateConstraint?: (ctx: CreateConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterConstraintWithName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterConstraintWithName?: (ctx: AlterConstraintWithNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableLevelConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableLevelConstraint?: (ctx: TableLevelConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.pkUkConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPkUkConstraint?: (ctx: PkUkConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.checkConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCheckConstraint?: (ctx: CheckConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createForeignKey`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateForeignKey?: (ctx: CreateForeignKeyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterForeignKeyWithName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterForeignKeyWithName?: (ctx: AlterForeignKeyWithNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedValueElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedValueElement?: (ctx: SkewedValueElementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedColumnValuePairList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedColumnValuePairList?: (ctx: SkewedColumnValuePairListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedColumnValuePair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedColumnValuePair?: (ctx: SkewedColumnValuePairContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedColumnValues`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedColumnValues?: (ctx: SkewedColumnValuesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedColumnValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedColumnValue?: (ctx: SkewedColumnValueContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedValueLocationElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedValueLocationElement?: (ctx: SkewedValueLocationElementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.orderSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderSpecification?: (ctx: OrderSpecificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.nullOrdering`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullOrdering?: (ctx: NullOrderingContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameOrder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameOrder?: (ctx: ColumnNameOrderContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameCommentList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameCommentList?: (ctx: ColumnNameCommentListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameComment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameComment?: (ctx: ColumnNameCommentContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.orderSpecificationRewrite`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderSpecificationRewrite?: (ctx: OrderSpecificationRewriteContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnRefOrder`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnRefOrder?: (ctx: ColumnRefOrderContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameType?: (ctx: ColumnNameTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameTypeOrConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameTypeOrConstraint?: (ctx: ColumnNameTypeOrConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableConstraint?: (ctx: TableConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameTypeConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameTypeConstraint?: (ctx: ColumnNameTypeConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnConstraint?: (ctx: ColumnConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.foreignKeyConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForeignKeyConstraint?: (ctx: ForeignKeyConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.colConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColConstraint?: (ctx: ColConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterColumnConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterColumnConstraint?: (ctx: AlterColumnConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterForeignKeyConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterForeignKeyConstraint?: (ctx: AlterForeignKeyConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterColConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterColConstraint?: (ctx: AlterColConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnConstraintType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnConstraintType?: (ctx: ColumnConstraintTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.defaultVal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultVal?: (ctx: DefaultValContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableConstraintType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableConstraintType?: (ctx: TableConstraintTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.constraintOptsCreate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraintOptsCreate?: (ctx: ConstraintOptsCreateContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.constraintOptsAlter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstraintOptsAlter?: (ctx: ConstraintOptsAlterContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnNameColonType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnNameColonType?: (ctx: ColumnNameColonTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.colType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColType?: (ctx: ColTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.colTypeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColTypeList?: (ctx: ColTypeListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.listType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListType?: (ctx: ListTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.structType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructType?: (ctx: StructTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.mapType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapType?: (ctx: MapTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.unionType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionType?: (ctx: UnionTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.setOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetOperator?: (ctx: SetOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.queryStatementExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryStatementExpression?: (ctx: QueryStatementExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.queryStatementExpressionBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryStatementExpressionBody?: (ctx: QueryStatementExpressionBodyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.withClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithClause?: (ctx: WithClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.cteStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCteStatement?: (ctx: CteStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.fromStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromStatement?: (ctx: FromStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.singleFromStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSingleFromStatement?: (ctx: SingleFromStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.regularBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRegularBody?: (ctx: RegularBodyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.atomSelectStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomSelectStatement?: (ctx: AtomSelectStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectStatement?: (ctx: SelectStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.setOpSelectStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetOpSelectStatement?: (ctx: SetOpSelectStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectStatementWithCTE`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectStatementWithCTE?: (ctx: SelectStatementWithCTEContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBody?: (ctx: BodyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.insertClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInsertClause?: (ctx: InsertClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.destination`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDestination?: (ctx: DestinationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.limitClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLimitClause?: (ctx: LimitClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.deleteStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeleteStatement?: (ctx: DeleteStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnAssignmentClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnAssignmentClause?: (ctx: ColumnAssignmentClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedencePlusExpressionOrDefault`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedencePlusExpressionOrDefault?: (ctx: PrecedencePlusExpressionOrDefaultContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.setColumnsClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetColumnsClause?: (ctx: SetColumnsClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.updateStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdateStatement?: (ctx: UpdateStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.sqlTransactionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSqlTransactionStatement?: (ctx: SqlTransactionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.startTransactionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartTransactionStatement?: (ctx: StartTransactionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.transactionMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransactionMode?: (ctx: TransactionModeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.transactionAccessMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransactionAccessMode?: (ctx: TransactionAccessModeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.isolationLevel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsolationLevel?: (ctx: IsolationLevelContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.levelOfIsolation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLevelOfIsolation?: (ctx: LevelOfIsolationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.commitStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCommitStatement?: (ctx: CommitStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rollbackStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRollbackStatement?: (ctx: RollbackStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.setAutoCommitStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetAutoCommitStatement?: (ctx: SetAutoCommitStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.abortTransactionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbortTransactionStatement?: (ctx: AbortTransactionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.abortCompactionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAbortCompactionStatement?: (ctx: AbortCompactionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.mergeStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMergeStatement?: (ctx: MergeStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whenClauses`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhenClauses?: (ctx: WhenClausesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whenNotMatchedClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhenNotMatchedClause?: (ctx: WhenNotMatchedClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whenMatchedAndClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhenMatchedAndClause?: (ctx: WhenMatchedAndClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whenMatchedThenClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhenMatchedThenClause?: (ctx: WhenMatchedThenClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.updateOrDelete`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdateOrDelete?: (ctx: UpdateOrDeleteContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.killQueryStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKillQueryStatement?: (ctx: KillQueryStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.compactionId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompactionId?: (ctx: CompactionIdContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.compactionPool`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompactionPool?: (ctx: CompactionPoolContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.compactionType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompactionType?: (ctx: CompactionTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.compactionStatus`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompactionStatus?: (ctx: CompactionStatusContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatement?: (ctx: AlterStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterTableStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTableStatementSuffix?: (ctx: AlterTableStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterTblPartitionStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTblPartitionStatementSuffix?: (ctx: AlterTblPartitionStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementPartitionKeyType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementPartitionKeyType?: (ctx: AlterStatementPartitionKeyTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterViewStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterViewStatementSuffix?: (ctx: AlterViewStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterMaterializedViewStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterMaterializedViewStatementSuffix?: (ctx: AlterMaterializedViewStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterMaterializedViewSuffixRewrite`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterMaterializedViewSuffixRewrite?: (ctx: AlterMaterializedViewSuffixRewriteContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterMaterializedViewSuffixRebuild`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterMaterializedViewSuffixRebuild?: (ctx: AlterMaterializedViewSuffixRebuildContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDatabaseStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDatabaseStatementSuffix?: (ctx: AlterDatabaseStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDatabaseSuffixProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDatabaseSuffixProperties?: (ctx: AlterDatabaseSuffixPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDatabaseSuffixSetOwner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDatabaseSuffixSetOwner?: (ctx: AlterDatabaseSuffixSetOwnerContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDatabaseSuffixSetLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDatabaseSuffixSetLocation?: (ctx: AlterDatabaseSuffixSetLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDatabaseSuffixSetManagedLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDatabaseSuffixSetManagedLocation?: (ctx: AlterDatabaseSuffixSetManagedLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixRename`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixRename?: (ctx: AlterStatementSuffixRenameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixAddCol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixAddCol?: (ctx: AlterStatementSuffixAddColContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixAddConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixAddConstraint?: (ctx: AlterStatementSuffixAddConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixUpdateColumns`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixUpdateColumns?: (ctx: AlterStatementSuffixUpdateColumnsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixDropConstraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixDropConstraint?: (ctx: AlterStatementSuffixDropConstraintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixRenameCol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixRenameCol?: (ctx: AlterStatementSuffixRenameColContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixUpdateStatsCol`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixUpdateStatsCol?: (ctx: AlterStatementSuffixUpdateStatsColContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixUpdateStats`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixUpdateStats?: (ctx: AlterStatementSuffixUpdateStatsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementChangeColPosition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementChangeColPosition?: (ctx: AlterStatementChangeColPositionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixAddPartitions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixAddPartitions?: (ctx: AlterStatementSuffixAddPartitionsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixAddPartitionsElement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixAddPartitionsElement?: (ctx: AlterStatementSuffixAddPartitionsElementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixTouch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixTouch?: (ctx: AlterStatementSuffixTouchContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixArchive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixArchive?: (ctx: AlterStatementSuffixArchiveContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixUnArchive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixUnArchive?: (ctx: AlterStatementSuffixUnArchiveContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionLocation?: (ctx: PartitionLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixDropPartitions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixDropPartitions?: (ctx: AlterStatementSuffixDropPartitionsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixProperties?: (ctx: AlterStatementSuffixPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterViewSuffixProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterViewSuffixProperties?: (ctx: AlterViewSuffixPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixSerdeProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixSerdeProperties?: (ctx: AlterStatementSuffixSerdePropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tablePartitionPrefix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTablePartitionPrefix?: (ctx: TablePartitionPrefixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixFileFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixFileFormat?: (ctx: AlterStatementSuffixFileFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixClusterbySortby`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixClusterbySortby?: (ctx: AlterStatementSuffixClusterbySortbyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterTblPartitionStatementSuffixSkewedLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTblPartitionStatementSuffixSkewedLocation?: (ctx: AlterTblPartitionStatementSuffixSkewedLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedLocations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedLocations?: (ctx: SkewedLocationsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedLocationsList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedLocationsList?: (ctx: SkewedLocationsListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.skewedLocationMap`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSkewedLocationMap?: (ctx: SkewedLocationMapContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixLocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixLocation?: (ctx: AlterStatementSuffixLocationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixSkewedby`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixSkewedby?: (ctx: AlterStatementSuffixSkewedbyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixExchangePartition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixExchangePartition?: (ctx: AlterStatementSuffixExchangePartitionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixRenamePart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixRenamePart?: (ctx: AlterStatementSuffixRenamePartContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixStatsPart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixStatsPart?: (ctx: AlterStatementSuffixStatsPartContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixMergeFiles`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixMergeFiles?: (ctx: AlterStatementSuffixMergeFilesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixBucketNum`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixBucketNum?: (ctx: AlterStatementSuffixBucketNumContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.blocking`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlocking?: (ctx: BlockingContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.compactPool`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompactPool?: (ctx: CompactPoolContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixCompact`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixCompact?: (ctx: AlterStatementSuffixCompactContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixSetOwner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixSetOwner?: (ctx: AlterStatementSuffixSetOwnerContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixSetPartSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixSetPartSpec?: (ctx: AlterStatementSuffixSetPartSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterStatementSuffixExecute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterStatementSuffixExecute?: (ctx: AlterStatementSuffixExecuteContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.fileFormat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFileFormat?: (ctx: FileFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDataConnectorStatementSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDataConnectorStatementSuffix?: (ctx: AlterDataConnectorStatementSuffixContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDataConnectorSuffixProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDataConnectorSuffixProperties?: (ctx: AlterDataConnectorSuffixPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDataConnectorSuffixSetOwner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDataConnectorSuffixSetOwner?: (ctx: AlterDataConnectorSuffixSetOwnerContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterDataConnectorSuffixSetUrl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterDataConnectorSuffixSetUrl?: (ctx: AlterDataConnectorSuffixSetUrlContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.likeTableOrFile`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLikeTableOrFile?: (ctx: LikeTableOrFileContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createTableStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTableStatement?: (ctx: CreateTableStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createDataConnectorStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateDataConnectorStatement?: (ctx: CreateDataConnectorStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dataConnectorComment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataConnectorComment?: (ctx: DataConnectorCommentContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dataConnectorUrl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataConnectorUrl?: (ctx: DataConnectorUrlContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dataConnectorType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDataConnectorType?: (ctx: DataConnectorTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dcProperties`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDcProperties?: (ctx: DcPropertiesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropDataConnectorStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropDataConnectorStatement?: (ctx: DropDataConnectorStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableAllColumns`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableAllColumns?: (ctx: TableAllColumnsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableOrColumn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableOrColumn?: (ctx: TableOrColumnContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.defaultValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultValue?: (ctx: DefaultValueContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.aliasList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAliasList?: (ctx: AliasListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.fromClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromClause?: (ctx: FromClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.fromSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFromSource?: (ctx: FromSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.atomjoinSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomjoinSource?: (ctx: AtomjoinSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.joinSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinSource?: (ctx: JoinSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.joinSourcePart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinSourcePart?: (ctx: JoinSourcePartContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.uniqueJoinSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueJoinSource?: (ctx: UniqueJoinSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.uniqueJoinExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueJoinExpr?: (ctx: UniqueJoinExprContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.uniqueJoinToken`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueJoinToken?: (ctx: UniqueJoinTokenContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.joinToken`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJoinToken?: (ctx: JoinTokenContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.lateralView`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLateralView?: (ctx: LateralViewContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableAlias?: (ctx: TableAliasContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableBucketSample`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableBucketSample?: (ctx: TableBucketSampleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.splitSample`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSplitSample?: (ctx: SplitSampleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableSample`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableSample?: (ctx: TableSampleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableSource?: (ctx: TableSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.asOfClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAsOfClause?: (ctx: AsOfClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.uniqueJoinTableSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUniqueJoinTableSource?: (ctx: UniqueJoinTableSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableName?: (ctx: TableNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.viewName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitViewName?: (ctx: ViewNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.subQuerySource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubQuerySource?: (ctx: SubQuerySourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitioningSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitioningSpec?: (ctx: PartitioningSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionTableFunctionSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionTableFunctionSource?: (ctx: PartitionTableFunctionSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionedTableFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionedTableFunction?: (ctx: PartitionedTableFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereClause?: (ctx: WhereClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.searchCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSearchCondition?: (ctx: SearchConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.valuesSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValuesSource?: (ctx: ValuesSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.valuesClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValuesClause?: (ctx: ValuesClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.valuesTableConstructor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValuesTableConstructor?: (ctx: ValuesTableConstructorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.valueRowConstructor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValueRowConstructor?: (ctx: ValueRowConstructorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.firstValueRowConstructor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFirstValueRowConstructor?: (ctx: FirstValueRowConstructorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.virtualTableSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVirtualTableSource?: (ctx: VirtualTableSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectClause?: (ctx: SelectClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.all_distinct`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAll_distinct?: (ctx: All_distinctContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectList?: (ctx: SelectListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectTrfmClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectTrfmClause?: (ctx: SelectTrfmClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectItem?: (ctx: SelectItemContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.trfmClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrfmClause?: (ctx: TrfmClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectExpression?: (ctx: SelectExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.selectExpressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectExpressionList?: (ctx: SelectExpressionListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_clause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_clause?: (ctx: Window_clauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_defn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_defn?: (ctx: Window_defnContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_specification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_specification?: (ctx: Window_specificationContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_frame`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame?: (ctx: Window_frameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_range_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_range_expression?: (ctx: Window_range_expressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_value_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_value_expression?: (ctx: Window_value_expressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_frame_start_boundary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_start_boundary?: (ctx: Window_frame_start_boundaryContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.window_frame_boundary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWindow_frame_boundary?: (ctx: Window_frame_boundaryContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByClause?: (ctx: GroupByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupby_expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupby_expression?: (ctx: Groupby_expressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupByEmpty`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupByEmpty?: (ctx: GroupByEmptyContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rollupStandard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRollupStandard?: (ctx: RollupStandardContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rollupOldSyntax`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRollupOldSyntax?: (ctx: RollupOldSyntaxContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupingSetExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupingSetExpression?: (ctx: GroupingSetExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupingSetExpressionMultiple`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupingSetExpressionMultiple?: (ctx: GroupingSetExpressionMultipleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.groupingExpressionSingle`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupingExpressionSingle?: (ctx: GroupingExpressionSingleContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.havingClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHavingClause?: (ctx: HavingClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.qualifyClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifyClause?: (ctx: QualifyClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.havingCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHavingCondition?: (ctx: HavingConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionsInParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionsInParenthesis?: (ctx: ExpressionsInParenthesisContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionsNotInParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionsNotInParenthesis?: (ctx: ExpressionsNotInParenthesisContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionPart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionPart?: (ctx: ExpressionPartContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionOrDefault`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionOrDefault?: (ctx: ExpressionOrDefaultContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.firstExpressionsWithAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFirstExpressionsWithAlias?: (ctx: FirstExpressionsWithAliasContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressionWithAlias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionWithAlias?: (ctx: ExpressionWithAliasContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressions?: (ctx: ExpressionsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnRefOrderInParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnRefOrderInParenthesis?: (ctx: ColumnRefOrderInParenthesisContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.columnRefOrderNotInParenthesis`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumnRefOrderNotInParenthesis?: (ctx: ColumnRefOrderNotInParenthesisContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.orderByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderByClause?: (ctx: OrderByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.clusterByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClusterByClause?: (ctx: ClusterByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionByClause?: (ctx: PartitionByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.distributeByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDistributeByClause?: (ctx: DistributeByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.sortByClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortByClause?: (ctx: SortByClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.trimFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTrimFunction?: (ctx: TrimFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.function_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_?: (ctx: Function_Context) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.null_treatment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNull_treatment?: (ctx: Null_treatmentContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.functionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionName?: (ctx: FunctionNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.castExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCastExpression?: (ctx: CastExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.caseExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaseExpression?: (ctx: CaseExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.whenExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhenExpression?: (ctx: WhenExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.floorExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloorExpression?: (ctx: FloorExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.floorDateQualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloorDateQualifiers?: (ctx: FloorDateQualifiersContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.extractExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtractExpression?: (ctx: ExtractExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.timeQualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeQualifiers?: (ctx: TimeQualifiersContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.prepareStmtParam`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrepareStmtParam?: (ctx: PrepareStmtParamContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.parameterIdx`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterIdx?: (ctx: ParameterIdxContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.stringLiteralSequence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteralSequence?: (ctx: StringLiteralSequenceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.charSetStringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCharSetStringLiteral?: (ctx: CharSetStringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dateLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateLiteral?: (ctx: DateLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.timestampLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimestampLiteral?: (ctx: TimestampLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.timestampLocalTZLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimestampLocalTZLiteral?: (ctx: TimestampLocalTZLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.intervalValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalValue?: (ctx: IntervalValueContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.intervalLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalLiteral?: (ctx: IntervalLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.intervalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalExpression?: (ctx: IntervalExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.intervalQualifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalQualifiers?: (ctx: IntervalQualifiersContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.atomExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAtomExpression?: (ctx: AtomExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceFieldExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceFieldExpression?: (ctx: PrecedenceFieldExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceUnaryOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceUnaryOperator?: (ctx: PrecedenceUnaryOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceUnaryPrefixExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceUnaryPrefixExpression?: (ctx: PrecedenceUnaryPrefixExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceBitwiseXorOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceBitwiseXorOperator?: (ctx: PrecedenceBitwiseXorOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceBitwiseXorExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceBitwiseXorExpression?: (ctx: PrecedenceBitwiseXorExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceStarOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceStarOperator?: (ctx: PrecedenceStarOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceStarExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceStarExpression?: (ctx: PrecedenceStarExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedencePlusOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedencePlusOperator?: (ctx: PrecedencePlusOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedencePlusExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedencePlusExpression?: (ctx: PrecedencePlusExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceConcatenateOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceConcatenateOperator?: (ctx: PrecedenceConcatenateOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceConcatenateExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceConcatenateExpression?: (ctx: PrecedenceConcatenateExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceAmpersandOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceAmpersandOperator?: (ctx: PrecedenceAmpersandOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceAmpersandExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceAmpersandExpression?: (ctx: PrecedenceAmpersandExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceBitwiseOrOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceBitwiseOrOperator?: (ctx: PrecedenceBitwiseOrOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceBitwiseOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceBitwiseOrExpression?: (ctx: PrecedenceBitwiseOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceRegexpOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceRegexpOperator?: (ctx: PrecedenceRegexpOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarOperator?: (ctx: PrecedenceSimilarOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.subQueryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubQueryExpression?: (ctx: SubQueryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpression?: (ctx: PrecedenceSimilarExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionMain`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionMain?: (ctx: PrecedenceSimilarExpressionMainContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionPart`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionPart?: (ctx: PrecedenceSimilarExpressionPartContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionAtom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionAtom?: (ctx: PrecedenceSimilarExpressionAtomContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionQuantifierPredicate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionQuantifierPredicate?: (ctx: PrecedenceSimilarExpressionQuantifierPredicateContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.quantifierType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantifierType?: (ctx: QuantifierTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionIn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionIn?: (ctx: PrecedenceSimilarExpressionInContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceSimilarExpressionPartNot`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceSimilarExpressionPartNot?: (ctx: PrecedenceSimilarExpressionPartNotContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceDistinctOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceDistinctOperator?: (ctx: PrecedenceDistinctOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceEqualOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceEqualOperator?: (ctx: PrecedenceEqualOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceEqualExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceEqualExpression?: (ctx: PrecedenceEqualExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.isCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIsCondition?: (ctx: IsConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceUnarySuffixExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceUnarySuffixExpression?: (ctx: PrecedenceUnarySuffixExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceNotOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceNotOperator?: (ctx: PrecedenceNotOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceNotExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceNotExpression?: (ctx: PrecedenceNotExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceAndOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceAndOperator?: (ctx: PrecedenceAndOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceAndExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceAndExpression?: (ctx: PrecedenceAndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceOrOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceOrOperator?: (ctx: PrecedenceOrOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.precedenceOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrecedenceOrExpression?: (ctx: PrecedenceOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.booleanValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanValue?: (ctx: BooleanValueContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.booleanValueTok`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanValueTok?: (ctx: BooleanValueTokContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.tableOrPartition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTableOrPartition?: (ctx: TableOrPartitionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionSpec?: (ctx: PartitionSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionVal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionVal?: (ctx: PartitionValContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionSelectorSpec`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionSelectorSpec?: (ctx: PartitionSelectorSpecContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionSelectorVal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionSelectorVal?: (ctx: PartitionSelectorValContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.partitionSelectorOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartitionSelectorOperator?: (ctx: PartitionSelectorOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.subQuerySelectorOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubQuerySelectorOperator?: (ctx: SubQuerySelectorOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.sysFuncNames`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSysFuncNames?: (ctx: SysFuncNamesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.descFuncNames`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDescFuncNames?: (ctx: DescFuncNamesContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.id_`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId_?: (ctx: Id_Context) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.functionIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionIdentifier?: (ctx: FunctionIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.principalIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrincipalIdentifier?: (ctx: PrincipalIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.nonReserved`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonReserved?: (ctx: NonReservedContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.sql11ReservedKeywordsUsedAsFunctionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql11ReservedKeywordsUsedAsFunctionName?: (ctx: Sql11ReservedKeywordsUsedAsFunctionNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHint?: (ctx: HintContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hintList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHintList?: (ctx: HintListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hintItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHintItem?: (ctx: HintItemContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hintName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHintName?: (ctx: HintNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hintArgs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHintArgs?: (ctx: HintArgsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.hintArgName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHintArgName?: (ctx: HintArgNameContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.prepareStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrepareStatement?: (ctx: PrepareStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.executeStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecuteStatement?: (ctx: ExecuteStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.executeParamList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExecuteParamList?: (ctx: ExecuteParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.resourcePlanDdlStatements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourcePlanDdlStatements?: (ctx: ResourcePlanDdlStatementsContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rpAssign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRpAssign?: (ctx: RpAssignContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rpAssignList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRpAssignList?: (ctx: RpAssignListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rpUnassign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRpUnassign?: (ctx: RpUnassignContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.rpUnassignList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRpUnassignList?: (ctx: RpUnassignListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createResourcePlanStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateResourcePlanStatement?: (ctx: CreateResourcePlanStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.withReplace`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithReplace?: (ctx: WithReplaceContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.activate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActivate?: (ctx: ActivateContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.enable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnable?: (ctx: EnableContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.disable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisable?: (ctx: DisableContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.unmanaged`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnmanaged?: (ctx: UnmanagedContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterResourcePlanStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterResourcePlanStatement?: (ctx: AlterResourcePlanStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.globalWmStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalWmStatement?: (ctx: GlobalWmStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.replaceResourcePlanStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReplaceResourcePlanStatement?: (ctx: ReplaceResourcePlanStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropResourcePlanStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropResourcePlanStatement?: (ctx: DropResourcePlanStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.poolPath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPoolPath?: (ctx: PoolPathContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerExpression?: (ctx: TriggerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerExpressionStandalone`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerExpressionStandalone?: (ctx: TriggerExpressionStandaloneContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerOrExpression?: (ctx: TriggerOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerAndExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerAndExpression?: (ctx: TriggerAndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerAtomExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerAtomExpression?: (ctx: TriggerAtomExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerLiteral?: (ctx: TriggerLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.comparisionOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisionOperator?: (ctx: ComparisionOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerActionExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerActionExpression?: (ctx: TriggerActionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.triggerActionExpressionStandalone`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriggerActionExpressionStandalone?: (ctx: TriggerActionExpressionStandaloneContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createTriggerStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateTriggerStatement?: (ctx: CreateTriggerStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterTriggerStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterTriggerStatement?: (ctx: AlterTriggerStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropTriggerStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropTriggerStatement?: (ctx: DropTriggerStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.poolAssign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPoolAssign?: (ctx: PoolAssignContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.poolAssignList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPoolAssignList?: (ctx: PoolAssignListContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createPoolStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreatePoolStatement?: (ctx: CreatePoolStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterPoolStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterPoolStatement?: (ctx: AlterPoolStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropPoolStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropPoolStatement?: (ctx: DropPoolStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.createMappingStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreateMappingStatement?: (ctx: CreateMappingStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.alterMappingStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlterMappingStatement?: (ctx: AlterMappingStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `HiveParser.dropMappingStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDropMappingStatement?: (ctx: DropMappingStatementContext) => Result;
}

