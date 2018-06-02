import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Paper, Radio, RadioGroup, FormControlLabel} from 'material-ui';
import {startMultiChoiceGame, onAnswerClick} from "./actionCreators";
import {connect} from "react-redux";
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel} from "../../../helper_functions/levelDetector";

export class MultiChoiceQuestionGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, /*audioCtx,*/ question, answers, isGameStarted, isGameFinished,
               match, authUser, onSetdbUser, updateLevels} = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);

        return (
            <div className="multi-choice-game-container">
                <Paper className="multi-choice-game-paper">
                    <Typography type="display2">
                        Multi Choice Question Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        {question.text}
                    </Typography>
                    <br/>
                    <div className="multi-choice-game">
                        {
                            !isGameStarted ?
                                <Typography type="display1"
                                            onClick={() => {
                                                dispatch(startMultiChoiceGame());
                                            }}>
                                    Show answers
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <RadioGroup name="answers-group"
                                            onChange={(event) => dispatch(onAnswerClick(event.target.value))}>
                                    {
                                        answers.map(({id, text}) => (
                                            <FormControlLabel value={id} control={<Radio />} label={text} />
                                        ))
                                    }
                                </RadioGroup>
                                :
                                <div>
                                    <Typography type="display1">
                                        Great! You nailed it!
                                    </Typography>
                                    <br />
                                    <Typography type="title"
                                                onClick={() => nextLevel(authUser, onSetdbUser, updateLevels, match)}
                                                component={Link}
                                                to={nextLevelRoute}

                                    >
                                        <b>Next Level</b>
                                    </Typography>
                                </div>

                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

MultiChoiceQuestionGame.propTypes = {
    dispatch: PropTypes.func.isRequired,
    question: PropTypes.shape({
        text: PropTypes.string,
        // TODO: Add a property that will hold a sound to play (on which the question is about)
    }),
    answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        isCorrect: PropTypes.bool,
    })),
    isGameStarted: PropTypes.bool,
    isGameFinished: PropTypes.bool,
    authUser: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        /*audioCtx: state.multiChoiceGame.audioCtx,*/
        question: state.multiChoiceGame.question,
        answers: state.multiChoiceGame.answers,
        isGameStarted: state.multiChoiceGame.isGameStarted,
        isGameFinished: state.multiChoiceGame.isGameFinished,
        authUser: state.sessionState.authUser
    };
};

export default compose(withRouter, connect(mapStateToProps))(MultiChoiceQuestionGame);