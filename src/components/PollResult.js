import React, { Component } from 'react'
import { connect } from 'react-redux'
import Progressbar from './Progressbar'

class PollResult extends Component {

    render() {
        const { authedUser, question, author } = this.props
        const soptionOne = question.optionOne.votes.includes(authedUser);
        const soptionTwo = question.optionTwo.votes.includes(authedUser);

        let selectedOne = '', selectedTwo = '';
        if (soptionOne)
            selectedOne = ' Your Vote'
        if (soptionTwo)
            selectedTwo = ' Your Vote'
        console.log("************", question)
        if (question === null) {
            return <p>Question doesn't exist</p>
        }
        const {
            optionOne, optionTwo
        } = question
        const { name, avatarURL } = author
        const totalVotes = optionOne.votes.length + optionTwo.votes.length
        const oneVotes = optionOne.votes.length
        const twoVotes = optionTwo.votes.length
        const onePercentage = Math.round((oneVotes / totalVotes) * 10000) / 100
        const twoPercentage = Math.round((twoVotes / totalVotes) * 10000) / 100

        return (
            <div>

                <div className="question-title">Asked by {name} </div>
                <div className="question">
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <div>Results:</div>
                        <div>
                            <div >
                                <p>Would you rather {optionOne.text}<b>{selectedOne}</b></p>
                                <Progressbar bgcolor={"#6a1b9a"} completed={onePercentage} />
                                <p>{oneVotes + " out of " + totalVotes + " votes"}</p>
                            </div>
                            <div >
                                <p>Would you rather {optionTwo.text}<b>{selectedTwo}</b></p>
                                <Progressbar bgcolor={"#6a1b9a"} completed={twoPercentage} />
                                <p>{twoVotes + " out of " + totalVotes + " votes"}</p>
                            </div>
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
    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        question: question ? question : null,
        author
    }

}

export default connect(mapStateToProps)(PollResult)