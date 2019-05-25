import { setNonBreakLogpointsEnableFlag, setAllLogpointsEnableFlag } from './breakpoint-lib';

export function enableNonBreakLogpoints() {
    setNonBreakLogpointsEnableFlag(true);
}

export function enableAllLogpoints() {
    setAllLogpointsEnableFlag(true);
}
