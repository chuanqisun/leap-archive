import * as vscode from "vscode";

export enum CursorPositionMode {
  Normal = "normal",
  Home = "home",
  End = "end",
}

export function getCurrentCursorPositionMode(editor: vscode.TextEditor): CursorPositionMode {
  const isEmptySelection = editor.selection.isEmpty;
  if (!isEmptySelection) {
    return CursorPositionMode.Normal;
  }

  if (editor.selection.active.character === 0) {
    return CursorPositionMode.Home;
  }

  const currentLineEnd = editor.document.lineAt(editor.selection.active.line).range.end.character;
  if (editor.selection.active.character === currentLineEnd) {
    return CursorPositionMode.End;
  }

  return CursorPositionMode.Normal;
}
