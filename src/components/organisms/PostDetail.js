import React from 'react';
import styled from 'styled-components';
import Label from '../atoms/Label';
import Fabos from '../molecules/Fabos';

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
      <Note>{note}</Note>
      <Label>作成した日</Label>
      <p>{createdAt}</p>
      <Label>更新した日</Label>
      <p>{updatedAt}</p>
      <Label>評価</Label>
      <Fabos count={favos}/>
    </div>
  );
};

const Note = styled.p`
  white-space: pre-line;
`;

export default PostDetail;

