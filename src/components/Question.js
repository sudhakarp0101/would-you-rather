import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Question extends Component {

    setRedirect = (e, id, polled) => {
        e.preventDefault()
        if (!polled)
            this.props.history.push(`/poll/${id}`)
        else
            this.props.history.push(`/pollresult/${id}`)
    }

    render() {
        const { question, author, polled } = this.props
        if (question === null) {
            return <p>Question doesn't exist</p>
        }
        const {
            optionOne, id
        } = question
        const { name, avatarURL } = author

        return (
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

                            <button className='replying-to' onClick={(e) => this.setRedirect(e, id, polled)}>
                                View Poll
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users, questions }, { id, polled }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        question: question ? question : null,
        author,
        polled
    }

}

export default withRouter(connect(mapStateToProps)(Question))