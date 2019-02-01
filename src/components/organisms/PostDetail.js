import React from 'react';
import Label from '../atoms/Label';

const PostDetail = props => {
  const { 
    imagePath,
    createdAt,
    updatedAt,
    date,
    favos,
    note,
  } = props.post;

  return (
    <div>
      <Label>飲んだ日</Label>
      <p>{date}</p>
      <img src={imagePath} alt="osake"/>
      <Label>おもいで</Label>
      <p>{note}</p>
      <Label>作成した日</Label>
      <p>{createdAt}</p>
      <Label>更新した日</Label>
      <p>{updatedAt}</p>
      <Label>評価</Label>
      <p>{favos}</p>
    </div>
  );
};

export default PostDetail;

