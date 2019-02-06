import React from 'react';
import { Link } from 'react-router-dom';


const PostItem = ({ to, post }) => {
  return (
    <div data-testid="post-item">
      <Link to={to} >
        <div>
          <span>{post.date.slice(0,10)}</span>
        </div>
        <img src={post.imagePath} alt="osake"/>
      </Link>
    </div>
  );
};
export default PostItem;

