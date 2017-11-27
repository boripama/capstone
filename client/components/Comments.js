import React, { Component } from 'react';
import {
  Comment, Form, Button
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteComment, fetchComments, createComment } from '../store';

class Comments extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {
    this.props.fetchCommentsData(this.props.activityId);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { activityId, userId } = this.props;
    createComment(userId, activityId, this.state, this);
    event.target.text.value = '';
  }

  render() {
    console.log('Comment State', this.props);
    const { comments } = this.state;
    return (
      <Comment.Group>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar as="a" src={comment.user.imageUrl} />
              <Comment.Content>
                { /* import and use Link from React-Router */}
                <Comment.Author as="a">{comment.user.name}</Comment.Author>ß
                <Comment.Metadata>
                  { /* fill in with data from comments table */}
                  <span>2 days ago</span>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>

            </Comment>
          ))
        }
        <Form style={{ width: '60sw' }} onSubmit={this.onSubmit} reply>
          <Form.TextArea width={11} height={1} />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
      </Comment.Group>
    );
  }
}


const dummyComments = [
  {
    id: 1,
    content: 'Nice work! Great time, too',
    user: {
      id: 1,
      name: 'Doug',
      imageUrl: 'matthew.png'
    }
  },
  {
    id: 2,
    content: "I've done this run before!",
    user: {
      id: 2,
      name: 'Walter',
      imageUrl: 'matthew.png'
    }
  }
];

const mapState = (state) => {
  return {
    comment: state.comment
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCommentsData: (comment, userId, activityId) => {
      dispatch(fetchComments(comment, userId, activityId));
    },
    removeComment: (commentId) => {
      dispatch(deleteComment(commentId));
    },
  };
};


export default connect(mapState, mapDispatch)(Comments);
