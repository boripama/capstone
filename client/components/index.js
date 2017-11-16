/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './Main';
export {default as UserHome} from './UserHome';
export {default as UploadActivity} from './UploadActivity';
export {default as SingleActivity} from './SingleActivity';
export {default as AllActivities} from './AllActivities';
export {default as Navbar} from './Navbar';
export {Login, Signup} from './AuthForm';

