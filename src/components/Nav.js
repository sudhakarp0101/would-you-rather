import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleSetAuthedUser } from '../actions/authedUser'

function Nav(props) {
    console.log("-------In Nav Bar " + props.authedUser)

    return (
        <div className="center">
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink exact to='/home' activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    {props.authedUser === null ?
                        (<li>
                            <NavLink to='/' activeClassName='active'>
                                Login
                        </NavLink>
                        </li>) :
                        (<li> Hello, {props.users[props.authedUser].name} &nbsp;&nbsp;&nbsp;
                                    <img src={props.users[props.authedUser].avatarURL}
                                alt={props.users[props.authedUser].name} className='avatar1' />
                            <NavLink to='/'
                                onClick={() => {
                                    props.dispatch(handleSetAuthedUser(null))
                                }}
                                activeClassName='active'>
                                &nbsp;&nbsp;&nbsp;Logout
                            </NavLink>
                        </li>)}
                </ul>
                <hr />
            </nav>
        </div>
    )
}
function mapStateToProps({ authedUser, users }) {
    authedUser = authedUser ? Object.values(authedUser)[0] : authedUser
    return {
        authedUser,
        users
    }
}
export default connect(mapStateToProps)(Nav)