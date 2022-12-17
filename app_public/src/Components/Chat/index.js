import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import PrivateRoute from '../../PrivateRoute';

import KitchenSinkApp from '../../Components/KitchenSinkApp';
import HomePage from '../../Components/HomePage';

import * as actions from '../../store/action';

import {
    CometChatUI,
    CometChatConversationList,
    CometChatConversationListWithMessages,
    CometChatUserList,
    CometChatUserListWithMessages,
    CometChatGroupList,
    CometChatGroupListWithMessages,
    CometChatMessages
} from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';

import {
    wrapperStyle
} from "./style";

const history = createBrowserHistory();

class Chat extends React.Component {
    state = {
        isLoggedin: false
    }

    

    render() {

        return (
            <div css={wrapperStyle()}>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute path="/embedded-app" component={CometChatUI} />
                        <PrivateRoute path="/conversations" component={CometChatConversationListWithMessages} />
                        <PrivateRoute path="/groups" component={CometChatGroupListWithMessages} />
                        <PrivateRoute path="/users" component={CometChatUserListWithMessages} />
                        <PrivateRoute path="/conversation-list" component={CometChatConversationList} />
                        <PrivateRoute path="/group-list" component={CometChatGroupList} />
                        <PrivateRoute path="/user-list" component={CometChatUserList} />
                        <PrivateRoute path="/messages" component={CometChatMessages} chatWithGroup="supergroup" />
                        <PrivateRoute exact path="/chathome" component={HomePage} />
                        <Route path="/loginchat" component={KitchenSinkApp} />
                    </Switch>
                </Router>
            </div>
        );
    }
}



export default Chat;
