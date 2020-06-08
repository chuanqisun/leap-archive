import * as vscode from "vscode";
import { CursorPositionMode, getCurrentCursorPositionMode } from "./cursor-position";

export let cursorPositionMode: CursorPositionMode = CursorPositionMode.Normal;
export let savedSelection: vscode.Selection;

// events may arrive out of order. The the counter to ensure we can handle multiple events in the queue
let numberOfEventsToSkip = 0;

export function handleCusorPositionChange(editor: vscode.TextEditor) {
  if (!numberOfEventsToSkip) {
    savedSelection = new vscode.Selection(editor.selection.anchor, editor.selection.active);

    cursorPositionMode = getCurrentCursorPositionMode(editor);

    console.log(
      `[cursor mem] auto save: ${savedSelection.anchor.line}:${savedSelection.anchor.character}->${savedSelection.active.line}:${savedSelection.active.character}|${cursorPositionMode}`
    );
  }

  if (numberOfEventsToSkip) {
    console.log(`[cursor mem] skipped auto position save`);
    numberOfEventsToSkip--;
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
  numberOfEventsToSkip++;
  console.log(`[cursor mem] will skip next position save`);
}
