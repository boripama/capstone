import React from 'react';
import {
  Comment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const Comments = (props) =>  {
  const { comments } = props;
  return (
    <Comment.Group>
      { comments &&
      comments.map((comment) => (
        <Comment key={comment.id}>
          <Comment.Avatar as="a" src="matthew.png" />
          <Comment.Content>
            { /* import and use Link from React-Router */ }
            <Comment.Author as="a">{comment.user.name}</Comment.Author>
            <Comment.Metadata>
              { /* fill in with data from comments table */ }
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
    </Comment.Group>
  );
}

const dummyComments = [
  {
    id: 1,
    content: 'Nice work! Great time, too',
    user: {
      id: 1,
      name: 'Doug'
    }
  },
  {
    id: 2,
    content: "I've done this run before!",
    user: {
      id: 2,
      name: 'Walter'
    }
  }
];

const mapState = () => ({
  comments: dummyComments
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Comments);
