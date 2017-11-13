import React from 'react';
import { Link } from 'react-router-dom';
import './PostLink.css';

const PostLink = props => (
  <Link to={`post/${props.to}/`} className="post-link">
    <h2 className="title">{props.title}</h2>
    <div className="image">{props.src && <img src={props.src} alt="" />}</div>
  </Link>
);

export default PostLink;
