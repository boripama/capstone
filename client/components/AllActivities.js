import React from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { ProfileCard, FriendGroup, ActivityContainer } from './index';
import { connect } from 'react-redux';

const AllActivites = () => {
  return (
    <div>
      <Grid centered columns={2}>
        <Grid.Column width ={3}>
          <ProfileCard />
        </Grid.Column>
        <Grid.Column width ={11}>
          <Grid.Row>
            <FriendGroup />
          </Grid.Row>
          <Grid.Row>
            <br />
            <Container width={11}>
              <ActivityContainer />
              <ActivityContainer />
              <ActivityContainer />
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllActivites);
