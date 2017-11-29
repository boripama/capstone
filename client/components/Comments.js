import React, { Component } from 'react';
import {
  Comment, Form, Button
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteComment, fetchComments, createComment } from '../store';
import { withRouter } from "react-router-dom";
import axios from 'axios';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments
    };
  }


  componentDidMount() {

  }

  onSubmit = (event) => {

    const { activityId } = this.props;
    const userId = this.props.user.id;
    const comment = {
      content: event.target.content.value,
      activityId,
      userId
    };
    this.props.createCommentsData(comment);
    event.target.content.value = '';
    this.setState({ comments: this.state.comments.concat({ ...comment, user: this.props.user, createdAt: new Date().toISOString() }) });
  }

  sliceDate(date) {
    return date.slice(0, 10) + ' ' + date.slice(12, 19);
  }

  render() {
    const { comments } = this.state;

    return (
      <Comment.Group>
        {comments[0] && comments.map((comment) =>
          (
            <Comment key={comment.id}>
              <Comment.Avatar as="a" src={'http://www.placecage.com/500/500'} />
              <Comment.Content>
                { /* import and use Link from React-Router */}
                <Comment.Author as="a">{comment.user.name}</Comment.Author>
                <Comment.Metadata>
                  { /* fill in with data from comments table */}
                  <span>{this.sliceDate(comment.createdAt)}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        )
        }
        <Form style={{ width: '60sw' }} onSubmit={this.onSubmit} reply>
          <Form.TextArea width={11} height={1} name="content" />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
      </Comment.Group>
    );
  }
}

const mapState = ({ user }) => ({
  user
});

const mapDispatch = (dispatch) => {
  return {
    fetchCommentsData: (activityId) => {
      dispatch(fetchComments(activityId));
    },
    removeComment: (commentId) => {
      dispatch(deleteComment(commentId));
    },
    createCommentsData: (comment) => {
      dispatch(createComment(comment));
    }
  };
};


export default connect(mapState, mapDispatch)(Comments);
