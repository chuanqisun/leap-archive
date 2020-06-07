import * as vscode from "vscode";
import { cursorPosition, cursorPositionMode, saveCursorPosition } from "../utils/cursor-memory";
import { CursorPositionMode } from "../utils/cursor-position";

export function activatePanVerticalCommands(context: vscode.ExtensionContext) {
  const panUpCommand = vscode.commands.registerTextEditorCommand("flowState.panUp", (editor) => {
    const candidateLine: number = cursorPosition.line - 1;

    if (candidateLine < 0) {
      return;
    }

    if (cursorPositionMode === CursorPositionMode.End) {
      selectLineEnd(editor, candidateLine);
    } else if (cursorPositionMode === CursorPositionMode.Home) {
      selectLineStart(editor, candidateLine);
    } else {
      selectNearestWordOrPositionOnLine(editor, candidateLine, cursorPosition.character);
    }
  });

  const panDownCommand = vscode.commands.registerTextEditorCommand("flowState.panDown", (editor) => {
    const document = editor.document;
    const max = document.lineCount - 1;
    const candidateLine: number = cursorPosition.line + 1;

    if (candidateLine > max) {
      return;
    }

    if (cursorPositionMode === CursorPositionMode.End) {
      selectLineEnd(editor, candidateLine);
    } else if (cursorPositionMode === CursorPositionMode.Home) {
      selectLineStart(editor, candidateLine);
    } else {
      selectNearestWordOrPositionOnLine(editor, candidateLine, cursorPosition.character);
    }
  });

  context.subscriptions.push(panUpCommand);
  context.subscriptions.push(panDownCommand);
}

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
    saveCursorPosition(line, character);
  }
}

function selectLineStart(editor: vscode.TextEditor, line: number) {
  const lineStartPosition = new vscode.Position(line, 0);
  const lineStartSelection = new vscode.Selection(lineStartPosition, lineStartPosition);
  editor.selection = lineStartSelection;
  editor.revealRange(lineStartSelection);
  saveCursorPosition(line, lineStartPosition.character);
}

function selectLineEnd(editor: vscode.TextEditor, line: number) {
  const lineEndPosition = new vscode.Position(line, editor.document.lineAt(line).range.end.character);
  const lineEndSelection = new vscode.Selection(lineEndPosition, lineEndPosition);
  editor.selection = lineEndSelection;
  editor.revealRange(lineEndSelection);
  saveCursorPosition(line, lineEndPosition.character);
}
