import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PitchComponent from './PitchComponent';
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import {Typography, Paper} from 'material-ui';
import {startGame,
        onSortEnd,
        finishSortGame} from "./actionCreators";

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
        const {dispatch, audioCtx, frequencies, isGameStarted, isGameFinished} = this.props;

        return (
            <div className="pitch-sort-game-container">
                <Paper className="pitch-sort-game-paper">
                    <Typography type="display2">
                        Game 1
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        Sort the given sounds according to their frequency
                    </Typography>
                    <Typography type="title" component="p">
                        Click each button to play/stop the sound.
                        Drag the button and drop it in the correct place.
                    </Typography>
                    <br/>
                    <Typography type="subheading" component="p">
                        Take as much time as you need to distinguish the different frequencies :)
                    </Typography>
                    <div className="pitch-sort-game">
                        {
                            !isGameStarted ?
                                <Typography type="display3"
                                            onClick={() => {
                                                dispatch(startGame());
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
                                <Typography type="display3">
                                    Great! You nailed it :)
                                </Typography>
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

//
// PitchSortGame.defaultProps = {
//     audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
//     frequencies: shuffle([
//         {id: uuidV4(), frequency: 240, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 340, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 440, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 540, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 640, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 740, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
//         {id: uuidV4(), frequency: 840, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}}
//         ]),
//     isGameStarted: false,
//     isGameFinished: false
// };

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
    isGameFinished: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        audioCtx: state.sortGame.audioCtx,
        frequencies: state.sortGame.frequencies,
        isGameStarted: state.sortGame.isGameStarted,
        isGameFinished: state.sortGame.isGameFinished
    };
};

export default connect(mapStateToProps)(PitchSortGame);