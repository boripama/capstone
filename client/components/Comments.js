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
    const text = event.target.text.value;
    console.log('activityId', activityId, 'userId', userId, 'eventTargetValue', event.target.text.value)
    createComment(text, userId, activityId);
    event.target.value = '';
  }

  render() {
   // console.log('Comment State', this.props);
    console.log('this props', this.props)
   //console.log(this.props, 'props');
    const { comments } = this.props;
    if(comments[0]) {
    return (
      <Comment.Group>
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar as="a" src={comment.user.image} />
              <Comment.Content>
                { /* import and use Link from React-Router */}
                <Comment.Author as="a">{comment.user.name}</Comment.Author>ß
                <Comment.Metadata>
                  { /* fill in with data from comments table */}
                  <span>{comment.createdAt}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        }
        <Form style={{ width: '60sw' }} onSubmit={this.onSubmit} reply>
          <Form.TextArea width={11} height={1} name="text" />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
      </Comment.Group>
      );
    }
    else {
      return null;
    }
  }
}


const dummyComments = [
  {
    id: 1,
    content: 'Nice work! Great time, too',
    user: {
      id: 1,
      name: 'Doug',
      image: 'http://www.placecage.com/500/500'
    }
  },
  {
    id: 2,
    content: "I've done this run before!",
    user: {
      id: 2,
      name: 'Walter',
      image: 'http://www.placecage.com/500/500'
    }
  }
];

// const mapState = (state) => {
//   return {
//     comments: state.comments
//   };
// };

const mapState = ({comments}) => ({comments});

const mapDispatch = (dispatch) => {
  return {
    fetchCommentsData: (activityId) => {
      dispatch(fetchComments(activityId));
    },
    removeComment: (commentId) => {
      dispatch(deleteComment(commentId));
    },
    createCommentsData: (comment, userId, activityId) => {
      dispatch(createComment(comment, userId, activityId));
    }
  };
};


export default connect(mapState, mapDispatch)(Comments);
