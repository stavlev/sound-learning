import React from 'react';
import PitchComponent from './PitchComponent';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Typography, Paper} from 'material-ui';
import shuffle from 'shuffle-array';

const randomMaterialColor = require('random-material-color');

const SortableItem = SortableElement(({value, color}) =>
    <PitchComponent frequency={value} color={color} />
);

const SortableList = SortableContainer(({items}) => {
    return (
        <div className="pitch-component-list">
            {
                items.map(({frequency, color}, index) => (
                    <SortableItem key={frequency} index={index} value={frequency} color={color} sortIndex={frequency}/>
                ))
            }
        </div>
    );
});

export default class PitchSortGame extends React.Component {
    state = {
        frequencies: shuffle([{frequency: 340, color: randomMaterialColor.getColor()},
                              {frequency: 440, color: randomMaterialColor.getColor()},
                              {frequency: 540, color: randomMaterialColor.getColor()},
                              {frequency: 640, color: randomMaterialColor.getColor()},
                              {frequency: 740, color: randomMaterialColor.getColor()},
                              {frequency: 840, color: randomMaterialColor.getColor()}]),
        isGameStarted: false,
        isGameFinished: false,
    };

    startGame = () => {
        this.setState({
            isGameStarted: true,
        });
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            frequencies: arrayMove(this.state.frequencies, oldIndex, newIndex),
        }, () => this.calculateGameResult());
    };

    calculateGameResult = () => {
        let areFrequenciesSorted = this.isArraySorted(this.state.frequencies);

        if (areFrequenciesSorted) {
            this.setState({
                isGameFinished: true,
            });
        }
    };

    isArraySorted = (arr) => {
        let sorted = true;

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i].frequency > arr[i+1].frequency) {
                sorted = false;
                break;
            }
        }

        return sorted;
    };

    render() {
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
                            !this.state.isGameStarted ?
                                <Typography type="display3" onClick={() => this.startGame()}>
                                    Start Game
                                </Typography>
                            : (this.state.isGameStarted && !this.state.isGameFinished) ?
                                <SortableList items={this.state.frequencies} onSortEnd={this.onSortEnd}
                                              axis="x" />
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