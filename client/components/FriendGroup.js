import React from 'react';
import {
  Image,
  Card,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FriendCard } from './index';

const FriendGroup = (props) => {
  const { suggested } = props;

  return (
    suggested.length ?
      (<Card.Group>
        {suggested.slice(-3).map(sug => <FriendCard key ={sug.id} sug={sug} />)}
      </Card.Group>
      ) : <div />
  );

};


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(FriendGroup);

//* <FriendCard props={users[0]} /> //*}
