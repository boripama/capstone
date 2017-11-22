import React from 'react';
import {
  Comment, Form, Button
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class Comments extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { handleSubmit, albumId, userId } = this.props
    handleSubmit(userId, albumId, this.state, this)
    event.target.text.value = '';
  }
  render() {
  const { comments } = props;
  return (
    <Comment.Group>
      { comments &&
      comments.map((comment) => (
        <Comment key={comment.id}>
          <Comment.Avatar as="a" src={comment.user.imageUrl} />
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
      <Form style={{ width: '60sw' }} onSubmit={this.onSubmit} reply>
        <Form.TextArea style={{}}/>
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
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

const mapState = () => ({
  comments: dummyComments
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Comments);
