import * as vscode from "vscode";

export enum CursorPositionMode {
  Normal = "normal",
  Home = "home",
  End = "end",
}

/**
 * Note: the result will be "home" for empty lines
 */
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

export function isCollapsedOnEmptyLine(editor: vscode.TextEditor): boolean {
  return isCollapsedAtLineStart(editor) && isCollapsedAtLineEnd(editor);
}

export function isCollapsedAtLineStart(editor: vscode.TextEditor): boolean {
  const isEmptySelection = editor.selection.isEmpty;
  if (!isEmptySelection) {
    return false;
  }

  // collapsed at line start
  if (editor.selection.active.character === 0) {
    return true;
  }

  return false;
}

export function isCollapsedAtLineEnd(editor: vscode.TextEditor): boolean {
  const isEmptySelection = editor.selection.isEmpty;
  if (!isEmptySelection) {
    return false;
  }

  // collapsed at line end
  if (editor.selection.active.character === editor.document.lineAt(editor.selection.active.line).range.end.character) {
    return true;
  }

  return false;
}
