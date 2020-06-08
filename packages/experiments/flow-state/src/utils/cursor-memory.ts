import * as vscode from "vscode";
import { CursorPositionMode, getCurrentCursorPositionMode } from "./cursor-position";

export let cursorPositionMode: CursorPositionMode;

export let savedSelection: vscode.Selection;

let skipNextAutoPositionSaveByCommand = false;

export function handleCusorPositionChange(changeEvent: vscode.TextEditorSelectionChangeEvent) {
  if (!skipNextAutoPositionSaveByCommand) {
    const editor = changeEvent.textEditor;

    savedSelection = new vscode.Selection(editor.selection.anchor, editor.selection.active);

    cursorPositionMode = getCurrentCursorPositionMode(editor);

    console.log(
      `[cursor mem] auto save: ${savedSelection.anchor.line}:${savedSelection.anchor.character}->${savedSelection.active.line}:${savedSelection.active.character}|${cursorPositionMode}`
    );
  }

  if (skipNextAutoPositionSaveByCommand) {
    console.log(`[cursor mem] skipped auto position save`);
    skipNextAutoPositionSaveByCommand = false;
  }
}

export function saveSelection(selection: vscode.Selection, newCursorPositionMode?: CursorPositionMode, skipNextAutoSave = true) {
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  savedSelection = new vscode.Selection(selection.anchor, selection.active);

  if (newCursorPositionMode) {
    cursorPositionMode = newCursorPositionMode;
  }

  console.log(
    `[cursor mem] manual save: ${savedSelection.anchor.line}:${savedSelection.anchor.character}->${savedSelection.active.line}:${savedSelection.active.character}|${cursorPositionMode}`
  );
}

export function skipNextAutoSaveCausedByCommand() {
  skipNextAutoPositionSaveByCommand = true;
  console.log(`[cursor mem] will skip next position save`);
}
