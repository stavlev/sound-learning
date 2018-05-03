import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Paper, Radio, RadioGroup, FormControlLabel} from 'material-ui';
import {startMultiChoiceGame, onAnswerClick} from "./actionCreators";
import {connect} from "react-redux";

export class MultiChoiceQuestionGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, /*audioCtx, */question, answers, isGameStarted, isGameFinished} = this.props;

        return (
            <div className="multi-choice-game-container">
                <Paper className="multi-choice-game-paper">
                    <Typography type="display2">
                        Game 2
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
                                <Typography type="display1">
                                    Great! You nailed it :)
                                </Typography>
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
};

const mapStateToProps = (state) => {
    return {
        /*audioCtx: state.multiChoiceGame.audioCtx,*/
        question: state.multiChoiceGame.question,
        answers: state.multiChoiceGame.answers,
        isGameStarted: state.multiChoiceGame.isGameStarted,
        isGameFinished: state.multiChoiceGame.isGameFinished
    };
};

export default connect(mapStateToProps)(MultiChoiceQuestionGame);