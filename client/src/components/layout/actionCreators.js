import * as types from "./actionTypes";

export function updateLevels(level, subLevel) {
    return {
        type: types.UPDATE_LEVELS,
        level,
        subLevel,
    }
}