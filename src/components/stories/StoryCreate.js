import React from "react";
import { connect } from "react-redux";
import { createStory } from "../../actions";
import StoryForm from "./StoryForm";

class StoryCreate extends React.Component {

    onSubmit = (formValues) => {
        const formData = {
            title: formValues.title.trim(),
            description: formValues.description.trim(),
            createdAt: new Date()
        }
        this.props.createStory(formData);
    }

    render() {
        return (
            <div className="app-child" >
                <h3 className="page-title">Share a Story</h3>
                <StoryForm onSubmit={this.onSubmit} action="Share" />
            </div>
        );
    }
}

export default connect(null, { createStory })(StoryCreate);