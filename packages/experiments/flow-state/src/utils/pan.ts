import * as vscode from "vscode";

export async function panWordLeft(editor: vscode.TextEditor) {
  // reverse.
  if (!tryLeftAlign(editor)) {
    return;
  }

  await vscode.commands.executeCommand("cursorRight");
  await vscode.commands.executeCommand("cursorWordEndLeft");
  await vscode.commands.executeCommand("cursorWordStartLeftSelect");
}

export async function panWordRight(editor: vscode.TextEditor) {
  // reverse.
  if (!tryRightAlign(editor)) {
    return;
  }

  await vscode.commands.executeCommand("cursorLeft");
  await vscode.commands.executeCommand("cursorWordStartRight");
  await vscode.commands.executeCommand("cursorWordEndRightSelect");
}

export function panWordDown(editor: vscode.TextEditor) {
  // need to rely on memorized curosr position to find the nearest word below the current line
}

/**
 * Ensure all actives are before anchors
 * return false is active cursors are not left aligned
 */
function tryLeftAlign(editor: vscode.TextEditor) {
  const unalignedSelections = editor.selections.filter((selection) => !selection.isReversed);
  if (!unalignedSelections.length) {
    return true;
  } else {
    const alignedSelections = editor.selections.filter((selection) => selection.isReversed);
    const newlyAlignedSelections = unalignedSelections.map((selection) => reverse(selection));
    editor.selections = [...alignedSelections, ...newlyAlignedSelections];
  }
}
/**
 * Ensure all actives are after anchors
 * return false is active cursors are not right aligned
 */
function tryRightAlign(editor: vscode.TextEditor) {
  const unalignedSelections = editor.selections.filter((selection) => selection.isReversed);
  if (!unalignedSelections.length) {
    return true;
  } else {
    const alignedSelections = editor.selections.filter((selection) => !selection.isReversed);
    const newlyAlignedSelections = unalignedSelections.map((selection) => reverse(selection));
    editor.selections = [...alignedSelections, ...newlyAlignedSelections];
  }
}

/** reverse anchor and active position */
function reverse(selection: vscode.Selection) {
  const active = new vscode.Position(selection.active.line, selection.active.character);
  const anchor = new vscode.Position(selection.anchor.line, selection.anchor.character);
  return new vscode.Selection(active, anchor);
}
