import * as vscode from "vscode";
import { activatePanHorizontalCommands } from "./commands/pan-horizontal";
import { activatePanVerticalCommands } from "./commands/pan-vertical";
import { handleCusorPositionChange } from "./utils/cursor-memory";

export enum FlowStateMode {
  Select = "select",
  Edit = "edit" /** TODO: eliminate edit mode */,
}

export function activate(context: vscode.ExtensionContext) {
  setMode(FlowStateMode.Select);

  const handleSelectionChange = vscode.window.onDidChangeTextEditorSelection((e) => handleCusorPositionChange(e.textEditor));

  if (vscode.window.activeTextEditor) {
    handleCusorPositionChange(vscode.window.activeTextEditor);
  }

  activatePanVerticalCommands(context);
  activatePanHorizontalCommands(context);

  context.subscriptions.push(handleSelectionChange);
}

export function deactivate() {}

function setMode(mode: FlowStateMode) {
  vscode.commands.executeCommand("setContext", "flowState.mode", mode);
}
