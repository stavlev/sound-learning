import React from 'react';
import PitchComponent from "./PitchComponent";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {Typography} from "material-ui";

const SortableItem = SortableElement(({value}) =>
    <PitchComponent frequency={value}/>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <div className="pitch-component-list">
            {
                items.map((index, value) => (
                    <SortableItem key={index} index={value} value={index} sortIndex={index}/>
                ))
            }
        </div>
    );
});

export default class PitchSortGame extends React.Component {
    state = {
        frequencies: [440, 540, 640, 740, 840],
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            frequencies: arrayMove(this.state.frequencies, oldIndex, newIndex),
        });
    };

    render() {
        return (
            <div>
                <Typography type="title" gutterBottom>
                    Sort the given sounds according to their frequency
                </Typography>
                <Typography type="subheading" gutterBottom>
                    Click each button to play/stop the sound.
                    Take as much time as you need to distinguish the different frequencies :)
                </Typography>
                <div className="pitch-sort-game">
                    <SortableList items={this.state.frequencies} onSortEnd={this.onSortEnd}
                                  axis="x" lock-axis="x"/>
                </div>
            </div>
        )
    }
}