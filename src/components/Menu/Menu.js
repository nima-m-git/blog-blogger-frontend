import { useEffect, useState } from 'react';

import { Post, PostForm, FilterBar } from '../index';
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

  const getPosts = () => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts`)
      .then((res) => res.json())
      .then(
        (result) => {
          setPosts(result.posts);
          setIsLoaded(true);
        },
        (error) => {
          console.log(error);
          setErrors([error]);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className="container">
        {errors?.length > 0 && (
          <div className="errors">
            Errors:{' '}
            {errors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </div>
        )}
        {message?.length > 0 && <div className="message">{message}</div>}

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
    );
  }
};

export default Menu;
