import React from 'react';
import {
    Image,
    Card,
    Icon,
    Button,
    Container,
    Grid,
    Segment,
    Header,
    Comment,
    Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class AllActivites extends React.Component {
      state = { collapsed: true }
  handleCheckbox = (e, { checked }) => this.setState({ collapsed: checked })
 
  render() {

    const { collapsed } = this.state
    return (
        <div>
          <Grid centered columns={2}>
            <Grid.Column width ={3}>
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
            </Grid.Column>
            <Grid.Column centered width ={11}>
              <Grid.Row>
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Image floated='right' size='mini' src="matthew.png" />
                    <Card.Header>Steve Sanders</Card.Header>
                    <Card.Meta>Friends of Elliot</Card.Meta>
                    <Card.Description>
                      Steve wants to add you to the group <strong>best friends</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green'>Approve</Button>
                      <Button basic color='red'>Decline</Button>
                    </div>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Image floated='right' size='mini' src="matthew.png" />
                    <Card.Header>Molly Thomas</Card.Header>
                    <Card.Meta>New User</Card.Meta>
                    <Card.Description>
                      Molly wants to add you to the group <strong>musicians</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green'>Approve</Button>
                      <Button basic color='red'>Decline</Button>
                    </div>
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Image floated='right' size='mini' src="matthew.png" />
                    <Card.Header>Jenny Lawrence</Card.Header>
                    <Card.Meta>New User</Card.Meta>
                    <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green'>Approve</Button>
                      <Button basic color='red'>Decline</Button>
                    </div>
                  </Card.Content>
                 </Card>
              </Card.Group>
              </Grid.Row>
              <Grid.Row>
              <br />
                <Container width={11}>
                  <Segment>
                     <Header size='large'>First Activity</Header>
                     <Grid columns={2}>
                      <Grid.Column>
                       <Image src='square-image.png' size='medium' rounded />
                       </Grid.Column>
                       <Grid.Column>
                         <div>
                           <Header size='small'>Duration: </Header> 7.5 min
                         </div>
                         <br /><br /><br /><br />
                         <div>
                           <Header size='small'>Pace: </Header> 5.00 min/mile
                         </div>
                         <br /><br /><br /><br />
                         <div>
                           <Header size='small'>Miles: </Header> 1.5 miles
                         </div>
                       </Grid.Column>

                    </Grid>
                               <Checkbox defaultChecked label='Collapse comments' onChange={this.handleCheckbox} />

        <Comment.Group>
          <Comment>
            <Comment.Avatar as='a' src="matthew.png" />
            <Comment.Content>
              <Comment.Author as='a'>Christian Rocha</Comment.Author>
              <Comment.Metadata>
                <span>2 days ago</span>
              </Comment.Metadata>
              <Comment.Text>
                I'm very interested in this motherboard. Do you know if it'd work in a Intel LGA775 CPU socket?
              </Comment.Text>
              <Comment.Actions>
                <a>Reply</a>
              </Comment.Actions>
            </Comment.Content>

            <Comment.Group collapsed={collapsed}>
              <Comment>
                <Comment.Avatar as='a' src="matthew.png" />
                <Comment.Content>
                  <Comment.Author as='a'>Elliot Fu</Comment.Author>
                  <Comment.Metadata>
                    <span>1 day ago</span>
                  </Comment.Metadata>
                  <Comment.Text>No, it wont</Comment.Text>
                  <Comment.Actions>
                    <a>Reply</a>
                  </Comment.Actions>
                </Comment.Content>

                <Comment.Group>
                  <Comment>
                    <Comment.Avatar as='a' src="matthew.png" />
                    <Comment.Content>
                      <Comment.Author as='a'>Jenny Hess</Comment.Author>
                      <Comment.Metadata>
                        <span>20 minutes ago</span>
                      </Comment.Metadata>
                      <Comment.Text>Maybe it would.</Comment.Text>
                      <Comment.Actions>
                        <a>Reply</a>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              </Comment>
            </Comment.Group>
          </Comment>
        </Comment.Group>
                  </Segment>
                  <Segment>
                     <Header size='large'>Second Activity</Header>
                       <Image src='square-image.png' size='medium' rounded />
                  </Segment>
                  <Segment>
                     <Header size='large'>Third Activity</Header>
                       <Image src='square-image.png' size='medium' rounded />
                  </Segment>                  
                </Container>
              </Grid.Row>
            </Grid.Column>
          </Grid>
         </div>
    );
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AllActivites);
