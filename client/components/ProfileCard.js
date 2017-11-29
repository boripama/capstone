import React from 'react';
import {
  Image,
  Card,
  Icon,
} from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';

const ProfileCard = (props) => {
  const { user } = props;
  return (
    <Card>
      <Image src={user.image} />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>
          <span className="date">{`Member since ${moment(
            user.createdAt
              .split('T')
              .join(' ')
              .slice(0, 19),
            'YYYY-MM-DD HH-mm-ss',
          )
            .subtract(6, 'hours')
            .fromNow()}`}</span>
        </Card.Meta>
        <Card.Description>{user.aboutMe}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {user.totalFollowers === 1
          ? <a><Icon name="user" />{user.totalFollowers} Follower</a>
          : <a><Icon name="user" />{user.totalFollowers} Followers</a>
        }
      </Card.Content>
    </Card>
  );

};


const mapState = ({ user }) => ({ user });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ProfileCard);
