import React from 'react';
import axios from 'axios';
import {
  Image,
  Card,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addFollower, removeSuggested } from '../store';

const FollowerCard = (props) => {
  const { sug, user, updateCardStatus } = props;

  const updateSuggested = (id, rec) => {
    try {
      axios.put(`/api/recs/${id}`, rec);
    }
    catch (err) { console.log('Updating suggested unsuccessful', err); }
  };

  const handleApprove = () => {
    const follower = { status: 'allowed', userId: user.id, followerId: sug.id};
    const rec = { status: 'accepted', recId: sug.id };
    updateCardStatus(follower, sug.id);
    updateSuggested(user.id, rec);
  };

  const handleDecline = () => {
    const follower = { status: 'ignored', userId: user.id, followerId: sug.id};
    const rec = { status: 'declined', recId: sug.id};
    updateCardStatus(follower, sug.id);
    updateSuggested(user.id, rec);
  };

  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={sug.image} />
        <Card.Header>{sug.name ? sug.name : sug.email}</Card.Header>
        <Card.Meta>Followers of Elliot</Card.Meta>
        <Card.Description>
          {sug.name ? sug.name : sug.email} wants to follow you.
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
    updateCardStatus: (follower, id) => {
      dispatch(addFollower(follower));
      dispatch(removeSuggested(id));
    }
  };
};

export default connect(mapState, mapDispatch)(FollowerCard);
