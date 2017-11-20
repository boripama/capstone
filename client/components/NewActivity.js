import React from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Form,
  Input,
} from 'semantic-ui-react';
import { uploadFileRequest } from '../store';
import { connect } from 'react-redux';

class NewActivity extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { modalOpen: false };
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

 handleUpload = event => {
   this.props.handleFileUpload(event, this.props.props.id);
   this.handleClose();
 };

 render() {
   return (
     <Modal
       trigger={<Button onClick={this.handleOpen}>Upload .gpx Files</Button>}
       open={this.state.modalOpen}
       onClose={this.handleClose}
       size="small"
     >
       <Header icon="browser" content="Add Activity Data" />
       <Modal.Content>
         <Modal.Description>
           <h3>New Activity Info:</h3>
           <Form onSubmit={this.handleUpload}>
             <Input fluid name="title" label="Title" placeholder="Activity Title" />
             <h3>Upload Your .gpx File:</h3>
             <Input fluid name="gpx"><input type="file" /></Input>
             <Button type="submit" size="large" positive>Submit Activity</Button>
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
const mapState = null;

const mapDispatch = dispatch => {
  return {
    handleFileUpload: (event, userId) => {
      const file = event.target.gpx.files[0];
      const title = event.target.title.value;
      dispatch(uploadFileRequest(file, userId, title));
    }
  };
};
export default connect(mapState, mapDispatch)(NewActivity);
