/// <amd-module name="@ngrx/entity/schematics-core/utility/ast-utils" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { Change, ReplaceChange, RemoveChange } from './change';
import { Path } from '@angular-devkit/core';
/**
 * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
 * @param node
 * @param kind
 * @param max The maximum number of items to return.
 * @return all nodes of kind, or [] if none is found
 */
export declare function findNodes(node: ts.Node, kind: ts.SyntaxKind, max?: number): ts.Node[];
/**
 * Get all the nodes from a source.
 * @param sourceFile The source file object.
 * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
 */
export declare function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[];
/**
 * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
 * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
 * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
 *
 * @param nodes insert after the last occurence of nodes
 * @param toInsert string to insert
 * @param file file to insert changes into
 * @param fallbackPos position to insert if toInsert happens to be the first occurence
 * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
 * @return Change instance
 * @throw Error if toInsert is first occurence but fall back is not set
 */
export declare function insertAfterLastOccurrence(nodes: ts.Node[], toInsert: string, file: string, fallbackPos: number, syntaxKind?: ts.SyntaxKind): Change;
export declare function getContentOfKeyLiteral(_source: ts.SourceFile, node: ts.Node): string | null;
export declare function getDecoratorMetadata(source: ts.SourceFile, identifier: string, module: string): ts.Node[];
/**
 * Custom function to insert a declaration (component, pipe, directive)
 * into NgModule declarations. It also imports the component.
 */
export declare function addDeclarationToModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
/**
 * Custom function to insert a declaration (component, pipe, directive)
 * into NgModule declarations. It also imports the component.
 */
export declare function addImportToModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
/**
 * Custom function to insert a provider into NgModule. It also imports it.
 */
export declare function addProviderToModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
export declare function addExportToModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
export declare function addBootstrapToModule(source: ts.SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
/**
 * Add Import `import { symbolName } from fileName` if the import doesn't exit
 * already. Assumes fileToEdit can be resolved and accessed.
 * @param fileToEdit (file we want to add import to)
 * @param symbolName (item to import)
 * @param fileName (path to the file)
 * @param isDefault (if true, import follows style for importing default exports)
 * @return Change
 */
export declare function insertImport(source: ts.SourceFile, fileToEdit: string, symbolName: string, fileName: string, isDefault?: boolean): Change;
export declare function replaceImport(sourceFile: ts.SourceFile, path: Path, importFrom: string, importAsIs: string, importToBe: string): (ReplaceChange | RemoveChange)[];
export declare function containsProperty(objectLiteral: ts.ObjectLiteralExpression, propertyName: string): boolean;
