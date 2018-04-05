import React from 'react';
import {
  Image,
  Card,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FollowerCard, MyLoader } from './index';

const FollowerGroup = (props) => {
  const { suggested } = props;

  return (
    suggested.length ?
      (<Card.Group>
        {suggested.slice(-3).map(sug => <FollowerCard key ={sug.id} sug={sug} />)}
      </Card.Group>
      ) : <MyLoader />
  );

};


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(FollowerGroup);

//* <FollowerCard props={users[0]} /> //*}
