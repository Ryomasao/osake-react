import React from 'react';
import GoodCount from './GoodCount';
import ImagePreview from './ImagePreview';
import { Formik, Form, Field } from 'formik';


const initialValues = {
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


const handleSubmit =  async (values, actions, onSubmit) => {
  // @ToDO
};

const validateImage = value => {
  let error = '';
  if(!value.file) {
    error = 'しゃしんは必須だよ！';
  }
  return error;
};

const ImagePreviewWrapper = props => (
  <ImagePreview 
    onChange={(file, name) => {
      props.form.setFieldValue('image.name', name);
      props.form.setFieldValue('image.file', file);
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

class PostForm extends React.Component {
  render() {
    return (
      <Formik 
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={({values, actions}) => handleSubmit(values, actions, this.props.onSubmit)}
      >
        { props => {
          return (
            <Form>
              <label htmlFor="sake-image">しゃしん</label>
              <Field name="image" previewUrl="" validate={validateImage} component={ImagePreviewWrapper} />
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
