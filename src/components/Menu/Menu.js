import { useEffect, useState } from 'react';

import { Post, PostForm, FilterBar } from '../index';

const Menu = ({ token, username }) => {
  const [filters, setFilters] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);
  const [formActive, setFormActive] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  };

  const filterPosts = () => {
    let filtered = [...posts];

    if (!filters || filters.viewAll === false) {
      filtered = [];
    } else {
      if (filters.usersPosts === true) {
        filtered = filtered.filter((post) => post.author === username);
      } else if (filters.userPosts === false) {
        filtered = filtered.filter((post) => post.author !== username);
      }

      if (filters.published === true) {
        filtered = filtered.filter((post) => post.published);
      } else if (filters.published === false) {
        filtered = filtered.filter((post) => !post.published);
      }
    }
    return filtered;
  };

  const newPost = (post) => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers,
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage(result?.message);

        const errors = result?.errors;
        if (errors !== undefined) {
          setErrors(errors.map((err) => err.msg));
          console.log({ errors });
        }
        getPosts();
      });
  };

  const updatePost = (post, updates) => {
    const newPost = JSON.stringify({ ...post, ...updates });
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
      method: 'PUT',
      body: newPost,
      headers,
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage(result?.message);

        const errors = result?.errors;
        if (errors !== undefined) {
          setErrors(errors.map((err) => err.msg));
          console.log({ errors });
        }
        getPosts();
      });
  };

  const deletePost = (post) => {
    fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
      method: 'DELETE',
      headers,
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage(result?.message);

        const errors = result?.errors;
        if (errors !== undefined) {
          setErrors(errors.map((err) => err.msg));
          console.log({ errors });
        }
        getPosts();
      });
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

        <button onClick={() => setFormActive(true)}>New Post</button>
        <FilterBar {...{ setFilters }} {...{ filters }} />
        <div className="posts-container">
          {filterPosts().map((post) => (
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
        {message && <div className="message">{message}</div>}
      </div>
    );
  }
};

export default Menu;
