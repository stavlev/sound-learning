import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {Lock, LockOpen} from 'material-ui-icons';
import { compose } from 'recompose';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Typography, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton} from 'material-ui';
import { Link, withRouter } from 'react-router-dom';
import {LEVELS as levels} from "../../constants/levels";
import * as routes from "../../constants/routes";
import * as actions from "./actionCreators";

class ProgressSideBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {levels, resetLevels} = this.props;

        return (
            <div className="progress-side-bar-container">
                {
                    levels.map(level =>
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
                                                      onClick={() => {resetLevels()}}
                                                      component={Link} to={subLevel.isEnabled ? subLevel.routeTo : routes.HOME}
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

function mapStateToProps(state) {
    return {
        authUser: state.sessionState.authUser,
        dbUser: state.sessionState.dbUser,
        levels: state.progressSideBar.levels,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetLevels: actions.resetLevels,
    }, dispatch);
}

export default compose(withRouter,
    connect(mapStateToProps,mapDispatchToProps))
    (ProgressSideBar);

//export default withRouter(ProgressSideBar);