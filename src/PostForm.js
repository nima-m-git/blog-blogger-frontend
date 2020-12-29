import { useState } from 'react';

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
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </label>
      <label>
        Content:
        <input
          type="textarea"
          name="content"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />
      </label>
      <label>
        Published:
        <input
          type="checkbox"
          name="published"
          checked={data.published}
          onChange={() => setData({ ...data, published: !data.published })}
        />
      </label>
      <button type="submit">Save</button>
      {post?._id && (
        <div className="update-post-footer">
          <div>Comments: ({post.comment?.count})</div>
          <div>Added: {post.timeCreated}</div>
          <div>Last Edited: {post.timeLastEdited}</div>
          <button onClick={() => deletePost(post)}>Delete</button>
        </div>
      )}
      <button className="exit-btn" onClick={exitForm}>
        x
      </button>
    </form>
  );
};

export default PostForm;
