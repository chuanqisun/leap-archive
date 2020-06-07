import * as vscode from "vscode";

export let cursorPosition: vscode.Position;
export let cursorMode: CursorMode;
export enum CursorMode {
  Normal = "normal",
  Home = "home",
  End = "end",
}

let skipNextAutoSaveByCommand = false;

export function handleCusorPositionChange(changeEvent: vscode.TextEditorSelectionChangeEvent) {
  if (!skipNextAutoSaveByCommand) {
    const editor = changeEvent.textEditor;

    cursorPosition = new vscode.Position(editor.selection.active.line, editor.selection.active.character);
    cursorMode = getCurrentCursorMode(editor);
    console.log(`[cursor mem] auto save: ${[editor.selection.active.line, editor.selection.active.character, cursorMode]}`);
  }

  if (skipNextAutoSaveByCommand && changeEvent.kind === vscode.TextEditorSelectionChangeKind.Command) {
    console.log(`[cursor mem] skipped auto save`);
    skipNextAutoSaveByCommand = false;
  }
}

export function saveCursorPosition(line: number, character: number, changedCursorMode?: CursorMode, skipNextAutoSave = true) {
  // assuming the caller of this function is in a command
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  cursorPosition = new vscode.Position(line, character);

  if (changedCursorMode) {
    cursorMode = changedCursorMode;
  }

  console.log(`[cursor mem] manual save: ${[line, character]}`);
}

function skipNextAutoSaveCausedByCommand() {
  skipNextAutoSaveByCommand = true;
  console.log(`[cursor mem] will skip next auto save`);
}

function getCurrentCursorMode(editor: vscode.TextEditor): CursorMode {
  const isEmptySelection = editor.selection.isEmpty;
  if (!isEmptySelection) {
    return CursorMode.Normal;
  }

  if (editor.selection.active.character === 0) {
    return CursorMode.Home;
  }

  const currentLineEnd = editor.document.lineAt(editor.selection.active.line).range.end.character;
  if (editor.selection.active.character === currentLineEnd) {
    return CursorMode.End;
  }

  return CursorMode.Normal;
}
