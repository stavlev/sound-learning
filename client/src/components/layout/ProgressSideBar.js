import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {Lock, LockOpen} from 'material-ui-icons';
import {Typography, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton} from 'material-ui';
import { Link, withRouter } from 'react-router-dom';
import * as levels from '../../constants/levels';

class ProgressSideBar extends React.Component {
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
                                                      component={Link} to={subLevel.routeTo}
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
            isEnabled: PropTypes.bool,
            routeTo: PropTypes.string,
        }))
    }))
}

export default withRouter(ProgressSideBar);