import React from 'react';
import PitchComponent from "./PitchComponent";

export default class PitchSortGame extends React.Component {
    render() {
        return (
            <div className="pitch-sort-game">
                <PitchComponent frequency={440}/>
            </div>
        )
    }
}