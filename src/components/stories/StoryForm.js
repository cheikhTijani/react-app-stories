import React from "react";
import { Field, reduxForm } from "redux-form";

class StoryForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    {error}
                </div>
            )
        }
    }

    renderInput = ({ input, type, meta, placeholder }) => {
        return (
            <div className="field">
                <input {...input} type={type} autoComplete="off" placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        );
    }

    renderText = ({ input, meta, placeholder }) => {
        return (
            <div className="field">
                <textarea {...input} rows="15" placeholder={placeholder}></textarea>
                {this.renderError(meta)}
            </div>
        );
    }


    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="ui form error"

                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >

                <Field name="title" component={this.renderInput} placeholder="Story title" />

                <Field name="description" component={this.renderText} placeholder="Story Content" />

                <div style={{ textAlign: 'center', marginTop: 25 }}>
                    <button className="ui primary button Btn">{this.props.action}</button>
                </div>
                <br />
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Story title is required';
    } else if (formValues.title.trim() === '') {
        errors.title = 'Story title cannot be empty';
    }

    if (!formValues.description) {
        errors.description = 'Story content is required';
    } else if (formValues.description.trim() === '') {
        errors.description = 'Story content cannot be empty';
    }

    return errors;
}

export default reduxForm({
    form: 'StoryForm',
    validate
})(StoryForm);
