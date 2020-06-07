import * as vscode from "vscode";

export function rotateNext(editor: vscode.TextEditor) {
  const selections = [...editor.selections],
    last = selections.length - 1,
    firstSelection = selections[0];

  for (let i = 0; i < last; i++) {
    selections[i] = selections[i + 1];
  }

  selections[last] = firstSelection;
  editor.selections = selections;
  editor.revealRange(editor.selection, vscode.TextEditorRevealType.InCenter);
}

export function rotatePrev(editor: vscode.TextEditor) {
  const selections = [...editor.selections],
    last = selections.length - 1,
    lastSelection = selections[last];

  for (let i = last; i > 0; i--) {
    selections[i] = selections[i - 1];
  }

  selections[0] = lastSelection;
  editor.selections = selections;
  editor.revealRange(editor.selection, vscode.TextEditorRevealType.InCenter);
}
