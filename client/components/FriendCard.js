import React from 'react';
import {
  Image,
  Card,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addFollower, removeSuggested, updateSuggested } from '../store';

const FriendCard = (props) => {
  const { sug, user, add } = props;
  const handleApprove = () => {
    const follower = { status: 'allowed', userId: user.id, followerId: sug.id};
    const rec = { status: 'accepted', recId: sug.id };
    add(follower, rec, sug.id, user.id);
  };
  const handleDecline = () => {
    const follower = { status: 'ignored', userId: user.id, followerId: sug.id};
    const rec = { status: 'declined', recId: sug.id};
    add(follower, rec, sug.id, user.id);
  };
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={sug.image} />
        <Card.Header>{sug.name ? sug.name : sug.email}</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          {sug.name ? sug.name : sug.email} wants to be Friends with you.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={handleApprove}>Approve</Button>
          <Button basic color="red" onClick={handleDecline}>Decline</Button>
        </div>
      </Card.Content>
    </Card>
  );

};


const mapState = ({ user }) => ({ user });
const mapDispatch = (dispatch) => {
  return {
    add: (follower, rec, id, userId) => {
      dispatch(addFollower(follower));
      dispatch(removeSuggested(id));
      updateSuggested(userId, rec);
    }
  };
};

export default connect(mapState, mapDispatch)(FriendCard);
