import React from 'react';
import PitchComponent from "./PitchComponent";
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
    <li>
        <PitchComponent frequency={value}/>
    </li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul className="pitch-component-list">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
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
            <div className="pitch-sort-game">
                <SortableList items={this.state.frequencies} onSortEnd={this.onSortEnd}/>
            </div>
        )
    }
}