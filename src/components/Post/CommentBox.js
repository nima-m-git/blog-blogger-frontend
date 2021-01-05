const CommentBox = ({ comments, exit, deleteComment }) => {
  return (
    <div className="comment-box">
      <div className="exit-btn" onClick={() => exit()}>
        x
      </div>
      {comments.map(
        ({ content, timeCreated, author: { username }, post, _id }, i) => (
          <div className="comment" key={i}>
            <button
              className="delete-btn"
              onClick={() => deleteComment(_id, post)}
            >
              DEL
            </button>
            <div className="comment-content">{content}</div>
            <div className="secondary-bar footer">
              <div className="author">By: {username}</div>
              <div className="dates">Posted {timeCreated}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CommentBox;
