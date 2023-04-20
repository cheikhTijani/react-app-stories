import React from "react";
import { connect } from "react-redux";
import { fetchStory, editStory } from "../../actions";
import StoryForm from "./StoryForm";
import _ from "lodash";


class StoryEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStory(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStory(this.props.match.params.id, formValues)
    }

    render() {
        if (this.props.story) {
            return (
                <div className="app-child">
                    <h3 className="page-title">Update a Story</h3>
                    <StoryForm initialValues={_.pick(this.props.story, 'title', 'description')} onSubmit={this.onSubmit} action="Update" />
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return { story: state.stories[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStory, editStory })(StoryEdit);