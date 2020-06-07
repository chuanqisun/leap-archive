import * as vscode from "vscode";
import { activatePanVerticalCommands } from "./commands/pan-vertical";
import { cursorPosition, handleCusorPositionChange } from "./utils/cursor-memory";
import { panWordLeft, panWordRight } from "./utils/pan";
import { rotateNext, rotatePrev } from "./utils/rotate";

export enum FlowStateMode {
  Select = "select",
  Edit = "edit",
}

export function activate(context: vscode.ExtensionContext) {
  setMode(FlowStateMode.Edit);

  const handleSelectionChange = vscode.window.onDidChangeTextEditorSelection(handleCusorPositionChange);

  const enterEditModeCommand = vscode.commands.registerTextEditorCommand("flowState.enterEditMode", (editor) => {
    const newSelection = new vscode.Selection(cursorPosition, cursorPosition);
    setMode(FlowStateMode.Edit);

    editor.selection = newSelection;
    editor.revealRange(new vscode.Range(cursorPosition, cursorPosition));
  });

  const enterSelectModeCommand = vscode.commands.registerTextEditorCommand("flowState.enterSelectMode", (editor) => {
    setMode(FlowStateMode.Select);

    vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
  });

  activatePanVerticalCommands(context);

  const rotateUpCommand = vscode.commands.registerTextEditorCommand("flowState.rotatePrev", (editor) => {
    rotatePrev(editor);
  });

  const rotateDownCommand = vscode.commands.registerTextEditorCommand("flowState.rotateNext", (editor) => {
    rotateNext(editor);
  });

  const panLeftCommand = vscode.commands.registerTextEditorCommand("flowState.panLeft", async (editor) => {
    await panWordLeft(editor);
  });

  const panRightCommand = vscode.commands.registerTextEditorCommand("flowState.panRight", async (editor) => {
    await panWordRight(editor);
  });

  context.subscriptions.push(handleSelectionChange);

  context.subscriptions.push(enterEditModeCommand);
  context.subscriptions.push(enterSelectModeCommand);
  context.subscriptions.push(panLeftCommand);
  context.subscriptions.push(panRightCommand);
  context.subscriptions.push(rotateUpCommand);
  context.subscriptions.push(rotateDownCommand);
}

export function deactivate() {}

function setMode(mode: FlowStateMode) {
  vscode.commands.executeCommand("setContext", "flowState.mode", mode);
}
