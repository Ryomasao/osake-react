import React from 'react';

class PostForm extends React.Component {
  state = {
    image: null,
    imagePreViewUrl: '',
    memo: '',
    date: '',
    favos: 0,
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCountButtonClick = ({ targetName, operator }) => {
    let newCount = this.state[targetName];
    newCount = operator === 'increment' ? ++newCount: --newCount;
    this.setState({
      [targetName]: newCount
    });
  }

  handleChangeFile = e => {
    const file = e.target.files[0];
    this.setState({
      [e.target.name]: file 
    });
  }

  render() {
    return (
      <div>
        <h1>PlainPostForm</h1>
        <div>
          <label>しゃしん</label>
          <input 
            name="image" 
            type="file"
            onChange={this.handleChangeFile}
          />
        </div>
        <div>
          <label>メモ</label>
          <input 
            name="memo" 
            type="text"
            value={this.state.memo}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>飲んだ日</label>
          <input 
            name="date" 
            type="date"
            value={this.state.date}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <p>いいね： {this.state.favos}</p>
          <button 
            type="button"
            onClick={() => this.handleCountButtonClick({
              targetName: 'favos',
              operator: 'increment'
            })}
          >+</button>
          <button 
            type="button"
            onClick={() => this.handleCountButtonClick({
              targetName: 'favos',
              operator: 'decrement'
            })}
          >-</button>
        </div>
        <div>
          {JSON.stringify(this.state, null, 2)}
        </div>
      </div>
    );
  }
}

export default PostForm;
