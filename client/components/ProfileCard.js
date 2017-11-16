import React from 'react';
import {
  Image,
  Card,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const ProfileCard = () => {
  return (
    <Card>
      <Image src="matthew.png" />
      <Card.Content>
        <Card.Header> Matthew</Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2015</span>
        </Card.Meta>
        <Card.Description> Matthew is a musician living in Nashville.</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a><Icon name="user" />22 Friends</a>
      </Card.Content>
    </Card>
  );

};


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProfileCard);
