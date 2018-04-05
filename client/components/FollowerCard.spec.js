/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mockAxios } from './index.spec';
import configureMockStore from 'redux-mock-store';
import { spy } from 'sinon';
import { Card, Button, Image } from 'semantic-ui-react';
import { FollowerCard } from './FollowerCard';



// const adapter = new Adapter();
// enzyme.configure({ adapter });
const mockStore = configureMockStore();

describe('FollowerCard', () => {
  let followerCard, fakeProps, store, mockedEvt;
  const fakeUser = {
    email: 'patrick.gund@gmail.com',
    name: 'Patrick',
    image: 'http://www.placecage.com/500/500',
    googleId: '107935033037182048475',
    id: 1,
    isAdmin: true,
    password: null,
    salt: null,
    createdAt: '2017-11-07T02:24:11.969Z',
    updatedAt: '2017-11-07T02:24:11.969Z',
  };
  const fakeSug = {
    email: 'matthew.thor@gmail.com',
    name: 'Matt',
    image: 'http://www.placecage.com/500/500',
    googleId: '107935033037182048478',
    id: 5,
    isAdmin: true,
    password: null,
    salt: null,
    createdAt: '2017-11-07T02:24:11.969Z',
    updatedAt: '2017-11-07T02:24:11.969Z',
  };

  const state = {
    user: fakeUser,
    sug: fakeSug,
  };

  //   const dispatchMock = createMockDispatch();


  beforeEach(() => {
    store = mockStore(state);
    mockedEvt = { preventDefault () {} };
    fakeProps = {
      user: fakeUser,
      sug: fakeSug,
      updateCardStatus: spy(),
      store,
    };
    followerCard = shallow(<FollowerCard {...fakeProps} />);
  });

  afterEach( () => {
    mockAxios.reset();
    store.clearActions();
  });

  it('can approve a new follower recommendation', () => {
    const spy = fakeProps.updateCardStatus;
    followerCard.dive().find(Button).first()
      .simulate('click', mockedEvt)
    expect(spy.called).to.be.equal(true);
  });

  xit('second test', () => {
    // addOrUpdate(mockedEvt, fakeProduct, emptyCart, 0, fakeUser, fakeSess, dispatchMock.dispatch);
    // expect(dispatchMock.getActions()[0].toString()).to.equal(addCart().toString());
  });
});/* global describe beforeEach it */
