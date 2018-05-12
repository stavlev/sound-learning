import * as types from "../components/levels/memory-game/actionTypes";

const INITIAL_STATE = {
    tiles: [],
    isWaiting: false,
    numberOfTries: 0,
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),

    isGameStarted: false,
    isGameFinished: false,
    //gainNode: null,
}

export default function memoryGameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.START_MEMORY_GAME: {
            /*action.tiles.forEach(function (tile, index) {
                var oscillator = state.audioCtx.createOscillator();

                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(tile.multiplier * 100 + 140, state.audioCtx.currentTime); // value in hertz
                oscillator.frequency.linearRampToValueAtTime(tile.multiplier * 100 - 130, state.audioCtx.currentTime + 1);
                oscillator.start();

                tile.node = oscillator;
            })*/

            /*var gainNodeTemp = state.audioCtx.createGain();
            gainNodeTemp.gain.value = 0.2;*/

            return {
                ...state,
                isWaiting: false,
                isGameStarted: action.isGameStarted,
                numberOfTries: 0,
                tiles: [...action.tiles],
                //gainNode: gainNodeTemp,
            };
        }

        case types.FLIP_TILE: {
            const {index, tile} = action;

            return {
                ...state,
                tiles: [
                    ...state.tiles.slice(0, index),
                    {
                        ...tile,
                        flipped: true
                    },
                    ...state.tiles.slice(index + 1)
                ],
            };
        }

        case types.TOGGLE_IS_WAITING: {
            return {
                ...state,
                isWaiting: action.isWaiting
            };
        }

        case types.MATCH_CHECK: {
            const {tiles} = state;

            if (action.flippedTiles[0].image === action.flippedTiles[1].image) {
                // Tiles are Equal
                let newTiles = tiles.map((tile) => {
                    if (tile.flipped === true && tile.matched === false) {
                        return {
                            ...tile,
                            matched: true
                        };
                    } else {
                        return tile;
                    }
                });

                const areAllTilesMatched = newTiles.reduce((sum, next) => sum && next.matched, true);

                return {
                    ...state,
                    tiles: newTiles,
                    isWaiting: false,
                    isGameFinished: areAllTilesMatched
                };

            } else {
                // Tiles are not equal
                let newTiles = tiles.map((tile) => {
                    if (tile.flipped === true && tile.matched === false) {
                        return {
                            ...tile,
                            flipped: false
                        }
                    } else {
                        return tile
                    }
                })

                return {
                    ...state,
                    tiles: newTiles,
                    isWaiting: false
                }
            }
        }

        case types.INCREMENT_TRIES: {
            return {
                ...state,
                numberOfTries: state.numberOfTries + 1
            }
        }

        default:
            return state;
    }
};