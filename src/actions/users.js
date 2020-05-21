import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { handleAddAnswerToQuestion } from '../actions/questions'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}
function addAnswerToUser(answer) {
    return {
        type: ADD_ANSWER_TO_USER,
        answer
    }
}
export function handleAddAnswerToUser(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addAnswerToUser({
            qid,
            answer,
            authedUser
        }))
    }
}
export function handleAddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        saveQuestionAnswer({ authedUser: Object.values(authedUser)[0], qid, answer })
            .then(() => {
                dispatch(handleAddAnswerToQuestion(Object.values(authedUser)[0], qid, answer));
                dispatch(handleAddAnswerToUser(Object.values(authedUser)[0], qid, answer));
            })
            .catch(e => {
                console.warn('Error in handleSaveQuestionAnswer:', e);
            }).then(() => dispatch(hideLoading()))
    }
}