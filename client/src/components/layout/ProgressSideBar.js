import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {Lock, LockOpen} from 'material-ui-icons';
import {Typography, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton} from 'material-ui';

const levels = [
    {
        key: 1,
        isEnabled: true,
        header: "Level 1 - Discovering Pitch",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: true,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: true,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
            },
        ]
    },
    {
        key: 2,
        isEnabled: false,
        header: "Level 2 - Discovering Loudness",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: false,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: false,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
            },
        ]
    },
    {
        key: 3,
        isEnabled: false,
        header: "Level 3 - Discovering Timbre",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: false,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: false,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
            },
        ]
    },
    {
        key: 4,
        isEnabled: false,
        header: "Level 4 - Discovering Wavelength",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: false,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: false,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
            },
        ]
    },
    {
        key: 5,
        isEnabled: false,
        header: "Level 5 - Discovering Wave Shape",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: false,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: false,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
            },
        ]
    }
];

export default class ProgressSideBar extends React.Component {
    render() {
        return (
            <div className="progress-side-bar-container">
                {
                    this.props.levels.map(level =>
                        <ExpansionPanel key={level.key}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className="expansion-panel-summary">
                                <Typography className="heading">{level.header}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className="expansion-panel-details">
                                <div className="list-of-sub-levels-container">
                                    <List>
                                    {
                                        level.subLevels.map(subLevel =>
                                            <ListItem key={subLevel.key}
                                                      className="list-item"
                                                      button
                                                      disabled={!subLevel.isEnabled}>
                                                <ListItemText primary={subLevel.header} />
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                    {
                                                        subLevel.isEnabled ?
                                                            <LockOpen /> :
                                                            <Lock />
                                                    }
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    }
                                    </List>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )
                }
            </div>
        );
    }
}

ProgressSideBar.defaultProps = {
    levels: levels
}

ProgressSideBar.propTypes = {
    levels: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number,
        header: PropTypes.string,
        isEnabled: PropTypes.bool,
        subLevels: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.number,
            header: PropTypes.string,
            isEnabled: PropTypes.bool
        }))
    }))
}