import * as vscode from "vscode";
import { paragraph } from "./utils/paragraph";

enum InputMode {
  Edit = "edit",
  Select = "select",
}

const lineHighlighter = vscode.window.createTextEditorDecorationType({
  backgroundColor: new vscode.ThemeColor("editor.hoverHighlightBackground"),
  isWholeLine: true,
});

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

    // first and last update of highlighter
    if (newMode === InputMode.Edit) {
      vscode.window.activeTextEditor?.setDecorations(lineHighlighter, []);
    } else {
      const selections = vscode.window.activeTextEditor?.selections;
      if (selections?.length) {
        const ranges = selections.map((selection) => new vscode.Range(selection.start, selection.end));
        vscode.window.activeTextEditor?.setDecorations(lineHighlighter, ranges);
      }
    }
  });

  /** handle paragraph movement */
  const cursorParagraphUp = vscode.commands.registerTextEditorCommand("leap.cursorParagraphUp", (editor) => paragraph.cursorParagraphUp(editor));
  const cursorParagraphUpSelect = vscode.commands.registerTextEditorCommand("leap.cursorParagraphUpSelect", (editor) =>
    paragraph.cursorParagraphUpSelect(editor)
  );
  const cursorParagraphDown = vscode.commands.registerTextEditorCommand("leap.cursorParagraphDown", (editor) => paragraph.cursorParagraphDown(editor));
  const cursorParagraphDownSelect = vscode.commands.registerTextEditorCommand("leap.cursorParagraphDownSelect", (editor) =>
    paragraph.cursorParagraphDownSelect(editor)
  );

  /** update current line highlight */
  const updateHighLight = vscode.window.onDidChangeTextEditorSelection((e) => {
    const currentMode = context.workspaceState.get<InputMode>("leapMode");
    if (currentMode === InputMode.Select) {
      const ranges = e.selections.map((selection) => new vscode.Range(selection.start, selection.end));
      e.textEditor.setDecorations(lineHighlighter, ranges);
    } else {
      e.textEditor.setDecorations(lineHighlighter, []);
    }
  });

  context.subscriptions.push(
    toggleCommand,
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
