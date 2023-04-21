import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { fetchStory, deleteStory } from "../../actions";
import { Link } from "react-router-dom";
import history from "../../history";


class StoryDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStory(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <>
                <button onClick={() => this.props.deleteStory(id)} className="ui red button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </>
        );
    }

    render() {
        return (
            <Modal
                title="Delete Story"
                content={`Are you sure you want to delete this story ${this.props.story?.title}?`}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }


}

const mapStateToProps = (state, ownProps) => {
    return { story: state.stories[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStory, deleteStory })(StoryDelete);