import React from 'react';

class ImagePreview extends React.Component {
  state = { previewUrl: ''}

  handleChangeFile = ({ target }) => {
    const file = target.files[0];
    const name = file.name;
    const previewUrl = URL.createObjectURL(file);
    this.setState({ previewUrl });
    this.props.onChange(file, name);
  }

  handleDeleteFile = () => {
    this.setState({ previewUrl: '' });
    this.props.onChange(null, '');
  }

  render() {
    if (this.state.previewUrl) {
      return (
        <div>
          <img src={this.state.previewUrl} alt="preview"/>      
          <button onClick={this.handleDeleteFile}>delete</button>
        </div>
      );
    }

    return (
      <div>
        <input 
          id="sake-image"
          name="sake-image" 
          type="file"
          onChange={this.handleChangeFile}
        />
      </div>
    );
  }
}

export default ImagePreview;