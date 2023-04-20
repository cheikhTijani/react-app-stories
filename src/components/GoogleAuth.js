import React from "react";
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";


class GoogleAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    onAuthChange = (status) => {
        if (status && sessionStorage.getItem("token")) {
            this.props.signIn(JSON.parse(sessionStorage.getItem("token")));
        } else {
            this.props.signOut();
        }
    }

    handleSignOut = () => {
        this.setState({ user: {} });
        document.getElementById('signIn').hidden = false;
        sessionStorage.removeItem("token");
        this.onAuthChange(false);
        this.initGoogle()
    }

    handleCallbackResponse = (response) => {
        const userObject = jwt_decode(response.credential);
        this.setState({ user: userObject });
        document.getElementById('signIn').hidden = true;

        sessionStorage.setItem("token", JSON.stringify(userObject));
        this.onAuthChange(true);
    }

    initGoogle() {
        window.google?.accounts.id.initialize({
            client_id: process.env.REACT_APP_google_api_key,
            callback: this.handleCallbackResponse

        });

        window.google?.accounts.id.renderButton(
            document.getElementById('signIn'),
            { theme: 'outline', size: 'large' }
        );

        window.google?.accounts.id.prompt();
    }

    componentDidMount() {
        this.initGoogle();
        if (sessionStorage.getItem("token") !== null) {
            const userObject = JSON.parse(sessionStorage.getItem("token"));
            this.setState({ user: userObject });
            document.getElementById('signIn').hidden = true;
        } else {
            this.initGoogle();
        }
    }

    render() {
        return (
            <>
                {Object.keys(this.state.user).length !== 0 &&
                    (
                        <Link to="/stories/new" className="item font" >New Story</Link>
                    )
                }
                <div className="item">
                    <div id="signIn"></div>
                    {Object.keys(this.state.user).length !== 0 && (
                        <div>
                            <i>Signed in as</i>
                            &nbsp; &nbsp;
                            <b><i>{`${this.state.user.email ? this.state.user.email : JSON.parse(sessionStorage.getItem('token'))?.email}`.split('@')[0]}</i></b>
                            &nbsp; &nbsp;
                            <button className="ui red button" onClick={this.handleSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
