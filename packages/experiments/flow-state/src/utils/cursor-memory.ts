import * as vscode from "vscode";
import { CursorPositionMode, getCurrentCursorPositionMode } from "./cursor-position";

export let cursorActivePosition: vscode.Position;
export let cursorAnchorPosition: vscode.Position;
export let cursorPositionMode: CursorPositionMode;

export let savedSelection: vscode.Selection;

let skipNextAutoPositionSaveByCommand = false;

export function handleCusorPositionChange(changeEvent: vscode.TextEditorSelectionChangeEvent) {
  if (!skipNextAutoPositionSaveByCommand) {
    const editor = changeEvent.textEditor;

    cursorActivePosition = new vscode.Position(editor.selection.active.line, editor.selection.active.character);
    cursorAnchorPosition = new vscode.Position(editor.selection.anchor.line, editor.selection.anchor.character);
    savedSelection = new vscode.Selection(editor.selection.anchor, editor.selection.active);

    cursorPositionMode = getCurrentCursorPositionMode(editor);

    console.log(
      `[cursor mem] auto save: ${cursorAnchorPosition.line}:${cursorAnchorPosition.character}->${cursorActivePosition.line}:${cursorActivePosition.character}|${cursorPositionMode}`
    );
  }

  if (skipNextAutoPositionSaveByCommand && changeEvent.kind === vscode.TextEditorSelectionChangeKind.Command) {
    console.log(`[cursor mem] skipped auto position save`);
    skipNextAutoPositionSaveByCommand = false;
  }
}

export function saveCursorActivePosition(line: number, character: number, newCursorPositionMode?: CursorPositionMode, skipNextAutoSave = true) {
  // assuming the caller of this function is in a command
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  cursorActivePosition = new vscode.Position(line, character);

  if (newCursorPositionMode) {
    cursorPositionMode = newCursorPositionMode;
  }

  console.log(`[cursor mem] manual save: ${[line, character]}`);
}

export function saveSelection(selection: vscode.Selection, newCursorPositionMode?: CursorPositionMode, skipNextAutoSave = true) {
  skipNextAutoSave && skipNextAutoSaveCausedByCommand();
  savedSelection = new vscode.Selection(selection.anchor, selection.anchor);

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
