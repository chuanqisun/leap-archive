import * as vscode from "vscode";

export let cursorPosition: vscode.Position;

export function rememberCursorPosition(editor: vscode.TextEditor) {
  cursorPosition = new vscode.Position(editor.selection.active.line, editor.selection.active.character);
}

export function updateCursorPosition(editor: vscode.TextEditor, line: number, character: number) {
  cursorPosition = new vscode.Position(line, character);
}
