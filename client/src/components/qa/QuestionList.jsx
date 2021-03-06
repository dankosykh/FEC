import React from 'react';
import ReactDOM from 'react-dom';
import QuestionItem from './QuestionItem.jsx';
import QuestionForm from './QuestionForm.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      questions: [],
      questionLimit: 4,
      productID: 0,
      productName: ''
    }

    this.moreQuestions = this.moreQuestions.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  moreQuestions (e) {
    e.preventDefault();
    let newLimit = this.state.questionLimit + 2;
    this.setState({
      questionLimit: newLimit
    })
  }

  addQuestion (e) {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    })
  }

  static getDerivedStateFromProps(props, state) {
    if(props.questions[0]) {
      if(state.questions !== props.questions) {
        return {questions: props.questions};
      }
    }
    if(props.productID !== state.productID) {
      return {
        productID: props.productID,
        productName: props.productName
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.state.questions.slice(0, this.state.questionLimit).map((question) => {
          return (
            <QuestionItem productName={this.props.productName} q={question} key={question.question_id} />
          )
        })}
        <div className="questionButtons">
          {this.state.questions.length > this.state.questionLimit ?
            (<button onClick={this.moreQuestions} name="moreQuestions" className="qaBigButton qaCaps">More Answered Questions</button>)
            : (null)
          }
          <button name="addQuestion" onClick={this.addQuestion} className="newQuestion qaCaps">Add A Question +</button>
          <QuestionForm productID={this.state.productID} productName={this.state.productName} displayModal={this.state.modal} closeModal={this.addQuestion}/>
        </div>
      </div>
    )
  }
}

export default QuestionList