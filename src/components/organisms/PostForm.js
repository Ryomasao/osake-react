import React from 'react';
import styled from 'styled-components';
import GoodCount from '../molecules/GoodCount';
import ImageUploader from '../molecules/ImageUploader';
import { Formik, Form, Field } from 'formik';
import TextArea from '../atoms/TextArea';
import Label from '../atoms/Label';
import Button from '../atoms/Button';
import Link from '../atoms/Link';
import Supply from '../atoms/Supply';
import moment from 'moment';
import DatePickerWithLabel from '../molecules/DatePickerWithLabel';
import LoadingModal from './LoadingModal';

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
  <ImageUploader 
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

const DatePickerWrapper = props => {
  return (
    <DatePickerWithLabel 
      onChange={
        selectedDate => {
          const date =  moment(selectedDate).format('YYYY/MM/DD');
          props.form.setFieldValue('post.date', date);
        }
      }
      value={props.field.value} 
    />
  );
};

const TextAreaWrapper = ({field}) => {
  return <TextArea {...field} placeholder="たくさんのおもいでを"/>;
};

const initialFormValues = {
  post : {
    imagePath: '',
    note: '',
    date: moment().format('YYYY/MM/DD'),
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
              <div className="field">
                <Field 
                  type="date" 
                  name="post.date" 
                  component={DatePickerWrapper}
                />
              </div>

              <div className="field">
                <Label className="label">おもいで</Label>
                <Field name="post.note" component={TextAreaWrapper} />
              </div>

              <Label>評価</Label>
              <Field name="post.favos" component={GoodCountWrapper} />

              <FieldWrapper>
                <Field name="image" previewUrl={props.values.post.imagePath} component={ImagePreviewWrapper} />
                { props.errors.image ? <Supply error>{props.errors.image}</Supply> : null}
              </FieldWrapper>

              <Button 
                type="submit" 
                disabled={props.isSubmitting}
                addClassName="is-success is-fullwidth"
              >
                投稿する
              </Button>

              <FieldWrapper>
                <Link to="/" addClassName="is-fullwidth">もどる</Link>
                { props.isSubmitting && <LoadingModal title="アップロードしてます"/>}
              </FieldWrapper>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

const FieldWrapper =  styled.div`
  margin: 1rem 0;  
`;


export default PostForm;
