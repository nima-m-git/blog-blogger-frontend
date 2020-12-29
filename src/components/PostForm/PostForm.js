import { useState } from 'react';
import './PostForm.scss';

const PostForm = ({ post = null, exitForm, action, deletePost }) => {
  const [data, setData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    published: post?.published || false,
  });

  const handleSubmit = async () => {
    await action(data);
    exitForm();
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <button className="exit-btn" onClick={exitForm}>
        x
      </button>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </label>
      <label>
        Content
        <textarea
          rows={5}
          name="content"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />
      </label>
      <label className="published">
        Published
        <input
          type="checkbox"
          name="published"
          checked={data.published}
          onChange={() => setData({ ...data, published: !data.published })}
        />
      </label>

      <div className="buttons-footer">
        <button type="submit" className="save">
          Save
        </button>
        {post?._id && (
          <button className="delete" onClick={() => deletePost(post)}>
            Delete
          </button>
        )}
      </div>

      {post?._id && (
        <div className="update-post-footer">
          <div>Comments: ({post.comment?.count})</div>
          <div className="dates secondary-bar">
            <div>Added: {post.timeCreated?.slice(0, 10)}</div>
            <div>Last Edited: {post.timeLastEdited?.slice(0, 10)}</div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PostForm;
