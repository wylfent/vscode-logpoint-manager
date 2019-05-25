import * as vscode from 'vscode';
import { Commands } from './enums';
import { enableNonBreakLogpoints, enableAllLogpoints } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "logpoint-enable" is active.');

	registerCommands(context);
}

function registerCommands(context: vscode.ExtensionContext) {
	let doEnableNonBreakLogpoints =vscode.commands.registerCommand(Commands.enableNonBreakLogpoints, enableNonBreakLogpoints);
	let doEnableAllLogpoints = vscode.commands.registerCommand(Commands.enableAllLogpoints, enableAllLogpoints);

	context.subscriptions.push(doEnableNonBreakLogpoints);
	context.subscriptions.push(doEnableAllLogpoints);
}

export function deactivate() {}
