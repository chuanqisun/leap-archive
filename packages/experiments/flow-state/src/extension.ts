import * as vscode from "vscode";
import { cursorPosition, rememberCursorPosition, updateCursorPosition } from "./utils/cursor-position";
import { panWordLeft, panWordRight } from "./utils/pan";
import { rotateNext, rotatePrev } from "./utils/rotate";

export enum FlowStateMode {
  Select = "select",
  Edit = "edit",
}

export function activate(context: vscode.ExtensionContext) {
  setMode(FlowStateMode.Edit);

  const enterEditModeCommand = vscode.commands.registerTextEditorCommand("flowState.enterEditMode", (editor) => {
    const newSelection = new vscode.Selection(cursorPosition, cursorPosition);
    setMode(FlowStateMode.Edit);

    editor.selection = newSelection;
    editor.revealRange(new vscode.Range(cursorPosition, cursorPosition));
  });

  const enterSelectModeCommand = vscode.commands.registerTextEditorCommand("flowState.enterSelectMode", (editor) => {
    rememberCursorPosition(editor);
    setMode(FlowStateMode.Select);

    vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
  });

  const panUpCommand = vscode.commands.registerTextEditorCommand("flowState.panUp", (editor) => {
    if (cursorPosition.line > 0) {
      updateCursorPosition(editor, cursorPosition.line - 1, cursorPosition.character);
      vscode.commands.executeCommand("cancelSelection");
      editor.selection = new vscode.Selection(cursorPosition, cursorPosition);
      vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
    }
  });

  const panDownCommand = vscode.commands.registerTextEditorCommand("flowState.panDown", (editor) => {
    const document = editor.document;
    const max = document.lineCount - 1;

    if (cursorPosition.line < max) {
      updateCursorPosition(editor, cursorPosition.line + 1, cursorPosition.character);
      vscode.commands.executeCommand("cancelSelection");
      editor.selection = new vscode.Selection(cursorPosition, cursorPosition);
      vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
    }
  });

  const rotateUpCommand = vscode.commands.registerTextEditorCommand("flowState.rotatePrev", (editor) => {
    rotatePrev(editor);
    rememberCursorPosition(editor);
  });

  const rotateDownCommand = vscode.commands.registerTextEditorCommand("flowState.rotateNext", (editor) => {
    rotateNext(editor);
    rememberCursorPosition(editor);
  });

  const panLeftCommand = vscode.commands.registerTextEditorCommand("flowState.panLeft", async (editor) => {
    await panWordLeft(editor);
    rememberCursorPosition(editor);
  });

  const panRightCommand = vscode.commands.registerTextEditorCommand("flowState.panRight", async (editor) => {
    await panWordRight(editor);
    rememberCursorPosition(editor);
  });

  context.subscriptions.push(enterEditModeCommand);
  context.subscriptions.push(enterSelectModeCommand);
  context.subscriptions.push(panUpCommand);
  context.subscriptions.push(panDownCommand);
  context.subscriptions.push(panLeftCommand);
  context.subscriptions.push(panRightCommand);
  context.subscriptions.push(rotateUpCommand);
  context.subscriptions.push(rotateDownCommand);
}

export function deactivate() {}

function setMode(mode: FlowStateMode) {
  vscode.commands.executeCommand("setContext", "flowState.mode", mode);
}
