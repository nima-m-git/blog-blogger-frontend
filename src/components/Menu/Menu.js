import { useEffect, useState } from 'react';

import { Post, PostForm, FilterBar, LoaderSpinner } from 'components/index';
import './Menu.scss';

const Menu = ({ token, username }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const [formActive, setFormActive] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  };

  const handleResult = (result) => {
    setMessage(result?.message);
    // Set error(s) in array
    setErrors(
      result?.errors
        ? result.errors.map((err) => err.msg)
        : result?.err
        ? [result.err]
        : []
    );
    getPosts();
  };

  const newPost = (post) => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));
  };

  const updatePost = (post, updates) => {
    const newPost = JSON.stringify({ ...post, ...updates });
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
      method: 'PUT',
      body: newPost,
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));
  };

  const deletePost = (post) => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
      method: 'DELETE',
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));
  };

  const deleteComment = (id, post) => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then((res) => res.json())
      .then((result) => handleResult(result));
  };

  const getPosts = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPosts(
            result.posts.sort((a, b) =>
              a.timeCreated > b.timeCreated ? -1 : 1
            )
          );
          setIsLoaded(true);
        },
        (error) => {
          setErrors([error]);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <div className="container">
          <div className="message-container">
            {errors?.length > 0 && (
              <div className="errors">
                <h4 className="err-title">Errors: </h4>
                {errors.map((error, i) => (
                  <div key={i}>- {error}</div>
                ))}
                <div className="ok-btn">
                  <button onClick={() => setErrors([])}>OK</button>
                </div>
              </div>
            )}
            {message?.length > 0 && (
              <div className="message">
                {message}
                <div className="ok-btn">
                  <button onClick={() => setMessage(null)}>OK</button>
                </div>
              </div>
            )}
          </div>

          <div className="head-bar">
            <button className="new-btn" onClick={() => setFormActive(true)}>
              New Post
            </button>
            <FilterBar
              {...{ setFilteredPosts }}
              {...{ posts }}
              {...{ username }}
            />
          </div>

          <div className="posts-container">
            {filteredPosts.map((post) => (
              <Post
                {...{ post }}
                {...{ headers }}
                {...{ updatePost }}
                {...{ getPosts }}
                {...{ deletePost }}
                {...{ deleteComment }}
                key={post._id}
              />
            ))}
          </div>

          {formActive && (
            <PostForm
              exitForm={() => setFormActive(false)}
              action={newPost}
              {...{ headers }}
            />
          )}
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </div>
  );
};

export default Menu;
