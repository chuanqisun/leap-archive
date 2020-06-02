import * as vscode from "vscode";

/**
 * Get the nearest empty line below the cursor, or the last line in the file.
 */
function emptyLineBelow(editor: vscode.TextEditor): vscode.TextLine {
  const document = editor.document;
  var line = editor.selection.active.line;

  let max = document.lineCount - 1;
  while (line < max && !document.lineAt(++line).isEmptyOrWhitespace) {}

  return document.lineAt(line);
}

/**
 * Get the nearest empty line above the cursor, or the first line in the file.
 */
function emptyLineAbove(editor: vscode.TextEditor): vscode.TextLine {
  const document = editor.document;
  let line = editor.selection.active.line;

  const min = 0;
  while (line > min && !document.lineAt(--line).isEmptyOrWhitespace) {}

  return document.lineAt(line);
}

/**
 * Move the cursor to a new position, unselecting selected text.
 */
function changeActive(editor: vscode.TextEditor, newPosn: vscode.Position) {
  // const anchor = editor.selection.anchor
  var newSelection = new vscode.Selection(newPosn, newPosn);
  editor.selection = newSelection;
  editor.revealRange(new vscode.Range(newPosn, newPosn));
}

/**
 * Move the cursor to a new position, preserving text selection.
 */
function changeActiveSelect(editor: vscode.TextEditor, newPosn: vscode.Position) {
  const anchor = editor.selection.anchor;
  var newSelection = new vscode.Selection(anchor, newPosn);
  editor.selection = newSelection;
  editor.revealRange(new vscode.Range(newPosn, newPosn));
}

/**
 * Move the cursor down by one `paragraph`.
 */
function cursorParagraphDown(editor: vscode.TextEditor) {
  const line = emptyLineBelow(editor);
  const newPosn = new vscode.Position(line.lineNumber, line.text.length); // End of line, in case is last line
  changeActive(editor, newPosn);
}

/**
 * Move the cursor down by one `paragraph`, selecting text.
 */
function cursorParagraphDownSelect(editor: vscode.TextEditor) {
  const line = emptyLineBelow(editor);
  const newPosn = new vscode.Position(line.lineNumber, line.text.length); // End of line, in case is last line
  changeActiveSelect(editor, newPosn);
}

/**
 * Move the cursor up by one `paragraph`
 */
function cursorParagraphUp(editor: vscode.TextEditor) {
  const line = emptyLineAbove(editor);
  const newPosn = new vscode.Position(line.lineNumber, 0); // Beginning of line, in case is first line
  changeActive(editor, newPosn);
}

/**
 * Move the cursor up by one `paragraph`, selecting text.
 */
function cursorParagraphUpSelect(editor: vscode.TextEditor) {
  const line = emptyLineAbove(editor);
  const newPosn = new vscode.Position(line.lineNumber, 0); // Beginning of line, in case is first line
  changeActiveSelect(editor, newPosn);
}

export const paragraph = {
  cursorParagraphDown,
  cursorParagraphDownSelect,
  cursorParagraphUp,
  cursorParagraphUpSelect,
};
