import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'
class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props
        if (optionOne.length !== 0 && optionTwo.length !== 0) {
            dispatch(handleAddQuestion(optionOne, optionTwo))
            console.log('New Question', optionOne, ' ---- ', optionTwo)
            this.setState(() => ({
                optionOne: '',
                optionTwo: '',
                toHome: true
            }))
        }
        else {
            alert("question  should n't be empty")
        }
    }
    render() {
        const { optionOne, optionTwo, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/home' />
        }
        const optionOneLeft = 280 - optionOne.length
        const optionTwoLeft = 280 - optionTwo.length
        return (
            <div>
                <h3 className="center">Compose New Question</h3>
                <form className="new-question" onSubmit={this.handleSubmit}>
                    <textarea placeholder="Enter Option One Here..."
                        className="textarea" name="optionOne" value={optionOne}
                        onChange={this.handleChange} maxLength='280' />
                    {optionOneLeft < 100 && (<div>{optionOneLeft}</div>)}
                    <textarea placeholder="Enter  Option Two Here..."
                        className="textarea" name="optionTwo" value={optionTwo}
                        onChange={this.handleChange} maxLength='280' />
                    {optionTwoLeft < 100 && (<div>{optionTwoLeft}</div>)}
                    <button className="btn" type="submit" >Submit</button>
                </form>
            </div>
        )
    }
}
export default connect()(NewQuestion)