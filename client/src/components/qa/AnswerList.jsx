import React from 'react';
import ReactDOM from 'react-dom';
import AnswerItem from './AnswerItem.jsx'

class AnswerList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      answers: [],
      answerLimit: 2
    }
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.showLessAnswers = this.showLessAnswers.bind(this);
  }
  showMoreAnswers (e) {
    e.preventDefault();
    let updateLimit = this.state.answers.length;
    this.setState({
      answerLimit: updateLimit
    })
  }

  showLessAnswers (e) {
    e.preventDefault();
    this.setState({
      answerLimit: 2
    })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.answers) {
      var answersArray = Object.values(props.answers)
      if (state.answers !== props.answers) {
        return {answers: answersArray};
      }
    }
    return null;
  }

  render() {
    return (
      <>
      {this.state.answers.length !== 0 ?
      <div className="answersContainer">
        {this.state.answers.slice(0, this.state.answerLimit).map((answer) => {
          return (
            <AnswerItem answer={answer} key={answer.id}/>
            )
          })}
        {this.state.answers.length > this.state.answerLimit ? (
          <button className="qaCaps qaLinkButton moreAnswers qaButton" onClick={this.showMoreAnswers}>Load More Answers</button>)
          : this.state.answers.length <= 2 ? (null)
          : (
            <button className="qaCaps qaLinkButton moreAnswers qaButton" onClick={this.showLessAnswers}>Collapse Answers</button>
        )}
      </div>
      : (null)}
      </>
    )
  }
}

export default AnswerList