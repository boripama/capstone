import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const MyLoader = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader content='Loading' />
      </Dimmer>

      <Image src='/assets/images/wireframe/short-paragraph.png' />
    </Segment>
  </div>
);

export default MyLoader;