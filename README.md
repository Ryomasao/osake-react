# お酒の写真を管理するアプリ

## デプロイ方法

```
$ yarn build
```

```
$ cd ./build && firebase deploy
```

## メモ

### package.json の内容をアップデートする

対話式に、どのパッケージをアップデートするか選択できる。
package.json で指定されたバージョンの範囲内で候補を出してくれている気がする。

```
$ yarn upgrade-interactive
```

なんだけど、これでアップデートしても、package.json の更新がされなかった。
今回は、全部アップデートしたかったので、`yarn upgrade --latest`　を実行したら、package.json も更新された。
