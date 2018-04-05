/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import { mockAxios } from '../components/index.spec';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { newActivity, fetchActivity, removeActivity } from '../../client/store';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);


describe('action creators', () => {
  let act;
  let store;

  const initialState = { activity: {} };

  beforeEach(() => {
    act = {
      id: 1,
      title:	'20110711 - 230810 - Run',
      distance:	7.066065051055687,
      polyline:	'ddrxOgcl_Gr@H_@rDAFAh@@DGd@?L?f@?DBh@AZAh@@LAb@AF@b@?R?h@?TFb@Cd@?D@b@?F@b@?F?b@ALGZDd@@d@FJF?V?H?p@DH?n@@d@BT@j@@n@Bl@Br@BT?l@Br@Br@Br@BH?r@Br@Br@@f@@r@B^@t@@R?r@@J?t@?R?r@@J?r@@R?r@@r@Br@?H?p@BT?r@@J?p@@R?r@BP@p@?f@?p@@J@l@Br@@L?j@@p@@R?p@@HAn@At@Bt@?T@r@@T?t@@v@?T@t@BJ?v@?T?h@@F?t@@H?t@@P?v@FJ?T?\@^?T@r@?\?r@Br@Ap@@J?t@@T@v@BJ?t@?v@BR?T@^?^@`@@H?f@@H?t@@t@?F?t@@H?t@?R?v@BJ?R?h@@t@Bp@?p@@r@?F?p@@p@@T?v@DT?x@BH?v@DL@H?x@?J?v@?l@@t@?T?r@@H?r@@J@p@@R?n@?t@@H?t@@H?r@@^?lABH?t@BT?r@@R?t@@H?v@@J?t@@`@@r@@`@?X@v@@J?x@BJ@v@@V@H?v@?J@t@@V?t@BR@v@@V?r@@T@v@BH?H?t@@t@BR?t@?H?x@Ar@@H?v@BT?v@BR?t@@^@t@?J@T?h@@n@@v@@H?t@@H?v@DT?t@BT@n@AR?p@?FEAW@k@@Q@c@?SAI?a@Ba@AQ?e@?Q@G@YAa@@c@BW?k@@I@k@?W?Q@i@?Q?Y@G@i@?G@c@?Q?c@@Y?a@JMEe@K]?O?E?Y?]@i@?I@]?E@a@?G?a@?GAi@?i@AG@U?O?O?_@Ae@?GAg@?G?g@?GAg@?OCe@?IAe@AO?g@?MEi@?g@?i@?I@G?W?G?g@?Q?a@?Y@g@@GA_@@e@Ai@?I?U?O?WAW@g@?i@@k@?GCg@?GA[AU@k@?O?O@WAi@AGCi@?G@g@?G?Q@]AY?O@g@AGAc@AG?i@?g@?G?c@@GCG?MAc@@G?e@?_@@g@?G?e@BQBe@AECe@?]?e@AY?a@?G?i@?IAG?O@M?e@?GAi@@G@g@?OA[Ai@?G?g@@_@?G?U?O?g@?G@g@@I?Q@i@Cg@@G?I?a@Ai@?Q?i@?OA_@EEa@Cq@AK?I?q@CKAo@AIAK?o@CIAo@Ay@GKAw@Aw@Ey@AK?a@Aa@AY?_@Aw@AU?a@?y@?a@?w@?K?_@AKAUAU?UAWAa@?U?U@UAUASAg@?w@?a@AUAi@?K?IAk@C{@AIAIAa@?y@?_@EE@[?UAw@?m@DIAw@CK?a@AU?a@AK?o@Cy@@K?c@?U?y@AI?y@Aw@AU?W?s@AK?u@EK?m@Aw@Cy@?M?o@AMAIAe@AK?c@Cy@CUAc@?u@?K?a@AK?w@AU?K?_@Au@Am@?u@AKAu@Cu@Aw@Ak@As@AK?w@?u@@KA_@Aw@Ac@AU@UAa@AI?i@CIAUAI?u@?s@As@?u@?s@Ca@Ci@As@Bs@CI?w@Ei@AK?i@?KA_@AUAKAWA_@CUAU?i@?W?S?MAq@?IAK@WCUAc@CIA_@CK@a@E_@FM@I@S@K?U@S?m@CI?U?a@@u@Ce@?s@Dc@A{@CWBa@?YAa@AI?M?_@CS?WAK?c@?WAk@?KAe@@m@AK?k@CYAa@CK?w@Ao@AIAGAMAWAKAy@CIAKAm@?a@AU?_@AU?k@?S?U@K?S?UCUAa@AK?I?K?c@Aa@Au@@k@AI?m@@a@@KAg@AMAw@C_@?U?g@?a@?s@@s@CG?]@U?u@AKAs@CK?g@BOR@F@h@Ah@AFCNOJa@JOH?VD^AN?V@VAh@?NBN@h@?FAj@@NAR@V@DBd@?FAh@AFCh@?NDd@?FAf@?F?f@?F?h@AHCh@@H@f@AF?`@?h@?F?^@P?V?P@F@^Cf@@FAf@?j@?F@d@?d@@DA\Aj@?N@f@?F?F@b@Ah@@f@?f@?F@b@?D@f@AFAf@@d@?F?h@?F?f@?f@?FAd@Af@?F?PALN~A@T?RAF?X?X?X?V?HAh@Ah@?F?`@?F?^@V@d@@L?`@A^C^@DBf@?DAd@?FAf@?h@AF?\@FAb@DT?b@?h@GJ]J_@LGDIDi@ZGFUZINCHAV?HAF@X?LAV?D',
      startTime:	'2011-07-11 18:08:10-05',
      endTime:	'2011-07-11 18:50:52-05',
      duration:	2562,
      cached:	true,
      center:	'{-88.0995026296297112, 42.0161661234567987}',
      createdAt:	'2017-11-30 20:22:19.782-06',
      updatedAt:	'2017-11-30 20:24:56.787-06',
      userId:	1
    };
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  describe('New Activity', () => {
    it('creates a new activity', () => {
      expect(newActivity(act).activity).to.deep.equal(act);
      expect(newActivity(act).type).to.equal('NEW_ACTIVITY');
    });
  });
  describe('Fetch Activity', () => {
    it('fetches and returns an activity', () => {
      mockAxios.onGet(`/api/activities/1`).replyOnce(200, act);
      return store.dispatch(fetchActivity(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_ACTIVITY');
          expect(actions[0].activity).to.be.deep.equal(act);
        });
    });
  });
  describe('Remove Activity', () => {
    it('removes an activity from the list', () => {
      expect(removeActivity().type).to.deep.equal('REMOVE_ACTIVITY');
      expect(store.getState()).to.deep.equal({activity: {}});

    })
  })
});
