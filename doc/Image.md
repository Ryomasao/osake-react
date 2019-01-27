
```javascript
  resize(src, exif) {
    const canvas = this.ctx.current.getContext('2d');
    const image = new Image();
    image.src= src;
    image.onload = () => {
      // 画像そのものの高さと幅を取得する
      let width = image.naturalWidth;
      let height = image.naturalHeight;

      //なんだけれども、iphoneで縦長の画像を普通にとると、横長の画像として保存されている。
      // exifの情報をみて、回転させなきゃいけない。
      const srcOrientation = exif.Orientation;

      if (4 < srcOrientation && srcOrientation < 9) {
        // 5-8はiPhoneを縦にしてとった場合。
        // 縦と横の長さを入れ替える。
        [width, height] = [height, width];
      }

      //キャンバスのサイズも正しい縦横にしておく。
      this.ctx.current.width = width;
      this.ctx.current.height = height;

      //ここで、回転させる必要がある。

      //よっしゃ描画
      canvas.drawImage(image, 0, 0);
```

