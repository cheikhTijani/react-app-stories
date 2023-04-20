import React from "react";
import { connect } from "react-redux";
import { fetchStories } from "../../actions";
import { Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


class StoryList extends React.Component {
    componentDidMount() {
        this.props.fetchStories();
    }

    renderAdmin(story) {
        if (story.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link style={{ background: 'none' }} to={`/stories/delete/${story.id}`} className="ui right floated icon button iconDel" title="Delete"><i className="trash icon"></i></Link>
                    <Link style={{ background: 'none' }} to={`/stories/edit/${story.id}`} className="ui right floated icon button iconEdit" title="Edit"><i className="edit icon"></i></Link>
                </div>
            );
        }
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div className="text-center shareBtn">
                    <Link to="/stories/new" className="ui button primary Btn">
                        Share A New Story
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.stories.slice(0).reverse().map(story => {
            return (
                <div className="item" key={story.id} style={{ padding: '10px 0' }}>
                    {this.renderAdmin(story)}
                    <div className="content">
                        <div className="header" style={{ marginBottom: 7 }}>
                            <h4 className="page-title-secondary">
                                <Link to={`/stories/${story.id}`}>{story.title}</Link>
                            </h4>
                        </div>
                        <div className="description">
                            {story.description.length > 85 ? story.description.slice(0, 85) + '...' : story.description}
                        </div>
                        <p style={{ textAlign: 'right' }}>
                            <small>
                                {story.firstName && 'By ' + story.firstName + ', '}
                                {story.createdAt && formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
                            </small>
                        </p>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="app-child">
                <h1 className="page-title">Stories</h1>
                <p className="text-center">Read fascinating stories and share your own</p>
                <h5 className="page-title-secondary">Latest Stories</h5>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stories: Object.values(state.stories),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}


export default connect(mapStateToProps, { fetchStories })(StoryList);