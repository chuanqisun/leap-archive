import * as vscode from "vscode";
import { cursorActivePosition, cursorAnchorPosition, cursorPositionMode, saveCursorActivePosition, saveSelection } from "../utils/cursor-memory";
import { CursorPositionMode } from "../utils/cursor-position";

export function activatePanVerticalCommands(context: vscode.ExtensionContext) {
  const panUpCommand = vscode.commands.registerTextEditorCommand("flowState.panUp", (editor) => {
    const candidateLine: number = cursorActivePosition.line - 1;

    if (candidateLine < 0) {
      console.log("[pan-v] document top, noop");
      return;
    }

    // will by on empty line. Since home/start mode will be ambigous, we will manually update position to avoid auto saving mode
    if (editor.document.lineAt(candidateLine).isEmptyOrWhitespace) {
      console.log("[pan-v] will be on empty line, use cursor up");

      const newActive = new vscode.Position(candidateLine, cursorActivePosition.character);
      const newAnchor = new vscode.Position(candidateLine, cursorAnchorPosition.character);

      saveCursorActivePosition(candidateLine, cursorActivePosition.character);
      saveSelection(new vscode.Selection(newAnchor, newActive));
      vscode.commands.executeCommand("cursorUp");

      return;
    }

    // currently on line start/end

    if (cursorPositionMode === CursorPositionMode.End || cursorPositionMode === CursorPositionMode.Home) {
      console.log("[pan-v] line start/end, move up");

      vscode.commands.executeCommand("cursorUp");

      return;
    }

    console.log("[pan-v] line middle, select nearest word");

    selectNearestWordOrPositionOnLine(editor, candidateLine, cursorActivePosition.character);
  });

  const panDownCommand = vscode.commands.registerTextEditorCommand("flowState.panDown", (editor) => {
    const document = editor.document;
    const max = document.lineCount - 1;
    const candidateLine: number = cursorActivePosition.line + 1;

    if (candidateLine > max) {
      console.log("[pan-v] document bottom, noop");
      return;
    }

    // will by on empty line. Since home/start mode will be ambigous, we will manually update position to avoid auto saving mode
    if (editor.document.lineAt(candidateLine).isEmptyOrWhitespace) {
      console.log("[pan-v] will be on empty line, use cursor down");

      const newActive = new vscode.Position(candidateLine, cursorActivePosition.character);
      const newAnchor = new vscode.Position(candidateLine, cursorAnchorPosition.character);

      saveCursorActivePosition(candidateLine, cursorActivePosition.character);
      saveSelection(new vscode.Selection(newAnchor, newActive));
      vscode.commands.executeCommand("cursorDown");

      return;
    }

    // currently on line start/end
    if (cursorPositionMode === CursorPositionMode.End || cursorPositionMode === CursorPositionMode.Home) {
      console.log("[pan-v] line start/end, move down");

      vscode.commands.executeCommand("cursorDown");

      return;
    }

    console.log("[pan-v] line middle, select nearest word");

    selectNearestWordOrPositionOnLine(editor, candidateLine, cursorActivePosition.character);
  });

  context.subscriptions.push(panUpCommand);
  context.subscriptions.push(panDownCommand);
}

// TODO: support the same select regex as horizontal movement
function selectNearestWordOrPositionOnLine(editor: vscode.TextEditor, line: number, character: number) {
  let candidateWordRange: vscode.Range | undefined;

  const referencePosition = new vscode.Position(line, character);
  const safePosition = editor.document.validatePosition(referencePosition);

  candidateWordRange = editor.document.getWordRangeAtPosition(new vscode.Position(line, safePosition.character));
  if (!candidateWordRange) {
    candidateWordRange = new vscode.Range(safePosition, safePosition);
  }

  if (candidateWordRange) {
    editor.selection = new vscode.Selection(candidateWordRange.start, candidateWordRange.end);
    editor.revealRange(candidateWordRange);
    saveCursorActivePosition(line, character);
  }
}
