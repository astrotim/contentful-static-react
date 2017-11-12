import React from 'react';
import './Card.css';

const Card = props => (
  <div className="card">
    <h2 className="title">{props.title}</h2>
    {props.src && <img className="image" src={props.src} alt="" />}
  </div>
);

export default Card;
