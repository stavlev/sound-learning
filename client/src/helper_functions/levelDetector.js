import * as routes from '../constants/routes';
import * as positions from '../constants/levelPositions';

export function detectLevel(url){
    let levelSubLevel = [];

    if (url.includes(routes.PITCH_GETTING_TO_KNOW)){
        levelSubLevel[0] = positions.PITCH_LEVELS;
        levelSubLevel[1] = positions.PITCH_GETTING_TO_KNOW;
    }
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

    if (url.includes(routes.LOUDNESS_GETTING_TO_KNOW)){
        levelSubLevel[0] = positions.LOUDNESS_LEVELS;
        levelSubLevel[1] = positions.LOUDNESS_GETTING_TO_KNOW;
    }
    if (url.includes(routes.LOUDNESS_SORT_GAME)){
        levelSubLevel[0] = positions.LOUDNESS_LEVELS;
        levelSubLevel[1] = positions.LOUDNESS_SORT_GAME;
    }
    if (url.includes(routes.LOUDNESS_MULTI_CHOICE_GAME)){
        levelSubLevel[0] = positions.LOUDNESS_LEVELS;
        levelSubLevel[1] = positions.LOUDNESS_MULTI_CHOICE_GAME;
    }
    if (url.includes(routes.LOUDNESS_MEMORY_GAME)){
        levelSubLevel[0] = positions.LOUDNESS_LEVELS;
        levelSubLevel[1] = positions.LOUDNESS_MEMORY_GAME;
    }
    if (url.includes(routes.LOUDNESS_EQUALIZER)){
        levelSubLevel[0] = positions.LOUDNESS_LEVELS;
        levelSubLevel[1] = positions.LOUDNESS_EQUALIZER;
    }

    if (url.includes(routes.CONVOLVER_GETTING_TO_KNOW)){
        levelSubLevel[0] = positions.CONVOLVER_LEVELS;
        levelSubLevel[1] = positions.CONVOLVER_GETTING_TO_KNOW;
    }
    if (url.includes(routes.CONVOLVER_SORT_GAME)){
        levelSubLevel[0] = positions.CONVOLVER_LEVELS;
        levelSubLevel[1] = positions.CONVOLVER_SORT_GAME;
    }
    if (url.includes(routes.CONVOLVER_MULTI_CHOICE_GAME)){
        levelSubLevel[0] = positions.CONVOLVER_LEVELS;
        levelSubLevel[1] = positions.CONVOLVER_MULTI_CHOICE_GAME;
    }
    if (url.includes(routes.CONVOLVER_MEMORY_GAME)){
        levelSubLevel[0] = positions.CONVOLVER_LEVELS;
        levelSubLevel[1] = positions.CONVOLVER_MEMORY_GAME;
    }
    if (url.includes(routes.CONVOLVER_EQUALIZER)){
        levelSubLevel[0] = positions.CONVOLVER_LEVELS;
        levelSubLevel[1] = positions.CONVOLVER_EQUALIZER;
    }

    if (url.includes(routes.WAVELENGTH_GETTING_TO_KNOW)){
        levelSubLevel[0] = positions.WAVE_LENGTH_LEVELS;
        levelSubLevel[1] = positions.WAVE_LENGTH_GETTING_TO_KNOW;
    }
    if (url.includes(routes.WAVELENGTH_SORT_GAME)){
        levelSubLevel[0] = positions.WAVE_LENGTH_LEVELS;
        levelSubLevel[1] = positions.WAVE_LENGTH_SORT_GAME;
    }
    if (url.includes(routes.WAVELENGTH_MULTI_CHOICE_GAME)){
        levelSubLevel[0] = positions.WAVE_LENGTH_LEVELS;
        levelSubLevel[1] = positions.WAVE_LENGTH_MULTI_CHOICE_GAME;
    }
    if (url.includes(routes.WAVELENGTH_MEMORY_GAME)){
        levelSubLevel[0] = positions.WAVE_LENGTH_LEVELS;
        levelSubLevel[1] = positions.WAVE_LENGTH_MEMORY_GAME;
    }
    if (url.includes(routes.WAVELENGTH_EQUALIZER)){
        levelSubLevel[0] = positions.WAVE_LENGTH_LEVELS;
        levelSubLevel[1] = positions.WAVE_LENGTH_EQUALIZER;
    }

    if (url.includes(routes.WAVE_SHAPE_GETTING_TO_KNOW)){
        levelSubLevel[0] = positions.WAVE_SHAPE_LEVELS;
        levelSubLevel[1] = positions.WAVE_SHAPE_GETTING_TO_KNOW;
    }
    if (url.includes(routes.WAVE_SHAPE_SORT_GAME)){
        levelSubLevel[0] = positions.WAVE_SHAPE_LEVELS;
        levelSubLevel[1] = positions.WAVE_SHAPE_SORT_GAME;
    }
    if (url.includes(routes.WAVE_SHAPE_MULTI_CHOICE_GAME)){
        levelSubLevel[0] = positions.WAVE_SHAPE_LEVELS;
        levelSubLevel[1] = positions.WAVE_SHAPE_MULTI_CHOICE_GAME;
    }
    if (url.includes(routes.WAVE_SHAPE_MEMORY_GAME)){
        levelSubLevel[0] = positions.WAVE_SHAPE_LEVELS;
        levelSubLevel[1] = positions.WAVE_SHAPE_MEMORY_GAME;
    }
    if (url.includes(routes.WAVE_SHAPE_EQUALIZER)){
        levelSubLevel[0] = positions.WAVE_SHAPE_LEVELS;
        levelSubLevel[1] = positions.WAVE_SHAPE_EQUALIZER;
    }



    return levelSubLevel;
}

export function detectRoute(level, sublevel){

    let route = '';

    if (level === positions.PITCH_LEVELS && sublevel === positions.PITCH_GETTING_TO_KNOW){
        route = routes.PITCH_GETTING_TO_KNOW;
    }
    if (level === positions.PITCH_LEVELS && sublevel === positions.PITCH_SORT_GAME){
        route = routes.PITCH_SORT_GAME;
    }
    if (level === positions.PITCH_LEVELS && sublevel === positions.PITCH_MULTI_CHOICE_GAME){
        route = routes.PITCH_MULTI_CHOICE_GAME;
    }
    if (level === positions.PITCH_LEVELS && sublevel === positions.PITCH_MEMORY_GAME){
        route = routes.PITCH_MEMORY_GAME;
    }
    if (level === positions.PITCH_LEVELS && sublevel === positions.PITCH_EQUALIZER){
        route = routes.PITCH_EQUALIZER;
    }

    if (level === positions.LOUDNESS_LEVELS && sublevel === positions.LOUDNESS_GETTING_TO_KNOW){
        route = routes.LOUDNESS_GETTING_TO_KNOW;
    }
    if (level === positions.LOUDNESS_LEVELS && sublevel === positions.LOUDNESS_SORT_GAME){
        route = routes.LOUDNESS_SORT_GAME;
    }
    if (level === positions.LOUDNESS_LEVELS && sublevel === positions.LOUDNESS_MULTI_CHOICE_GAME){
        route = routes.LOUDNESS_MULTI_CHOICE_GAME;
    }
    if (level === positions.LOUDNESS_LEVELS && sublevel === positions.LOUDNESS_MEMORY_GAME){
        route = routes.LOUDNESS_MEMORY_GAME;
    }
    if (level === positions.LOUDNESS_LEVELS && sublevel === positions.LOUDNESS_EQUALIZER){
        route = routes.LOUDNESS_EQUALIZER;
    }

    if (level === positions.CONVOLVER_LEVELS && sublevel === positions.CONVOLVER_GETTING_TO_KNOW){
        route = routes.CONVOLVER_GETTING_TO_KNOW;
    }
    if (level === positions.CONVOLVER_LEVELS && sublevel === positions.CONVOLVER_SORT_GAME){
        route = routes.CONVOLVER_SORT_GAME;
    }
    if (level === positions.CONVOLVER_LEVELS && sublevel === positions.CONVOLVER_MULTI_CHOICE_GAME){
        route = routes.CONVOLVER_MULTI_CHOICE_GAME;
    }
    if (level === positions.CONVOLVER_LEVELS && sublevel === positions.CONVOLVER_MEMORY_GAME){
        route = routes.CONVOLVER_MEMORY_GAME;
    }
    if (level === positions.CONVOLVER_LEVELS && sublevel === positions.CONVOLVER_EQUALIZER){
        route = routes.CONVOLVER_EQUALIZER;
    }

    if (level === positions.WAVE_LENGTH_LEVELS && sublevel === positions.WAVE_LENGTH_GETTING_TO_KNOW){
        route = routes.WAVELENGTH_GETTING_TO_KNOW;
    }
    if (level === positions.WAVE_LENGTH_LEVELS && sublevel === positions.WAVE_LENGTH_SORT_GAME){
        route = routes.WAVELENGTH_SORT_GAME;
    }
    if (level === positions.WAVE_LENGTH_LEVELS && sublevel === positions.WAVE_LENGTH_MULTI_CHOICE_GAME){
        route = routes.WAVELENGTH_MULTI_CHOICE_GAME;
    }
    if (level === positions.WAVE_LENGTH_LEVELS && sublevel === positions.WAVE_LENGTH_MEMORY_GAME){
        route = routes.WAVELENGTH_MEMORY_GAME;
    }
    if (level === positions.WAVE_LENGTH_LEVELS && sublevel === positions.WAVE_LENGTH_EQUALIZER){
        route = routes.WAVELENGTH_EQUALIZER;
    }

    if (level === positions.WAVE_SHAPE_LEVELS && sublevel === positions.WAVE_SHAPE_GETTING_TO_KNOW){
        route = routes.WAVE_SHAPE_GETTING_TO_KNOW;
    }
    if (level === positions.WAVE_SHAPE_LEVELS && sublevel === positions.WAVE_SHAPE_SORT_GAME){
        route = routes.WAVE_SHAPE_SORT_GAME;
    }
    if (level === positions.WAVE_SHAPE_LEVELS && sublevel === positions.WAVE_SHAPE_MULTI_CHOICE_GAME){
        route = routes.WAVE_SHAPE_MULTI_CHOICE_GAME;
    }
    if (level === positions.WAVE_SHAPE_LEVELS && sublevel === positions.WAVE_SHAPE_MEMORY_GAME){
        route = routes.WAVE_SHAPE_MEMORY_GAME;
    }
    if (level === positions.WAVE_SHAPE_LEVELS && sublevel === positions.WAVE_SHAPE_EQUALIZER){
        route = routes.WAVE_SHAPE_EQUALIZER;
    }

    return route;
}

export function getNextLevelRoute(url){
    let route = '';
    let levelSublevel = detectLevel(url);

    if (levelSublevel[1] === 5){
        route = detectRoute(levelSublevel[0] + 1, 1);
    }
    else{
        route = detectRoute(levelSublevel[0], levelSublevel[1] + 1);
    }

    return route;
}

