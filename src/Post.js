import { useState } from 'react';
import PostForm from './PostForm';

const Post = ({
  post,
  post: { title, id, content, author, comment, timeCreated, published },
  headers,
  updatePost,
  deletePost,
}) => {
  const [formActive, setFormActive] = useState(false);
  const update = (updatedPost) => updatePost(post, updatedPost);

  return (
    <div>
      <div className="post-tile" onClick={() => setFormActive(true)}>
        <h2 className="title">{title}</h2>
        <p className="content-short">{content[50]}</p>
        <h3 className="author">By {author}</h3>
        <div className="comments">Comments ({comment?.length || 0})</div>
        <div className="created">Created: {timeCreated}</div>
        <div className="published">
          {published ? 'Published' : 'Unpublished'}
        </div>
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
