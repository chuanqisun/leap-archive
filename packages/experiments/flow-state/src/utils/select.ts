import * as vscode from "vscode";
import { saveCursorPosition } from "./cursor-memory";

export function selectLineStart(editor: vscode.TextEditor, line: number, preserveCursorPositionMode = false) {
  const lineStartPosition = new vscode.Position(line, 0);
  selectAndReveal(editor, new vscode.Selection(lineStartPosition, lineStartPosition));

  if (preserveCursorPositionMode) {
    saveCursorPosition(line, lineStartPosition.character);
  }
}

export function selectLineEnd(editor: vscode.TextEditor, line: number, preserveCursorPositionMode = false) {
  const lineEndPosition = new vscode.Position(line, editor.document.lineAt(line).range.end.character);
  selectAndReveal(editor, new vscode.Selection(lineEndPosition, lineEndPosition));

  if (preserveCursorPositionMode) {
    saveCursorPosition(line, lineEndPosition.character);
  }
}

export function collapseToActive(editor: vscode.TextEditor) {
  editor.selection = new vscode.Selection(editor.selection.active, editor.selection.active);
}

export function selectByRange(editor: vscode.TextEditor, range: vscode.Range, reverse = false) {
  const anchor = reverse ? range.end : range.start;
  const active = reverse ? range.start : range.end;

  const selection = new vscode.Selection(anchor, active);

  editor.selection = selection;
  editor.revealRange(selection);
}

export function getReversedSelection(selection: vscode.Selection) {
  const active = new vscode.Position(selection.active.line, selection.active.character);
  const anchor = new vscode.Position(selection.anchor.line, selection.anchor.character);
  return new vscode.Selection(active, anchor);
}

export function selectAndReveal(editor: vscode.TextEditor, selection: vscode.Selection) {
  editor.selection = selection;
  editor.revealRange(selection);
}
