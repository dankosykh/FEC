import React from 'react';
import './writeReview.css';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      date: '',
      rating: '',
      summary: '',
      body: '',
      recommend: null,
      name: '',
      email: '',
      photos: [],
      fit: '',
      fitID: '',
      length: '',
      lengthID: '',
      comfort: '',
      comfortID: '',
      quality: '',
      qualityID: '',
      postParams: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBoolean = this.handleBoolean.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    let st = this.state;
    e.preventDefault();
    this.setState({
      date: new Date(),
      postParams: {
        product_id: Number(st.product_id),
        rating: Number(st.rating),
        summary: st.summary,
        body: st.body,
        recommend: st.recommend,
        name: st.name,
        email: st.email,
        photos: [],
        characteristics: {
          [st.fitID]: Number(st.fit),
          [st.lengthID]: Number(st.length),
          [st.qualityID]: Number(st.quality),
          [st.comfortID]: Number(st.comfort)
        }
      }
    },
    () => { this.props.submitWriteReview(this.state.postParams) });
  }

  handleBoolean(e) {
    e.target.value === 'true'
    ? this.setState({ recommend: true })
    : this.setState({ recommend: false });
  }

  componentDidMount() {
    let meta = this.props.productMetadata;
    let metaChar = meta.characteristics;
    this.setState({
      product_id: meta.product_id,
      fitID: metaChar.Fit.id,
      lengthID: metaChar.Length.id,
      qualityID: metaChar.Quality.id,
      comfortID: metaChar.Comfort.id
    })
  }

  render () {
    return (
      <div className='write-review-container'>
        <div>
          <h2>______________________________________________________</h2>
          <h3>Write a new Review for product#{this.state.product_id}</h3>
          <form onSubmit={this.handleSubmit}>
            <label onChange={this.handleChange} value={this.state.rating}>
              <input type='radio' value='1' name='rating' required/>1
              <input type='radio' value='2' name='rating'/>2
              <input type='radio' value='3' name='rating'/>3
              <input type='radio' value='4' name='rating'/>4
              <input type='radio' value='5' name='rating'/>5
            </label>
            <div>
              <input
                placeholder='Please give a breif summary of your review'
                name='summary'
                value={this.state.summary}
                onChange={this.handleChange}
              />
              <input
                placeholder='1000 character max'
                name='body'
                value={this.state.body}
                onChange={this.handleChange}
                required
              />
            </div>
            <input
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <input
              placeholder='Email'
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label onChange={this.handleBoolean} value={this.state.recommend}>
              <h6>Would you recommend this item?</h6>
              <input type='radio' name='recommend' value='true' required />Yes
              <input type='radio' name='recommend' value='false' />No
            </label>
            <div className='characteristics-container'>
              <span style={{padding: '3px'}}>Characteristics</span>
              <div>
                <label onChange={this.handleChange} value={this.state.rating}>
                  Fit
                  <input type='radio' value='1' name='fit' required/>1
                  <input type='radio' value='2' name='fit'/>2
                  <input type='radio' value='3' name='fit'/>3
                  <input type='radio' value='4' name='fit'/>4
                  <input type='radio' value='5' name='fit'/>5
                </label>
              </div>
              <div>
                <label onChange={this.handleChange} value={this.state.rating}>
                  Length
                  <input type='radio' value='1' name='length' required/>1
                  <input type='radio' value='2' name='length'/>2
                  <input type='radio' value='3' name='length'/>3
                  <input type='radio' value='4' name='length'/>4
                  <input type='radio' value='5' name='length'/>5
                </label>
              </div>
              <div>
                <label onChange={this.handleChange} value={this.state.rating}>
                  Comfort
                  <input type='radio' value='1' name='comfort' required/>1
                  <input type='radio' value='2' name='comfort'/>2
                  <input type='radio' value='3' name='comfort'/>3
                  <input type='radio' value='4' name='comfort'/>4
                  <input type='radio' value='5' name='comfort'/>5
                </label>
              </div>
              <div>
                <label onChange={this.handleChange} value={this.state.rating}>
                  Quality
                  <input type='radio' value='1' name='quality' required/>1
                  <input type='radio' value='2' name='quality'/>2
                  <input type='radio' value='3' name='quality'/>3
                  <input type='radio' value='4' name='quality'/>4
                  <input type='radio' value='5' name='quality'/>5
                </label>
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default WriteReview;