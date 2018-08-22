import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PitchComponent from './PitchComponent';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import {Typography, Paper} from 'material-ui';
import {startSortGame,
        onSortEnd,
        finishSortGame,
        updateLevels,
        onSetdbUser} from "./actionCreators";
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel, detectLevel} from "../../../helper_functions/levelDetector";
import {compose} from "recompose";
import * as text from "../../../constants/levelText";

const SortableItem = SortableElement(({audioCtx, value, color, oscillatorNode, isPlaying, id, dispatch}) =>
    <PitchComponent key={id}
                    frequency={value}
                    color={color}
                    id={id}
                    audioCtx={audioCtx}
                    oscillatorNode={oscillatorNode}
                    isPlaying={isPlaying}
                    dispatch={dispatch}
    />
);

const SortableList = SortableContainer(({audioCtx, dispatch, items}) => {
    return (
        <div className="pitch-component-list">
            {
                items.map(({frequency, color, isPlaying, oscillatorNode, id}, index) => (
                    <SortableItem key={id}
                                  index={index}
                                  value={frequency}
                                  id={id}
                                  color={color}
                                  sortIndex={frequency}
                                  audioCtx={audioCtx}
                                  oscillatorNode={oscillatorNode}
                                  isPlaying={isPlaying}
                                  dispatch={dispatch}
                    />
                ))
            }
        </div>
    );
});

export class PitchSortGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, audioCtx, frequencies, isGameStarted, isGameFinished,
               match, authUser} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);
        let nextLevelSubLevelNum = detectLevel(match.url);
        let textLevel = '';

        switch (nextLevelSubLevelNum[0]){
            case 1: {
                textLevel = text.PITCH_MEMORY_GAME;
                break;
            }
            case 2: {
                textLevel = text.LOUDNESS_MEMORY_GAME;
                break;
            }
            default: {
                textLevel = text.PITCH_MEMORY_GAME;
                break;
            }
        }

        return (
            <div className="pitch-sort-game-container">
                <Paper className="pitch-sort-game-paper">
                    <Typography type="display2">
                        Sort Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        {textLevel}
                    </Typography>
                    <Typography type="title" component="p">
                        Click each button to play/stop the sound.
                        Drag the button and drop it in the correct place.
                    </Typography>
                    <br/>
                    <Typography type="subheading" component="p">
                        Take as much time as you need :)
                    </Typography>
                    <div className="pitch-sort-game">
                        {
                            !isGameStarted ?
                                <Typography type="display1"
                                            onClick={() => {
                                                dispatch(startSortGame());
                                            }}>
                                    Start Game
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <SortableList items={frequencies}
                                              axis="x"
                                              audioCtx={audioCtx}
                                              dispatch={dispatch}
                                              onSortEnd={({oldIndex, newIndex}) => {
                                                  const newFrequencies = arrayMove(frequencies, oldIndex, newIndex);
                                                  dispatch(onSortEnd(newFrequencies));

                                                  let areFrequenciesSorted = isArraySorted(newFrequencies);
                                                  if (areFrequenciesSorted) {
                                                      dispatch(finishSortGame());
                                                  }
                                              }}
                                              />
                                :
                                <div>
                                    <Typography type="display1">
                                        Great! You nailed it!
                                    </Typography>
                                    <br />
                                    <Typography type="title"
                                                onClick={() => nextLevel(authUser, onSetdbUser, updateLevels, match)}
                                                component={Link}
                                                to={nextLevelRoute}
                                    >
                                        <b>Next Level</b>
                                    </Typography>
                                </div>
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

const isArraySorted = (arr) => {
    let sorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].frequency > arr[i + 1].frequency) {
            sorted = false;
            break;
        }
    }

    return sorted;
};

PitchSortGame.propTypes = {
    dispatch: PropTypes.func.isRequired,
    audioCtx: PropTypes.object,
    frequencies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        isPlaying: PropTypes.bool,
        color: PropTypes.string,
        frequency: PropTypes.number,
        oscillatorNode: PropTypes.object
    })),
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    authUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.sortGame.audioCtx,
        frequencies: state.sortGame.frequencies,
        isGameStarted: state.sortGame.isGameStarted,
        isGameFinished: state.sortGame.isGameFinished,
        authUser: state.sessionState.authUser
    };
};

export default compose(withRouter, connect(mapStateToProps))(PitchSortGame);