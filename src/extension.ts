import * as vscode from 'vscode';
import { Commands } from './enums';
import { enableOnlyNonBreakLogpoints, enableOnlyLogpoints, removeAllBreakpointsExceptLogpoints } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension `Logpoint Manager` is active.');

	registerCommands(context);
}

function registerCommands(context: vscode.ExtensionContext) {
	let doEnableOnlyNonBreakpointLogpoints = vscode.commands.registerCommand(Commands.enableOnlyNonBreakpointLogpoints, enableOnlyNonBreakLogpoints);
	let doEnableOnlyLogpoints = vscode.commands.registerCommand(Commands.enableOnlyLogpoints, enableOnlyLogpoints);
	let doRemoveAllBreakBreakpointsExceptLogpoints = vscode.commands.registerCommand(Commands.removeAllBreakpointsExceptLogpoints, removeAllBreakpointsExceptLogpoints);

	context.subscriptions.push(doEnableOnlyNonBreakpointLogpoints);
	context.subscriptions.push(doEnableOnlyLogpoints);
	context.subscriptions.push(doRemoveAllBreakBreakpointsExceptLogpoints);
}

export function deactivate() {}
