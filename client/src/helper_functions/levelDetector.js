import * as routes from '../constants/routes';
import * as positions from '../constants/levelPositions';

export function detectLevel(url){
    let levelSubLevel = [];

    if (url.includes(routes.PITCH_SORT_GAME)){
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_SORT_GAME;
    }
    if (url.includes(routes.PITCH_MULTI_CHOICE_GAME)){
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_MULTI_CHOICE_GAME;
    }
    if (url.includes(routes.PITCH_MEMORY_GAME)){
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_MEMORY_GAME;
    }
    if (url.includes(routes.PITCH_EQUALIZER)){
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_EQUALIZER;
    }

    if (url.includes(routes.PITCH_SIMON_SAYS_GAME)) {
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_SIMON_SAYS_GAME;
    }

    return levelSubLevel;
}

