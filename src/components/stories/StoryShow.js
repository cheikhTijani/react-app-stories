import React from "react";
import { connect } from "react-redux";
import { fetchStory } from "../../actions";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

class StoryShow extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStory(id);
    }


    render() {
        if (this.props.story) {
            const { title, description } = this.props.story;
            return (
                <div className="app-child">
                    <h2 className="page-title">{title}</h2>
                    <p>{description}</p>
                    <p style={{ textAlign: 'right' }}>
                        <small>
                            {this.props.story.firstName && 'By ' + this.props.story.firstName + ', '}
                            {this.props.story.createdAt && formatDistanceToNow(new Date(this.props.story.createdAt), { addSuffix: true })}
                        </small>
                    </p>
                </div>
            );
        }
        else return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return { story: state.stories[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStory })(StoryShow);