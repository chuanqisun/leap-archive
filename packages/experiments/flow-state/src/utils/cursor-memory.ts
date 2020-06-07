import * as vscode from "vscode";
import { CursorPositionMode, getCurrentCursorPositionMode } from "./cursor-position";

export let cursorPosition: vscode.Position;
export let cursorPositionMode: CursorPositionMode;

let skipNextAutoSaveByCommand = false;

export function handleCusorPositionChange(changeEvent: vscode.TextEditorSelectionChangeEvent) {
  if (!skipNextAutoSaveByCommand) {
    const editor = changeEvent.textEditor;

    cursorPosition = new vscode.Position(editor.selection.active.line, editor.selection.active.character);
    cursorPositionMode = getCurrentCursorPositionMode(editor);
    console.log(`[cursor mem] auto save: ${[editor.selection.active.line, editor.selection.active.character, cursorPositionMode]}`);
  }

  if (skipNextAutoSaveByCommand && changeEvent.kind === vscode.TextEditorSelectionChangeKind.Command) {
    console.log(`[cursor mem] skipped auto save`);
    skipNextAutoSaveByCommand = false;
  }
}

export function saveCursorPosition(line: number, character: number, changedCursorMode?: CursorPositionMode, skipNextAutoSave = true) {
  // assuming the caller of this function is in a command
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  cursorPosition = new vscode.Position(line, character);

  if (changedCursorMode) {
    cursorPositionMode = changedCursorMode;
  }

  console.log(`[cursor mem] manual save: ${[line, character]}`);
}

function skipNextAutoSaveCausedByCommand() {
  skipNextAutoSaveByCommand = true;
  console.log(`[cursor mem] will skip next auto save`);
}
