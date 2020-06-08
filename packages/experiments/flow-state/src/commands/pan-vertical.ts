import * as vscode from "vscode";
import { cursorActivePosition, cursorPositionMode, saveCursorActivePosition } from "../utils/cursor-memory";
import { CursorPositionMode } from "../utils/cursor-position";
import { selectByRange, selectLineEnd, selectLineStart } from "../utils/select";

export function activatePanVerticalCommands(context: vscode.ExtensionContext) {
  const panUpCommand = vscode.commands.registerTextEditorCommand("flowState.panUp", (editor) => {
    const candidateLine: number = cursorActivePosition.line - 1;

    if (candidateLine < 0) {
      console.log("[pan-v] document top, noop");
      return;
    }

    if (cursorPositionMode === CursorPositionMode.End) {
      console.log("[pan-v] line end, move up");

      selectLineEndNoAutoSave(editor, candidateLine);
    } else if (cursorPositionMode === CursorPositionMode.Home) {
      console.log("[pan-v] line start, move up");

      selectLineStartNoAutoSave(editor, candidateLine);
    } else {
      console.log("[pan-v] line middle, select nearest word");

      selectNearestWordOrPositionOnLine(editor, candidateLine, cursorActivePosition.character);
    }
  });

  const panDownCommand = vscode.commands.registerTextEditorCommand("flowState.panDown", (editor) => {
    const document = editor.document;
    const max = document.lineCount - 1;
    const candidateLine: number = cursorActivePosition.line + 1;

    if (candidateLine > max) {
      console.log("[pan-v] document bottom, noop");
      return;
    }

    if (cursorPositionMode === CursorPositionMode.End) {
      console.log("[pan-v] line end, move down");
      selectLineEndNoAutoSave(editor, candidateLine);
      return;
    }

    if (cursorPositionMode === CursorPositionMode.Home) {
      console.log("[pan-v] line start, move down");
      selectLineStartNoAutoSave(editor, candidateLine);
      return;
    }

    // selectNearestWordOrPositionOnLine(editor, candidateLine, cursorActivePosition.character);
    // handle position based selection
    const candidateActive = new vscode.Position(candidateLine, cursorActivePosition.character);
    const candidateAnchor = new vscode.Position(candidateLine, cursorActivePosition.character - 1);
    const candidateLetterRange = new vscode.Range(candidateAnchor, candidateActive);
    const candidateActiveLetter = editor.document.getText(candidateLetterRange);

    console.log("[pan-v] find word based on letter: ", candidateActiveLetter);

    if (candidateActiveLetter.match(/\w+/)) {
      console.log("[pan-v] select word");
      const candidateWordRange = editor.document.getWordRangeAtPosition(candidateActive);
      if (candidateWordRange) {
        selectByRange(editor, candidateWordRange, true); // sign should be based on reversal state
      } else {
        throw new Error("A word is expected but not found");
      }
    } else {
      console.log("[pan-v] select non-word char");
      selectByRange(editor, candidateLetterRange); // sign should be based on reversal state
    }
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

function selectLineStartNoAutoSave(editor: vscode.TextEditor, line: number) {
  selectLineStart(editor, line, true);
}

function selectLineEndNoAutoSave(editor: vscode.TextEditor, line: number) {
  selectLineEnd(editor, line, true);
}
