import * as vscode from 'vscode';

enum InputMode {
	Edit = 'edit',
	Select = 'select'
}

export function activate(context: vscode.ExtensionContext) {

	context.workspaceState.update('leapMode', InputMode.Edit);
	const statusBarItem = vscode.window.createStatusBarItem()
	statusBarItem.text = InputMode.Edit;
	statusBarItem.show();

	const toggleCommand = vscode.commands.registerCommand('leap.toggleMode', () => {

		const currentMode = context.workspaceState.get<InputMode>('leapMode');
		const newMode = (currentMode === InputMode.Edit) ? InputMode.Select : InputMode.Edit;
		vscode.commands.executeCommand('setContext', 'leap.mode', newMode)
		context.workspaceState.update('leapMode', newMode);
		statusBarItem.text = newMode;
	});

	context.subscriptions.push(toggleCommand);
	context.subscriptions.push(statusBarItem);
}

// this method is called when your extension is deactivated
export function deactivate() { }
