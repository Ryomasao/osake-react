import React from 'react';
import PreviewBox from '../atoms/PreviewBox';
import EXIF from 'exif-js';

class ImageUploder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      previewUrl: this.props.previewUrl || ''
    };

    this.ctx = React.createRef();
  }

  resize(src, exif) {
    return new Promise( resolve => {
      const canvas = this.ctx.current.getContext('2d');
      const image = new Image();
      image.src= src;
      image.onload = () => {
        // もともとの画像が保持しているもの。
        let width = image.naturalWidth;
        let height = image.naturalHeight;

        //なんだけれども、iphoneでとった画像は、横縦が逆になってたりする。
        // exifの情報をみて、横と縦をただしいものにする。
        const srcOrientation = exif.Orientation;

        //console.log(`width:${width}`, `height:${height}`, `Ori:${srcOrientation}`);

        if (4 < srcOrientation && srcOrientation < 9) {
          // 縦横が逆になるので、入れ替える。
          [width, height] = [height, width];
        }

        // 横幅が400px以下になるように縮小する
        const scale = 400 / width < 1 ? 400 / width : 1;

        width = width * scale;
        height = height * scale;

        // canvasのデフォルトのサイズは300x150なので指定する。
        this.ctx.current.width = width;
        this.ctx.current.height = height;


        // Orientationにに合わせて、回転させる。
        // scaleとかrotateを個別にやってもいいのだけどれも、transformは直接できる
        // 行列の知識はないと謎だ。
        // 元ネタはこれ。
        // https://stackoverflow.com/questions/20600800/js-client-side-exif-orientation-rotate-and-mirror-jpeg-images/20600801#20600801
        // これに、縮小を考慮してscaleを設定してる

        // 様子見で解放してる。3,6,8ぐらいのパターンしか再現できてない
        switch (srcOrientation) {
        //case 1: canvas.transform(scale, 0, 0, scale, 0, 0); break;
        //case 2: canvas.transform(-scale, 0, 0, scale, width, 0); break;
        case 3: canvas.transform(-scale, 0, 0, -scale, width, height); break;
        //case 4: canvas.transform(scale, 0, 0, -scale, 0, height); break;
        //case 5: canvas.transform(0, scale, scale, 0, 0, 0); break;
        case 6: canvas.transform(0, scale, -scale, 0, width, 0); break;
        //case 7: canvas.transform(0, -scale, -scale, 0, height, width); break;
        case 8: canvas.transform(0, -scale, scale, 0, 0, height); break;
        default: break;
        }

        //よっしゃ描画
        canvas.drawImage(image, 0, 0);
        this.ctx.current.toBlob((blob) => resolve(blob));

        //https://gyazo.com/af90977df2ee3c6f464e0ab9af879657
        //canvas.drawImage(image, 0, 0);
        //canvas.drawImage(image, 0, 0, width, height, 0, 0, width / 2, height / 2 );
        //this.$refs.canvas.toBlob((blob) => {
        //  this.$emit('put', { image: blob, name: this.fileName })
        //})
      };
    });
  }

  // EXIF情報を取得する
  promiseExif = file => {
    return new Promise(resolve => {
      EXIF.getData(file, function () {
        const exif = EXIF.getAllTags(this);
        resolve(exif);
      });
    });
  }

  handleChangeFile = async ({ target }) => {
    const file = target.files[0];
    const name = file.name;
    const previewUrl = URL.createObjectURL(file);
    const exif = await this.promiseExif(file);
    const newFile = await this.resize(previewUrl, exif);
    this.setState({ previewUrl });
    this.props.onChange(newFile, name);
  }

  handleDeleteFile = () => {
    this.setState({ previewUrl: '' });
    this.props.onChange(null, '');
  }

  render() {
    return (
      <React.Fragment>
        <PreviewBox 
          src={this.state.previewUrl} 
          alt="preview" 
          handleChangeFile={this.handleChangeFile}
          handleDeleteFile={this.handleDeleteFile}
        />
        <canvas ref={this.ctx} style={{
          display: 'none',
          border: '1px solid'
        }}/>
      </React.Fragment>
    );
  }
}

export default ImageUploder;