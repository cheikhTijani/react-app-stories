import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import { connect } from "react-redux";

import Header from "./Header";

import StoryCreate from './stories/StoryCreate';
import StoryDelete from './stories/StoryDelete';
import StoryEdit from './stories/StoryEdit';
import StoryList from './stories/StoryList';
import StoryShow from './stories/StoryShow';

import '../style/App.css';
import Login from "./Login";


const App = ({ isSignedIn }) => {

    useEffect(() => {
    }, [isSignedIn])

    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={StoryList} />

                    <Route path="/login" component={Login} />

                    <Route path="/stories/new" component={isSignedIn ? StoryCreate : Login} />

                    <Route path="/stories/edit/:id" component={isSignedIn ? StoryEdit : Login} />

                    <Route path="/stories/delete/:id" component={isSignedIn ? StoryDelete : Login} />

                    <Route path="/stories/:id" component={isSignedIn ? StoryShow : Login} />

                </Switch>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(App);
