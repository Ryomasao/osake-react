import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ to, post }) => {
  return (
    <div>
      <Link to={to} >
        <span>{post.date}</span>
        <img src={post.imagePath} alt="osake"/>
      </Link>
    </div>
  );
};
export default PostItem;

