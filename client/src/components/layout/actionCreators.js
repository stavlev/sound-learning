import * as types from "./actionTypes";

export function updateLevels(level, subLevel) {
    return {
        type: types.UPDATE_LEVELS,
        level,
        subLevel,
    }
}

export function resetLevels() {
    return {
        type: types.RESET_LEVELS,
    }
}