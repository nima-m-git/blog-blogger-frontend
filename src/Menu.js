import { useEffect, useState } from "react";

import FilterBar from './FilterBar';
import Post from './Post';
import PostForm from './PostForm';

const Menu = ({ token, username, }) => {
    const [filters, setFilters] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formActive, setFormActive] = useState(false);

    // console.log(filters)

    const headers = {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
    }

    const filterPosts = () => {
      let filtered = [...posts];
  
      if (!filters || filters.viewAll === false) {
        filtered = [];
      } else {
  
        if (filters.usersPosts === true) {
          filtered = filtered.filter(post => post.author === username);
        } else if (filters.userPosts === false) {
          filtered = filtered.filter(post => post.author !== username);
        }
  
        if (filters.published === true) {
          filtered = filtered.filter(post => post.published);
        } else if (filters.published === false) {
          filtered = filtered.filter(post => !post.published)
        }
      }
      return filtered
    }

    const newPost = (post) => {
        fetch(`${process.env.REACT_APP_BE_URL}/posts/`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers,
        })
        .then(res => res.json())
        .then(result => setMessage(result.message),
        (error) => setMessage(error.message))
    }

    const updatePost = (post, updates) => {
        const newPost = JSON.stringify({ ...post, ...updates });
        fetch(`${process.env.REACT_APP_BE_URL}/posts/${post._id}`, {
            method: 'PUT',
            body: newPost,
            headers,
        })
        .then(res => res.json())
        .then(result => setMessage(result.message),
        (error) => setMessage(error.message))
        .then(() => getPosts())
    }

    const getPosts = () => {
        fetch(`${process.env.REACT_APP_BE_URL}/posts`)
        .then(res => res.json())
        .then((result) => {
          setPosts(result.posts)
          setIsLoaded(true);
        }, (error) => {
            setError(error)
            setIsLoaded(true);
          }
        )

        console.log('getting posts')
    }
    
    useEffect(() => {
        getPosts();
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>
      } else if (!isLoaded) {
        return <div>Loading...</div>
      } else {
        return (
          <div className='container'>
            <button onClick={() => setFormActive(true)}>New Post</button>
            <FilterBar {...{setFilters}} {...{filters}}/>
            <div className='posts-container'>
              {filterPosts().map(post => 
                <Post {...{post}} {...{headers}} {...{updatePost}} {...{getPosts}} key={post._id}/>)}
            </div>
            { formActive && 
                <PostForm 
                    exitForm={() => setFormActive(false)} 
                    action={newPost} 
                    {...{headers}}/>
            }
            { message &&
                <div className='message'>{message}</div>
            }
          </div>
        )
    }
}

export default Menu