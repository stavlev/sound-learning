import React from 'react';
import PropTypes from 'prop-types';
import * as Nexus from 'nexusui';

export default class Slider extends React.Component {
    componentDidMount() {
        const {onChange, min, max, step, value, size, mode} = this.props;

        this.slider = new Nexus.Slider('#slider',{
            min: min,
            max: max,
            step: step,
            mode: mode,
            value: value,
            size: size
        });

        this.slider.on('change',function(v) {
            onChange(v);
        });
    }

    componentWillUnmount() {
        this.slider.destroy();
    }

    render() {
        return (
            <div id="slider" />
        );
    }
}

Slider.defaultProps = {
    size: [120,20],
    mode: 'relative'
};

Slider.propTypes = {
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    size: PropTypes.arrayOf(PropTypes.number),
    mode: PropTypes.string
};