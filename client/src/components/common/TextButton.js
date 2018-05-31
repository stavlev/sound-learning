import React from 'react';
import PropTypes from 'prop-types';
import * as Nexus from 'nexusui';

export default class TextButton extends React.Component {
    componentDidMount() {
        const {onChange, state, text, alternateText, size} = this.props;

        this.textButton = new Nexus.TextButton('#text-button',{
            state: state,
            text: text,
            alternateText: alternateText,
            size: size
        });

        this.textButton.on('change',function(v) {
            onChange(v);
        });
    }

    componentWillUnmount() {
        this.textButton.destroy();
    }

    render() {
        return (
            <div id="text-button" />
        );
    }
}

TextButton.defaultProps = {
    size: [80,40],
    state: false,
    alternateText: false
};

TextButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    alternateText: PropTypes.string,
    state: PropTypes.bool,
    size: PropTypes.arrayOf(PropTypes.number)
};