import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import PostLink from './PostLink';

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
    let imgSrc = null;
    return (
      <div className="cards">
        <Helmet title="Contentful Static React" />
        {this.state.posts &&
          this.state.posts.map(post => {
            if (post.fields.featuredImage) {
              imgSrc = post.fields.featuredImage.fields.file.url;
            }
            return (
              <PostLink
                key={post.sys.id}
                to={post.sys.id}
                src={imgSrc}
                title={post.fields.title}
              />
            );
          })}
      </div>
    );
  }
}

export default Home;
