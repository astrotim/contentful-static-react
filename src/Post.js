import React, { Component, createElement } from 'react';
import { createClient } from 'contentful';
import Helmet from 'react-helmet';
import marksy from 'marksy';

import './Post.css';

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      // use getEntries because it does link resolution
      .getEntries({
        'sys.id[in]': this.props.match.params.id
      })
      .then(response => {
        // extract the data from the response array
        return response.items[0].fields;
      })
      .then(fields => {
        this.setState({
          data: fields
        });
      })
      .catch(console.error);
  }

  render() {
    let title;
    let content;

    if (this.state.data) {
      title = this.state.data.title;
      content = getMarkup(this.state.data.content);
    }

    return (
      <div className="post">
        <Helmet title={title} />
        <h1>{title}</h1>
        {content}
      </div>
    );
  }
}

export default Post;
