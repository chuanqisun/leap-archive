import * as vscode from "vscode";
import { CursorPositionMode, getCurrentCursorPositionMode } from "./cursor-position";

export let cursorPosition: vscode.Position;
export let cursorPositionMode: CursorPositionMode;

let skipNextAutoPositionSaveByCommand = false;

export function handleCusorPositionChange(changeEvent: vscode.TextEditorSelectionChangeEvent) {
  if (!skipNextAutoPositionSaveByCommand) {
    const editor = changeEvent.textEditor;

    cursorPosition = new vscode.Position(editor.selection.active.line, editor.selection.active.character);
    cursorPositionMode = getCurrentCursorPositionMode(editor);

    console.log(`[cursor mem] auto save: ${[editor.selection.active.line, editor.selection.active.character, cursorPositionMode]}`);
  }

  if (skipNextAutoPositionSaveByCommand && changeEvent.kind === vscode.TextEditorSelectionChangeKind.Command) {
    console.log(`[cursor mem] skipped auto position save`);
    skipNextAutoPositionSaveByCommand = false;
  }
}

export function saveCursorPosition(line: number, character: number, newCursorPositionMode?: CursorPositionMode, skipNextAutoSave = true) {
  // assuming the caller of this function is in a command
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  cursorPosition = new vscode.Position(line, character);

  if (newCursorPositionMode) {
    cursorPositionMode = newCursorPositionMode;
  }

  console.log(`[cursor mem] manual save: ${[line, character]}`);
}

function skipNextAutoSaveCausedByCommand() {
  skipNextAutoPositionSaveByCommand = true;
  console.log(`[cursor mem] will skip next position save`);
}
