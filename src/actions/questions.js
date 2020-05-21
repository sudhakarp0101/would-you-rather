import { saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
export function handleAddQuestion(optionOne, optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        console.log("add handle", Object.values(authedUser)[0])
        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
            optionTwoText: optionTwo,
            author: Object.values(authedUser)[0]
        }).then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addAnswerToQuestion(answer) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        answer
    }
}
export function handleAddAnswerToQuestion(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addAnswerToQuestion({
            qid,
            answer,
            authedUser
        }))
    }
}
