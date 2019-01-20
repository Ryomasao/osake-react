import React from 'react';
import GoodCount from './GoodCount';
import ImagePreview from './ImagePreview';
import createErrors from '../../util/createErrors';

const initalFormValues = {
  post: {
    imagePath: '',
    note: '',
    date: '',
    favos: 0,
  },
  image: {
    file: null,
    name: '',
  },
};

const initalFormErorrs = {
  errors: createErrors(initalFormValues.post) 
};

const defaultState = {
  ...initalFormValues,
  ...initalFormErorrs
};


class PostForm extends React.Component {
  static defaultProps = {
    onSubmit : () => Promise.resolve()
  }

  state = this.props.initialValue ?  
    { ...defaultState,  post: {...this.props.initialValue} }
    : defaultState

  handleInputChange = e => {
    this.setState({ post: { ...this.state.post, [e.target.name]: e.target.value }});
  }

  handleCountButtonClick = e => {
    const { target } = e;
    let newCount = this.state.post.favos;
    newCount = target.name === 'increment' ? ++newCount: --newCount;
    this.setState({ post: {...this.state.post, favos: newCount }});
  }

  handleChangeFile = (file, name) => {
    this.setState({ image: {...this.state.image, file, name }});
  }

  handleSubmit = e => {
    e.preventDefault();

    for(const key in this.state.post) {
      if(this.state.post[key] === initalFormValues.post[key]) {
        this.setState({errors: { ...this.state.errors, [key]: {isError: true} } });
      }
    }

    this.props.onSubmit(this.state);
  }

  render() {
    const { 
      note, 
      date, 
      favos 
    } =  this.state.post;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="sake-image">しゃしん</label>
          <ImagePreview 
            onChange={this.handleChangeFile}
            previewUrl={this.state.post.imagePath}
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
