import React from 'react';
import GoodCount from './GoodCount';

class PostForm extends React.Component {
  static defaultProps = {
    onSubmit : () => Promise.resolve()
  }

  state = {
    post: {
      note: '',
      date: '',
      favos: 0,
    },
    image: {
      file: '',
      name: '',
    }
  }

  handleInputChange = e => {
    this.setState({ post: { ...this.state.post, [e.target.name]: e.target.value }});
  }

  handleCountButtonClick = e => {
    const { target } = e;
    let newCount = this.state.post.favos;
    newCount = target.name === 'increment' ? ++newCount: --newCount;
    this.setState({ post: {...this.state.post, favos: newCount }});
  }

  handleChangeFile = e => {
    const file = e.target.files[0];
    const name = file.name;
    this.setState({ image: {...this.state.image, file, name }});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {

    const { note, date, favos } = this.state.post;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="sake-image">しゃしん</label>
          <input 
            id="sake-image"
            name="sake-image" 
            type="file"
            onChange={this.handleChangeFile}
          />
        </div>
        <div>
          <label htmlFor="sake-note">メモ</label>
          <input 
            id="note"
            name="note" 
            type="text"
            value={note}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <label>飲んだ日</label>
          <input 
            name="date" 
            type="date"
            value={date}
            onChange={this.handleInputChange}
          />
        </div>
        <GoodCount 
          onClick={this.handleCountButtonClick}
          value={favos}
        />
        <button>投稿する</button>
      </form>
    );
  }
}

export default PostForm;
