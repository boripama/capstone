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
    ///this.props.fetchCommentsData(this.props.activityId);
  }

  onSubmit = (event) => {
    event.preventDefault();
    // userId is the id of the user whose activity is being
    // commented on! You should probably map the current user from
    // state instead of just passing it down from the parent
    // component. Either that, or you can get the logged in user
    // from the session within the route itself – that way you don't
    // need to explicitly define the userId in the post body, and
    // remove the chances for a mixup like.
    const { activityId, userId } = this.props;
    const comment = {
      content: event.target.content.value,
      activityId,
      userId
    };
    this.props.createCommentsData(comment);
    event.target.content.value = '';
  }

  render() {
   // console.log('Comment State', this.props);
    console.log('this props', this.props);
   //console.log(this.props, 'props');
    const { comments } = this.props;
    if(comments[0]) {
    return (
      <Comment.Group>
        {  comments.map((comment) => ( 
            <Comment key={comment.id}>
            <Comment.Avatar as="a" src={'http://www.placecage.com/500/500'} />
              <Comment.Content>
                { /* import and use Link from React-Router */}
                <Comment.Author as="a">{comment.user.name}</Comment.Author>
                <Comment.Metadata>
                  { /* fill in with data from comments table */}
                  <span>{comment.createdAt}</span>
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

const mapState = () => ({});

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
