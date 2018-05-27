import React, { Component } from 'react';
import { Flex, Box } from 'reflexbox';
import { connect } from 'react-redux';

import Header from './HeaderComponent';

export class SimonSaysShell extends Component {
    render() {
        const { highscore, style, children } = this.props;
        return (
            <Flex align="center" justify="center" style={{ width: '100%', height: '100%', ...style }} >
                <Header p={2} justify="space-between" flex>
                    <Box>
                        HIGH SCORE: {highscore} <br />
                    </Box>
                </Header>
                <Box>
                    {children}
                </Box>
            </Flex>
        );
    }
}

export default connect(
    ({ game }) => game,
)(SimonSaysShell);