import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import Header from "./Header";

import history from "../history";

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
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={StoryList} />
                        <Route path="/login" component={Login} />
                        {/* {!isSignedIn && (
                            <Redirect to="/" />
                        )} */}
                        {isSignedIn && (
                            <Route path="/stories">
                                <Switch>
                                    <Route path="/stories/new" component={StoryCreate} />
                                    <Route path="/stories/edit/:id" component={StoryEdit} />
                                    <Route path="/stories/delete/:id" component={StoryDelete} />
                                    <Route path="/stories/:id" component={StoryShow} />
                                </Switch>
                            </Route>
                        )}
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps)(App);
