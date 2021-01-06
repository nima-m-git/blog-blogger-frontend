import { useState } from 'react';
import { PostForm } from 'components/index';
import CommentBox from './CommentBox';
import './Post.scss';

const Post = ({
  post,
  post: { title, content, author, comments, published },
  updatePost,
  deletePost,
  deleteComment,
}) => {
  const [formActive, setFormActive] = useState(false);
  const [commentBox, setCommentBox] = useState(false);
  const update = (updatedPost) => updatePost(post, updatedPost);

  return (
    <div className="post-tile">
      <h2 className="title" onClick={() => setFormActive(true)}>
        {title}
      </h2>
      <h3 className="author">By {author.username}</h3>
      <p className="content-short">{content.slice(0, 50)}...</p>
      <div className="secondary-bar">
        <div className="published">
          {published ? 'Published' : 'Unpublished'}
        </div>
        <div className="comments" onClick={() => setCommentBox(true)}>
          Comments ({comments?.length || 0})
        </div>
      </div>
      <div className="dates secondary-bar">
        <div>Added: {post.timeCreated?.slice(0, 10)}</div>
        <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
      </div>

      {commentBox && (
        <CommentBox
          {...{ comments }}
          exit={setCommentBox.bind(false)}
          {...{ deleteComment }}
        />
      )}

      {formActive && (
        <PostForm
          post={post}
          exitForm={setFormActive.bind(false)}
          {...{ deletePost }}
          action={update}
        />
      )}
    </div>
  );
};

export default Post;
