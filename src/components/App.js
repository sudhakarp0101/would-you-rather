import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NewQuestion from './NewQuestion'
import Dashboard from './Dashboard'
import LeaderBoard from './LeaderBoard'
import LoadingBar from 'react-redux-loading-bar'
import Poll from './Poll'
import PollResult from './PollResult'
import Login from './Login'
import Nav from './Nav'
import ErrorPage from './ErrorPage'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <Switch>
              {this.props.authedUser !== null && <Route path='/home' exact component={Dashboard} />}
              {this.props.authedUser === null && <Route path='/home' exact component={ErrorPage} />}

              {this.props.authedUser !== null && <Route path='/poll/:id' exact component={Poll} />}
              {this.props.authedUser === null && <Route path='/poll/:id' exact component={ErrorPage} />}

              {this.props.authedUser !== null && <Route path='/pollresult/:id' exact component={PollResult} />}
              {this.props.authedUser === null && <Route path='/pollresult/:id' exact component={ErrorPage} />}

              {this.props.authedUser !== null && <Route path='/new' exact component={NewQuestion} />}
              {this.props.authedUser === null && <Route path='/new' exact component={ErrorPage} />}

              {this.props.authedUser !== null && <Route path='/leaderboard' exact component={LeaderBoard} />}
              {this.props.authedUser === null && <Route path='/leaderboard' exact component={ErrorPage} />}
              <Route path='/' exact component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  authedUser = authedUser ? Object.values(authedUser)[0] : authedUser
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)