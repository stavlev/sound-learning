import * as types from "./actionTypes";
import randomTiles from "./randomTiles";

export function startGame() {
    return {
        type: types.START_MEMORY_GAME,
        tiles: randomTiles.getTiles(),
        isGameStarted: true,
    }
}

export function flipTile(index, tile) {
    return {
        type: types.FLIP_TILE,
        index,
        tile
    }
}

export function toggleIsWaiting(isWaiting) {
    return {
        type: types.TOGGLE_IS_WAITING,
        isWaiting
    }
}

export function incrementTries() {
    return {
        type: types.INCREMENT_TRIES
    }
}

export function matchCheck(flippedTiles) {
    return {
        type: types.MATCH_CHECK,
        flippedTiles
    }
}

export function onSetdbUser(dbUser) {
    return {
        type: types.DB_USER_SET,
        dbUser,
    }
}

export function updateLevels(level, subLevel) {
    return {
        type: types.UPDATE_LEVELS,
        level,
        subLevel
    }
}
