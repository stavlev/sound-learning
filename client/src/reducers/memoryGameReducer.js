import * as types from "../components/levels/memory-game/actionTypes";

const INITIAL_STATE = {
    tiles: [],
    isWaiting: false,
    numberOfTries: 0,
    audioCtx: new (window.AudioContext || window.webkitAudioContext)()
}


export default function memoryGameReducer (state=INITIAL_STATE, action) {
    switch(action.type) {
        case types.START_GAME:

            action.tiles.forEach(function(tile,index) {
                var oscillator = state.audioCtx.createOscillator();

                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(tile.multiplier * 100 + 40, state.audioCtx.currentTime); // value in hertz
                oscillator.start();

                tile.node = oscillator;
            })

            return {
                ...state,
                isWaiting: false,
                numberOfTries: 0,
                tiles: [...action.tiles]
            };

        case types.FLIP_TILE:
            const {index, tile} = action;

            return {
                ...state,
                tiles: [
                    ...state.tiles.slice(0, index),
                    {
                        ...tile,
                        flipped: true
                    },
                    ...state.tiles.slice(index+1)
                ],
            };

        case types.TOGGLE_IS_WAITING:
            return {
                ...state,
                isWaiting: action.isWaiting
            };

        case types.MATCH_CHECK:
            const {tiles} = state;

            if (action.flippedTiles[0].image === action.flippedTiles[1].image) {
                // Tiles are Equal
                let newTiles = tiles.map((tile)=>{
                    if (tile.flipped === true && tile.matched === false) {
                        return {
                            ...tile,
                            matched: true
                        };
                    } else {
                        return tile;
                    }
                });

                return {
                    ...state,
                    tiles: newTiles,
                    isWaiting: false
                };

            } else {
                // Tiles are not equal
                let newTiles = tiles.map((tile)=>{
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

        case types.INCREMENT_TRIES:
            return {
                ...state,
                numberOfTries: state.numberOfTries+1
            }


        default:
            return state;
    }
};