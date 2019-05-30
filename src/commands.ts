import * as vscode from 'vscode';
import { cloneBreakpointAndSetEnable, getBreakBreakpoints, getExclusiveLogpoints, getLogpoints, getNotLogpoints } from './breakpoint-lib';

export function enableOnlyNonBreakLogpoints() {
	let logpoints: vscode.Breakpoint[] = getExclusiveLogpoints(vscode.debug.breakpoints);
	let disabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(logpoints, true);

	let breakBreakpoints: vscode.Breakpoint[] = getBreakBreakpoints(vscode.debug.breakpoints);
	let enabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(breakBreakpoints, false);

	vscode.debug.removeBreakpoints(vscode.debug.breakpoints);
	vscode.debug.addBreakpoints([...enabledBreakpoints, ...disabledBreakpoints]);
}

export function enableOnlyLogpoints() {
	let logpoints: vscode.Breakpoint[] = getLogpoints(vscode.debug.breakpoints);
	let disabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(logpoints, true);

	let breakBreakpoints: vscode.Breakpoint[] = getNotLogpoints(vscode.debug.breakpoints);
	let enabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(breakBreakpoints, false);

	vscode.debug.removeBreakpoints(vscode.debug.breakpoints);
	vscode.debug.addBreakpoints([...enabledBreakpoints, ...disabledBreakpoints]);
}

export function removeAllBreakpointsExceptLogpoints() {
	let breakBreakpoints: vscode.Breakpoint[] = getNotLogpoints(vscode.debug.breakpoints);
	vscode.debug.removeBreakpoints(breakBreakpoints);
}
