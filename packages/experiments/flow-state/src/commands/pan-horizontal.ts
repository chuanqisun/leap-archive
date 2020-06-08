import * as vscode from "vscode";
import { isCollapsedAtLineEnd, isCollapsedAtLineStart } from "../utils/cursor-position";
import { collapseToActive, getReversedSelection, selectByRange } from "../utils/select";

export function activatePanHorizontalCommands(context: vscode.ExtensionContext) {
  const panLeftCommand = vscode.commands.registerTextEditorCommand("flowState.panLeft", async (editor) => {
    await panWordLeft(editor);
  });

  const panRightCommand = vscode.commands.registerTextEditorCommand("flowState.panRight", async (editor) => {
    await panWordRight(editor);
  });

  context.subscriptions.push(panLeftCommand);
  context.subscriptions.push(panRightCommand);
}

async function panWordLeft(editor: vscode.TextEditor) {
  // at line start without selection => use built-in bahavior to select the line end above
  if (isCollapsedAtLineStart(editor)) {
    console.log("[pan-h] fallback to cursor left");

    return vscode.commands.executeCommand("cursorLeft");
  }

  // at line start with selection => collapse to line start
  if (editor.selection.active.character === 0) {
    console.log("[pan-h] collapse to line start");
    collapseToActive(editor);
    return;
  }

  // handle a selection where it should be reversed
  if (!tryAlignCursorsLeft(editor)) {
    console.log("[pan-h] align left");
    return;
  }

  // handle position based selection
  const candidateActive = new vscode.Position(editor.selection.active.line, editor.selection.active.character - 1);
  const candidateAnchor = editor.selection.active;
  const candidateLetterRange = new vscode.Range(candidateAnchor, candidateActive);
  const candidateActiveLetter = editor.document.getText(candidateLetterRange);

  console.log("[pan-h] find word based on letter: ", candidateActiveLetter);

  if (candidateActiveLetter.match(/\w+/)) {
    console.log("[pan-h] select word");
    const candidateWordRange = editor.document.getWordRangeAtPosition(candidateActive);
    if (candidateWordRange) {
      selectByRange(editor, candidateWordRange, true);
    } else {
      throw new Error("A word is expected but not found");
    }
  } else {
    console.log("[pan-h] select non-word char");
    selectByRange(editor, candidateLetterRange, true);
  }
}

async function panWordRight(editor: vscode.TextEditor) {
  // at line end without selection => use built-in bahavior to select the line start below
  if (isCollapsedAtLineEnd(editor)) {
    console.log("[pan-h] fallback to cursor right");

    return vscode.commands.executeCommand("cursorRight");
  }

  // at line end with selection => collapse to line end
  if (editor.selection.active.character === editor.document.lineAt(editor.selection.active.line).range.end.character) {
    console.log("[pan-h] collapse to line end");
    collapseToActive(editor);
    return;
  }

  // handle a selection where it should be reversed
  if (!tryAlignCursorsRight(editor)) {
    console.log("[pan-h] align right");
    return;
  }

  // handle position based selection
  const candidateActive = new vscode.Position(editor.selection.active.line, editor.selection.active.character + 1);
  const candidateAnchor = editor.selection.active;
  const candidateLetterRange = new vscode.Range(candidateAnchor, candidateActive);
  const candidateActiveLetter = editor.document.getText(candidateLetterRange);

  console.log("[pan-h] find word based on letter: ", candidateActiveLetter);

  if (candidateActiveLetter.match(/\w+/)) {
    console.log("[pan-h] select word");
    const candidateWordRange = editor.document.getWordRangeAtPosition(candidateActive);
    if (candidateWordRange) {
      selectByRange(editor, candidateWordRange);
    } else {
      throw new Error("A word is expected but not found");
    }
  } else {
    console.log("[pan-h] select non-word char");
    selectByRange(editor, candidateLetterRange);
  }
}

/**
 * Ensure all actives are before anchors
 * return false is active cursors are not left aligned
 */
function tryAlignCursorsLeft(editor: vscode.TextEditor) {
  const unalignedSelections = editor.selections.filter((selection) => !selection.isEmpty && !selection.isReversed);
  if (!unalignedSelections.length) {
    return true;
  } else {
    const alignedSelections = editor.selections.filter((selection) => !selection.isEmpty && selection.isReversed);
    const newlyAlignedSelections = unalignedSelections.map((selection) => getReversedSelection(selection));
    editor.selections = [...alignedSelections, ...newlyAlignedSelections];
  }
}

/**
 * Ensure all actives are after anchors
 * return false is active cursors are not right aligned
 */
function tryAlignCursorsRight(editor: vscode.TextEditor) {
  const unalignedSelections = editor.selections.filter((selection) => !selection.isEmpty && selection.isReversed);
  if (!unalignedSelections.length) {
    return true;
  } else {
    const alignedSelections = editor.selections.filter((selection) => !selection.isEmpty && !selection.isReversed);
    const newlyAlignedSelections = unalignedSelections.map((selection) => getReversedSelection(selection));
    editor.selections = [...alignedSelections, ...newlyAlignedSelections];
  }
}
