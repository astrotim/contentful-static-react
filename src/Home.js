import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import Card from './Card';

import './Home.css';

class Home extends Component {
  state = {
    posts: null
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      .getContentTypes()
      .then(response => {
        const postType = response.items.find(item => item.name === 'Post');
        return postType.sys.id;
      })
      .then(id => {
        client
          .getEntries({
            content_type: id
          })
          .then(response => {
            this.setState({
              posts: response.items
            });
          })
          .catch(console.error);
      })
      .catch(console.error);
  }

  render() {
    console.log(this.state.posts);
    const imgSrc = 'https://picsum.photos/300/200';
    return (
      <div className="cards">
        <Helmet title="Contentful Static React" />
        {this.state.posts &&
          this.state.posts.map(post => (
            <Link key={post.sys.id} to={`post/${post.sys.id}/`}>
              <Card src={imgSrc} title={post.fields.title} />
            </Link>
          ))}
      </div>
    );
  }
}

export default Home;
