import React from 'react';

class PostForm extends React.Component {
  state = {
    image: null,
    memo: '',
    date: '',
    favos: 0,
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>PlainPostForm</h1>
        <div>
          <label>しゃしん</label>
          <input name="image" type="file"/>
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
          <input name="date" type="text"/>
        </div>
        <div>
          <p>いいね： 0</p>
          <button type="button">+</button>
          <button type="button">-</button>
        </div>
        <div>
          {JSON.stringify(this.state, null, 2)}
        </div>
      </div>
    );
  }
}

export default PostForm;
