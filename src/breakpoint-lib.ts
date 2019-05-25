import * as vscode from 'vscode';

export function setNonBreakLogpointsEnableFlag(enable: boolean): void {
	let breakpoints: vscode.Breakpoint[] = getExclusiveLogpoints(vscode.debug.breakpoints);
	let disabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(breakpoints, enable);

	vscode.debug.removeBreakpoints(breakpoints);
	vscode.debug.addBreakpoints(disabledBreakpoints);
}

export function setAllLogpointsEnableFlag(enable: boolean): void {
	let breakpoints: vscode.Breakpoint[] = getLogpoints(vscode.debug.breakpoints);
	let disabledBreakpoints: vscode.Breakpoint[] = cloneBreakpointAndSetEnable(breakpoints, enable);

	vscode.debug.removeBreakpoints(breakpoints);
	vscode.debug.addBreakpoints(disabledBreakpoints);
}

// private function

function getLogpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return isLogpoint(breakpoint0); });
}

function getExclusiveLogpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return isExclusiveLogpoint(breakpoint0); });
}

function isLogpoint(breakpoint0: vscode.Breakpoint): boolean {
	return !!breakpoint0.logMessage;
}

function isExclusiveLogpoint(breakpoint0: vscode.Breakpoint): boolean {
	if (breakpoint0.logMessage && !breakpoint0.hitCondition && !breakpoint0.condition) {
		return true;
	} else {
		return false;
	}
}

function cloneBreakpointAndSetEnable(breakpoints: vscode.Breakpoint[], enable: boolean): vscode.Breakpoint[] {
	let result: (vscode.Breakpoint | null)[] = breakpoints.map((bp: vscode.Breakpoint) => {
		if (bp instanceof vscode.SourceBreakpoint) {
			return new vscode.SourceBreakpoint(bp.location, enable, bp.condition, bp.hitCondition, bp.logMessage) as vscode.Breakpoint;
		} else if (bp instanceof vscode.FunctionBreakpoint) {
			return new vscode.FunctionBreakpoint(bp.functionName, enable, bp.condition, bp.hitCondition, bp.logMessage) as vscode.Breakpoint;
		}
		return null;
	}).filter(bp => bp !== null);
	return result as vscode.Breakpoint[];
}
