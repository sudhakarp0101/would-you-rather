import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = { tabIndex: 0 };
    }
    render() {
        const { authedUser, questionIds, questions } = this.props
        const unanswered = questionIds.filter((id) => (
            authedUser !== null
            && questions[id].optionOne.votes.find(au => au === authedUser) === undefined
            && questions[id].optionTwo.votes.find(au => au === authedUser) === undefined))

        const answered = questionIds.filter((id) => (
            authedUser !== null
            && (questions[id].optionOne.votes.find(au => au === authedUser) ||
                questions[id].optionTwo.votes.find(au => au === authedUser))))
        return (
            <div >
                {console.log(unanswered)}
                <Tabs className="question-type" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                    <TabList>
                        <Tab>Unanswered Questions</Tab>
                        <Tab>Answered Questions</Tab>
                    </TabList>
                    <TabPanel>
                        <ul className="dishboard-list">
                            {unanswered.map((id) => (
                                <li key={id}>
                                    <Question id={id} polled={false} />
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                    <TabPanel>
                        <ul className="dishboard-list">
                            {answered.map((id) => (
                                <li key={id}>
                                    <Question id={id} polled={true} />
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, questions }) {
    return {
        authedUser: authedUser ? Object.values(authedUser)[0] : authedUser,
        questions,
        questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}
export default connect(mapStateToProps)(Dashboard)