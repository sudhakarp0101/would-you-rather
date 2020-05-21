import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {

    render() {
        const users = Object.values(this.props.users);
        if (users === null) {
            return <p>Users doesn't exist</p>
        }
        else
            return (
                <div>
                    {users.map((user) => (
                        <div key={user.id}>
                            <div className="question">
                                <img
                                    src={user.avatarURL}
                                    alt={`Avatar of ${user.name}`}
                                    className='avatar'
                                />
                                <div className='question-info'>
                                    <div>{user.name}</div>
                                    <div>
                                        <div >
                                            <p>Answered Questions {Object.keys(user.answers).length}</p>
                                        </div>
                                        <div >
                                            <p>Created Questions {user.questions.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='question-info'>
                                    <div>
                                        <div >
                                            Score
                                        </div>
                                        <div >
                                            <p className='center'> {Object.keys(user.answers).length + user.questions.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
    }
}


function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)