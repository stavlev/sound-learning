import React from 'react';
import PropTypes from 'prop-types';
import * as Nexus from 'nexusui';

export default class Knob extends React.Component {
    componentDidMount() {
        const {onChange, min, max, step, value, size, interaction, mode} = this.props;

        const idString = "#dial " + this.props.knobId;
        this.dial = new Nexus.Dial(idString,{
            min: min,
            max: max,
            step: step,
            mode: mode,
            interaction: interaction,
            value: value,
            size: size
        });

        this.dial.on('change',function(v) {
            onChange(v);
        });
    }

    componentWillUnmount() {
        this.dial.destroy();
    }

    render() {

        return (
            <div id={"dial " + this.props.knobId} />
        );
    }
}

Knob.defaultProps = {
    size: [75, 75],
    interaction: 'radial',
    mode: 'relative'
};

Knob.propTypes = {
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    knobId: PropTypes.string.isRequired,
    size: PropTypes.arrayOf(PropTypes.number),
    interaction: PropTypes.string,
    mode: PropTypes.string
};