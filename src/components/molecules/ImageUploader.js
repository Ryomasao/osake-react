import React from 'react';
import PreviewBox from '../atoms/PreviewBox';

class ImageUploder extends React.Component {
  state = { previewUrl: this.props.previewUrl ? this.props.previewUrl : '' }

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
    return (
      <PreviewBox 
        src={this.state.previewUrl} 
        alt="preview" 
        handleChangeFile={this.handleChangeFile}
        handleDeleteFile={this.handleDeleteFile}
      />
    );
  }
}

export default ImageUploder;