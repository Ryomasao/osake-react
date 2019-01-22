import React from 'react';
import GoodCount from './GoodCount';
import ImagePreview from './ImagePreview';
import { Formik, Form, Field } from 'formik';

const handleSubmit =  async (values, actions, onSubmit) => {
  await onSubmit(values);
  actions.setSubmitting(false);
};

const validate = ({ post, image }) => {
  let errors = {};

  // しゃしんを 新規登録時
  // fileにFileObjectが設定される
  // しゃしんを 更新時
  // しゃしん以外を更新
  // fileはnull、post.imagePathにURLが設定済
  if(image.file === null && post.imagePath === '') {
    errors.image = 'しゃしんは必須だよ！';
  }
  return errors;
};

const ImagePreviewWrapper = props => (
  <ImagePreview 
    onChange={(file, name) => {
      props.form.setFieldValue('image.name', name);
      props.form.setFieldValue('image.file', file);
      // post.imagePathはEdit時にアップロード済のしゃしんのURLが設定される。
      // しゃしんを上げ直した場合は、設定されたURLをクリアする
      props.form.setFieldValue('post.imagePath', '');
    }}
    previewUrl={props.previewUrl}
  />
);

const GoodCountWrapper = props => {
  let prevCount = props.field.value;
  let newCount = 0;
  return (
    <GoodCount 
      onClick={(e) => {
        if(e.target.name === 'increment') {
          newCount = ++prevCount;
        } else {
          newCount = --prevCount;
        }
        props.form.setFieldValue('post.favos', newCount);
      }}
      value={props.field.value}
    />
  );
};

const initialFormValues = {
  post : {
    imagePath: '',
    note: '',
    date: '',
    favos: 0,
  },
  image: {
    file: null,
    name: '',
  }
};

class PostForm extends React.Component {
  render() {
    const initalValues = this.props.initialValues ? {
      post: { ...this.props.initialValues },
      image: { ...initialFormValues.image }
    } : initialFormValues;

    return (
      <Formik 
        initialValues={initalValues}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => handleSubmit(values, actions, this.props.onSubmit)}
      >
        { props => {
          return (
            <Form>
              <label htmlFor="sake-image">しゃしん</label>
              <Field name="image" previewUrl={props.values.post.imagePath} component={ImagePreviewWrapper} />
              { props.errors.image ? <p>{props.errors.image}</p> : null}
              <label htmlFor="sake-note">メモ</label>
              <Field type="text" name="post.note"/>
              <label>飲んだ日</label>
              <Field type="date" name="post.date" />
              <Field name="post.favos" component={GoodCountWrapper} />
              <button type="submit" disabled={props.isSubmitting}>投稿する</button>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default PostForm;
