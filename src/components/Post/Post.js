import { useState } from 'react';
import { PostForm } from '../index';
import './Post.scss';

const Post = ({
  post,
  post: { title, content, author, comment, published },
  updatePost,
  deletePost,
}) => {
  const [formActive, setFormActive] = useState(false);
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
        <a
          href={`${process.env.REACT_APP_BE_URL}/posts/${post._id}`}
          target="blank"
          className="comments"
        >
          Comments ({comment?.length || 0})
        </a>
      </div>
      <div className="dates secondary-bar">
        <div>Added: {post.timeCreated?.slice(0, 10)}</div>
        <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
      </div>

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
