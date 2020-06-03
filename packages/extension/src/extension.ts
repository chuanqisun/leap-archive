import * as vscode from "vscode";
import { paragraph } from "./utils/paragraph";

enum LeapModeState {
  Off = "off",
  On = "on",
}

const lineHighlighter = vscode.window.createTextEditorDecorationType({
  backgroundColor: new vscode.ThemeColor("editor.hoverHighlightBackground"),
  isWholeLine: true,
});

export function activate(context: vscode.ExtensionContext) {
  context.workspaceState.update("leapModeState", LeapModeState.Off);
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
  statusBarItem.text = "Leap Mode";
  statusBarItem.hide();

  /** mode toggle command */
  const toggleCommand = vscode.commands.registerCommand("leapMode.toggle", () => {
    const currentMode = context.workspaceState.get<LeapModeState>("leapModeState");
    if (currentMode === LeapModeState.Off) {
      turnOnSelectMode(context, statusBarItem);
    } else {
      turnOffSelectMode(context, statusBarItem);
    }
  });
  const enterSelectModeCommand = vscode.commands.registerCommand("leapMode.turnOn", () => {
    turnOnSelectMode(context, statusBarItem);
  });
  const exitSelectModeCommand = vscode.commands.registerCommand("leapMode.turnOff", () => {
    turnOffSelectMode(context, statusBarItem);
  });

  /** handle paragraph movement */
  const cursorParagraphUp = vscode.commands.registerTextEditorCommand("leapMode.cursorParagraphUp", (editor) => paragraph.cursorParagraphUp(editor));
  const cursorParagraphUpSelect = vscode.commands.registerTextEditorCommand("leapMode.cursorParagraphUpSelect", (editor) =>
    paragraph.cursorParagraphUpSelect(editor)
  );
  const cursorParagraphDown = vscode.commands.registerTextEditorCommand("leapMode.cursorParagraphDown", (editor) => paragraph.cursorParagraphDown(editor));
  const cursorParagraphDownSelect = vscode.commands.registerTextEditorCommand("leapMode.cursorParagraphDownSelect", (editor) =>
    paragraph.cursorParagraphDownSelect(editor)
  );

  /** update current line highlight */
  const updateHighLight = vscode.window.onDidChangeTextEditorSelection((e) => {
    const currentMode = context.workspaceState.get<LeapModeState>("leapModeState");
    if (currentMode === LeapModeState.On) {
      const ranges = e.selections.map((selection) => new vscode.Range(selection.start, selection.end));
      e.textEditor.setDecorations(lineHighlighter, ranges);
    } else {
      e.textEditor.setDecorations(lineHighlighter, []);
    }
  });

  context.subscriptions.push(
    toggleCommand,
    enterSelectModeCommand,
    exitSelectModeCommand,
    statusBarItem,
    updateHighLight,
    cursorParagraphDown,
    cursorParagraphUp,
    cursorParagraphDownSelect,
    cursorParagraphUpSelect
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

// function getStatusBarText(mode: LeapModeState) {
//   switch (mode) {
//     case LeapModeState.Off:
//       return "$(edit) Leap: OFF";
//     case LeapModeState.On:
//       return "$(move) Leap: ON";
//   }
// }

/**
 * Use one commands to trigger multiple commands
 * example: addMacroCommand(context, "leap.cursorWordPartUpLeft", ["cursorUp", "cursorWordPartLeft"]);
 */
function addMacroCommand(context: vscode.ExtensionContext, inputCommand: string, outputCommands: string[]) {
  const command = vscode.commands.registerCommand(inputCommand, () => outputCommands.forEach((command) => vscode.commands.executeCommand(command)));

  context.subscriptions.push(command);
}

/**
 * Turn on leap mode
 */
function turnOnSelectMode(context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem) {
  const newState = LeapModeState.On;
  vscode.commands.executeCommand("setContext", "leapMode.state", newState);
  context.workspaceState.update("leapModeState", newState);
  statusBarItem.show();

  const selections = vscode.window.activeTextEditor?.selections;
  if (selections?.length) {
    const ranges = selections.map((selection) => new vscode.Range(selection.start, selection.end));
    vscode.window.activeTextEditor?.setDecorations(lineHighlighter, ranges);
  }
}

/**
 * Turn off leap mode
 */
function turnOffSelectMode(context: vscode.ExtensionContext, statusBarItem: vscode.StatusBarItem) {
  const newState = LeapModeState.Off;
  vscode.commands.executeCommand("setContext", "leapMode.state", newState);
  context.workspaceState.update("leapModeState", newState);
  statusBarItem.hide();

  vscode.window.activeTextEditor?.setDecorations(lineHighlighter, []);
}
