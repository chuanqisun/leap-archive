import * as vscode from "vscode";

enum InputMode {
  Edit = "edit",
  Select = "select",
}

export function activate(context: vscode.ExtensionContext) {
  context.workspaceState.update("leapMode", InputMode.Edit);
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
  statusBarItem.text = getStatusBarText(InputMode.Edit);
  statusBarItem.show();

  /** mode toggle command */
  const toggleCommand = vscode.commands.registerCommand("leap.toggleMode", () => {
    const currentMode = context.workspaceState.get<InputMode>("leapMode");
    const newMode = currentMode === InputMode.Edit ? InputMode.Select : InputMode.Edit;
    vscode.commands.executeCommand("setContext", "leap.mode", newMode);
    context.workspaceState.update("leapMode", newMode);
    statusBarItem.text = getStatusBarText(newMode);
  });

  context.subscriptions.push(toggleCommand);
  context.subscriptions.push(statusBarItem);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getStatusBarText(mode: InputMode) {
  switch (mode) {
    case InputMode.Edit:
      return "$(edit) Edit";
    case InputMode.Select:
      return "$(move) Select";
  }
}

/**
 * Use one commands to trigger multiple commands
 * example: addMacroCommand(context, "leap.cursorWordPartUpLeft", ["cursorUp", "cursorWordPartLeft"]);
 */
function addMacroCommand(context: vscode.ExtensionContext, inputCommand: string, outputCommands: string[]) {
  const command = vscode.commands.registerCommand(inputCommand, () => outputCommands.forEach((command) => vscode.commands.executeCommand(command)));

  context.subscriptions.push(command);
}
