import * as types from "./actionTypes";
import sleep from '../../../utils/sleep';
import getRandomId from '../../../utils/get-random-id';
import createAction from '../../../utils/create-action';
import { SONG_DELAY_TIME, REDUCED_DELAY_TIME, } from '../../../constants/simonSaysParams';

const start = createAction(types.START_GAME);
const next = createAction(types.NEXT_LEVEL);

const startGame = payload => start({ next: getRandomId() });
const nextLevel = payload => next({ next: getRandomId() });

const guessColor = createAction(types.GUESS_COLOR);
const startSong = createAction(types.START_SONG);
const finishSong = createAction(types.FINISH_SONG);
const lightenPad = createAction(types.LIGHTEN_PAD);
const lightenOffPad = createAction(types.LIGHTEN_OFF_PAD);

const sing = (payload) => async (dispatch, getState) => {
    dispatch(startSong());
    const { match } = getState();
    for (let i = 0; i <= match.all.length - 1; i++) {
        const id = match.all[i];
        dispatch(lightenPad({ id }));
        await sleep(SONG_DELAY_TIME);
        dispatch(lightenOffPad());
        await sleep(SONG_DELAY_TIME);
    }

    dispatch(finishSong());
}

const guess = ({ succeeded, id }) => async (dispatch, getState) => {
    dispatch(guessColor({ succeeded, id }));
    dispatch(startSong());
    dispatch(lightenPad({ id }));
    await sleep(REDUCED_DELAY_TIME);
    dispatch(lightenOffPad());
    await sleep(REDUCED_DELAY_TIME);
    dispatch(finishSong());

    const { match } = getState();
    const { all, guessed } = match;
    const done = (all.length === guessed.length) && succeeded;

    return new Promise(r => r({ done }));
}

export const actionCreators = {
    startSong,
    startGame,
    finishSong,
    lightenPad,
    lightenOffPad,
    nextLevel,
    guessColor,
    guess,
    sing,
}