import React from "react";
import jwt_decode from 'jwt-decode';
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
        sessionStorage.removeItem("token");
        this.onAuthChange(false);
        this.setState({ user: {} });
        window.location.reload();
    }

    handleCallbackResponse = (response) => {
        const userObject = jwt_decode(response.credential);
        this.setState({ user: userObject });

        sessionStorage.setItem("token", JSON.stringify(userObject));
        this.onAuthChange(true);
    }

    componentDidMount() {
        window.google?.accounts.id.initialize({
            client_id: process.env.REACT_APP_google_api_key,
            callback: this.handleCallbackResponse

        });

        window.google?.accounts.id.renderButton(
            document.getElementById('signIn'),
            { theme: 'outline', size: 'large' }
        );
    }

    render() {
        return (
            <>
                <div className="item">
                    {!this.props.isSignedIn && (
                        <div id="signIn"></div>
                    )}
                    {((Object.keys(this.state.user).length !== 0) || this.props.isSignedIn) && (
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
