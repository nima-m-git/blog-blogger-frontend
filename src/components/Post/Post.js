import { useState } from 'react';
import { PostForm } from '../index';
import './Post.scss';

const Post = ({
  post,
  post: { title, content, author, comment, timeCreated, published },
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
      <p className="content-short">{content.slice(0, 50)}...</p>
      <h3 className="author">By {author.username}</h3>
      <div className="comments">Comments ({comment?.length || 0})</div>
      <div className="created">Created: {timeCreated}</div>
      <div className="published">{published ? 'Published' : 'Unpublished'}</div>

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
