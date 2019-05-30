import * as vscode from 'vscode';

// Filter logpoints from breakpoint array
export function getLogpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return isLogpoint(breakpoint0); });
}

// Filter break breakpoints from breakpoint array
export function getNotLogpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return !isLogpoint(breakpoint0); });
}

// Filter non-break logpoints from breakpoint array (no expression/hitcount, only log message)
export function getExclusiveLogpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return isExclusiveLogpoint(breakpoint0); });
}

// Filter break breakpoints from breakpoint array
export function getBreakBreakpoints(breakpoints: vscode.Breakpoint[]): vscode.Breakpoint[] {
	return breakpoints.filter((breakpoint0: vscode.Breakpoint) => { return !isExclusiveLogpoint(breakpoint0); });
}

// Clone Breakpoint array and set their enable properies
export function cloneBreakpointAndSetEnable(breakpoints: vscode.Breakpoint[], enable: boolean): vscode.Breakpoint[] {
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





/* -------------------------------------------------- \
/ Private
/* --------------------------------------------------*/

// Check if breakpoints is logpoint or not by checking log message
function isLogpoint(breakpoint0: vscode.Breakpoint): boolean {
	return !!breakpoint0.logMessage;
}

// Checking if breakpoints is exclusive logpoint (a logpoint with no expression/hitcount)
function isExclusiveLogpoint(breakpoint0: vscode.Breakpoint): boolean {
	if (breakpoint0.logMessage && !breakpoint0.hitCondition && !breakpoint0.condition) {
		return true;
	} else {
		return false;
	}
}
