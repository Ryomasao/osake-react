import React from 'react';
import { Formik, Field, Form, FiledArray, ErrorMessage } from 'formik';

const initialValues = {
  friends: [
    {
      name: '',
      email: ''
    }
  ]
};

const PostForm = () => (
  <div>
    <h1>UseFormik</h1>
    <Formik
      initialValues={initialValues}
    >
      <div>Foo</div>
    </Formik>
  </div>
);


export default PostForm;
