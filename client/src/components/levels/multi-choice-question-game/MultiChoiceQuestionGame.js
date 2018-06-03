import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Paper, Radio, RadioGroup, FormControlLabel} from 'material-ui';
import {startMultiChoiceGame, onAnswerClick} from "./actionCreators";
import {connect} from "react-redux";
import {compose} from 'recompose';
import {Link, withRouter} from "react-router-dom";
import {getNextLevelRoute, nextLevel, detectLevel} from "../../../helper_functions/levelDetector";
import * as text from "../../../constants/questionsAnswers";

export class MultiChoiceQuestionGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            dispatch, answers, isGameStarted, isGameFinished,
            match, authUser, onSetdbUser, updateLevels
        } = this.props;

        let nextLevelRoute = getNextLevelRoute(match.url);
        let nextLevelSubLevelNum = detectLevel(match.url);
        let textLevel = '';

        switch (nextLevelSubLevelNum[0]) {
            case 1: {
                textLevel = text.QUESTION_ONE.question.text;
                break;
            }
            case 2: {
                textLevel = text.QUESTION_TWO.question.text;
                break;
            }
            case 3: {
                textLevel = text.QUESTION_ONE.question.text;
                break;
            }
            case 4: {
                textLevel = text.QUESTION_FOUR.question.text;
                break;
            }
            case 5: {
                textLevel = text.QUESTION_ONE.question.text;
                break;
            }
        }

        return (
            <div className="multi-choice-game-container">
                <Paper className="multi-choice-game-paper">
                    <Typography type="display2">
                        Multi Choice Question Game
                    </Typography>
                    <br/>
                    <Typography type="headline">
                        {textLevel}
                    </Typography>
                    <br/>
                    <div className="multi-choice-game">
                        {
                            !isGameStarted ?
                                <Typography type="display1"
                                            onClick={() => {
                                                dispatch(startMultiChoiceGame(match.url));
                                            }}>
                                    Show answers
                                </Typography>
                                : (isGameStarted && !isGameFinished) ?
                                <RadioGroup name="answers-group"
                                            onChange={(event) => dispatch(onAnswerClick(event.target.value))}>
                                    {
                                        answers.map(({id, text, wasSelected, isCorrect}) => (
                                            <FormControlLabel value={id} label={text}
                                                              control={<Radio
                                                                  style={{color: !wasSelected ? 'default' : (isCorrect ? 'green' : 'red')}}/>}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                                :
                                <div>
                                    <Typography type="display1">
                                        Great! You nailed it!
                                    </Typography>
                                    <br/>
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
        wasSelected: PropTypes.bool,
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