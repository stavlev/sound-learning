import * as types from "./actionTypes";
import randomTiles from "./randomTiles";

export function startGame() {
    return {
        type: types.START_GAME,
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
