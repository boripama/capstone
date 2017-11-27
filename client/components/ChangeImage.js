import React from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Input,
} from 'semantic-ui-react';
import { updateUser } from '../store';
import { connect } from 'react-redux';

class ChangeImage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { modalOpen: false };
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

 handleChange = evt => {
   console.log(evt.target.picture.value);
   this.props.update(this.props.user.id, { image: evt.target.picture.value });
   this.handleClose();
 };

 render() {
   return (
     <Modal
       trigger={<Button onClick={this.handleOpen}>Change Profile Picture</Button>}
       open={this.state.modalOpen}
       onClose={this.handleClose}
       size="small"
     >
       <Header icon="browser" content="Change Profile Picutre" />
       <Modal.Content>
         <Modal.Description>
           <h3>New Profile Picutre:</h3>
           <Form onSubmit={this.handleChange}>
             <Input fluid name="picture" label="Picture URL" placeholder="Picture URL" />
             <Button type="submit" size="large" positive>Submit New Picutre</Button>
           </Form>
         </Modal.Description>
       </Modal.Content>
       <Modal.Actions>
         <Button color="green" onClick={this.handleClose} inverted>
           <Icon name="checkmark" /> Close
         </Button>
       </Modal.Actions>
     </Modal>
   );
 }
}
const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => {
  return {
    update: (id, changes) => {
      dispatch(updateUser(id, changes));
    }
  };
};
export default connect(mapState, mapDispatch)(ChangeImage);
