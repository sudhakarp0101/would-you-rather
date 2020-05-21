import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/users'
class Poll extends Component {
    constructor() {
        super();
        this.state = {
            option: ''
        };
        this.onChangeValue = this.onChangeValue.bind(this);
        this.toPoll = this.toPoll.bind(this);
    }

    onChangeValue(event) {
        console.log(event.target.value);
        this.setState({
            option: event.target.value
        })
    }
    toPoll = (e, id) => {
        e.preventDefault();
        const answer = this.state.option
        const { dispatch } = this.props
        if (this.state.option !== '') {
            dispatch(handleAddQuestionAnswer(id, answer))
            console.log("************", answer)
            this.props.history.push(`/pollresult/${id}`)
        }
        else
            alert('Poll Your Vote')
    }
    render() {
        const { question, author } = this.props

        if (question === null) {
            return <p>Question doesn't exist</p>
        }
        const {
            optionOne, optionTwo, id
        } = question
        const { name, avatarURL } = author

        return (
            <div>
                <div className="question-title">{name} asks:</div>
                <div className="question">
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <div>Would You Rather...</div>
                        <div>
                            <div onChange={this.onChangeValue}>
                                <input type="radio" value="optionOne" name="answer" /> <span>{optionOne.text}</span><br />
                                <input type="radio" value="optionTwo" name="answer" /> <span>{optionTwo.text}</span>
                            </div>
                            <button className='replying-to' onClick={(e) => this.toPoll(e, id)}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    console.log("mapstate id ", id)
    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        question: question ? question : null,
        author
    }

}

export default connect(mapStateToProps)(Poll)