import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }
    handleChange = (event) => {
        event.preventDefault();
        var index = event.target.selectedIndex;
        var optionElement = event.target.childNodes[index]
        var id = optionElement.getAttribute('name');
        this.props.dispatch(handleSetAuthedUser(id))

        console.log(id)
        this.setState({ value: event.target.value });
        this.props.history.push(`/home`)
    }
    render() {
        const { users } = this.props

        const allusers = Object.keys(users).map((key) =>
            <option key={key} name={key} >
                {users[key].name}
            </option>)
        //console.log(allusers)
        return (
            <div>
                <div className="question-title">Welcome to the Would You Rather App!</div>
                <div className="login">
                    <img
                        src={'/reactredux.png'}
                        alt={`Avatar of React Redux`}
                        className='avatar2' />
                    <div className='question-info'>
                        <p>Sign in Here</p>
                        <select name="customSearch" value={this.state.value} className="custom-search-select"
                            onChange={(e) => { this.handleChange(e) }} >
                            <option>Select User</option>
                            {allusers}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users }) {
    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login))