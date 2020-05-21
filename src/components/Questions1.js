import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/_DATA'
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    handleLike = (e) => {
        e.preventDefault();
        const { dispatch, question, authedUser } = this.props
        // dispatch(handleToggleQuestion({
        //     id: question.id,
        //     hasLiked: question.hasLiked,
        //     authedUser
        // }))
    }
    toParent = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/question/${id}`)
    }
    render() {
        const { question, author, authedUser, answered } = this.props
        { console.log("************", question) }
        if (question === null) {
            return <p>Question doesn't exist</p>
        }
        const {
            optionOne, optionTwo, id
        } = question
        const { name, avatarURL } = author

        if (authedUser !== null && answered === false
            && optionOne.votes.find(au => au === authedUser) === undefined
            && optionTwo.votes.find(au => au === authedUser) === undefined) {
            return (
                <Link to={`/question/${id}`} className='question'>
                    <div>

                        <div className="question-title">{name}</div>
                        <div className="question">
                            <img
                                src={avatarURL}
                                alt={`Avatar of ${name}`}
                                className='avatar'
                            />
                            <div className='question-info'>
                                <div>Would You Rather</div>
                                <div>
                                    <p>..{optionOne.text}..</p>
                                    <button className='replying-to' onClick={(e) => this.toParent(e, id)}>
                                        View Poll
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        }
        else if (authedUser !== null && answered === true
            && (optionOne.votes.find(au => au === authedUser) ||
                optionTwo.votes.find(au => au === authedUser))) {
            return (
                // <Link to={`/question/${id}`} className='question'>
                <div>

                    <div className="question-title">{name}</div>
                    <div className="question">
                        <img
                            src={avatarURL}
                            alt={`Avatar of ${name}`}
                            className='avatar'
                        />
                        <div className='question-info'>
                            <div>Would You Rather</div>
                            <div>
                                <p>..{optionOne.text}..</p>
                                <button className='replying-to' onClick={(e) => this.toParent(e, id)}>
                                    View Poll
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div></div>;
        }
    }
}


function mapStateToProps({ authedUser, users, questions }, { id, answered }) {
    const question = questions[id]
    const author = users[question.author]
    // const parentQuestion = question ? question[question.replyingTo] : null

    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        question: question ? question : null,
        author,
        answered
    }

}

export default connect(mapStateToProps)(Question)