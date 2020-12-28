import { useEffect, useState } from "react";

import FilterBar from './FilterBar';
import Post from './Post';
import PostForm from './PostForm';

const Menu = ({ token, username, }) => {
    const [filter, setFilter] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [formActive, setFormActive] = useState(false);
    const headers = {
        'Authorization': `Bearer ${token}`,
    }

    const filterPosts = () => {
      let filtered = [...posts];
  
      if (filter.viewAll === false || !filter) {
        filtered = [];
      } else {
  
        if (filter.usersPosts === true) {
          filtered = filtered.filter(post => post.author === username);
        } else if (filter.userPosts === false) {
          filtered = filtered.filter(post => post.author !== username);
        }
  
        if (filter.published === true) {
          filtered = filtered.filter(post => post.published);
        } else if (filter.published === false) {
          filtered = filtered.filter(post => !post.published)
        }
      }
      return filtered
    }

    const newPost = (post) => {
        fetch(`${process.env.BE_URL}/posts/`, {
            method: 'POST',
            body: post,
            headers,
        })
        .then(res => res.json())
        .then(result => setMessage(result.message),
        (error) => setMessage(error.message))
    }
  
    
    useEffect(() => {
      fetch(`${process.env.BE_URL}/posts`)
        .then(res => res.json())
        .then((result) => {
          setIsLoaded(true);
          setPosts(result)
        }, (error) => {
            setIsLoaded(true);
            setError(error)
          }
        )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>
      } else if (!isLoaded) {
        return <div>Loading...</div>
      } else {
    
        return (
          <div>
            <button onClick={() => setFormActive(true)}>New Post</button>
            <FilterBar {...setFilter}/>
            <div className='posts-container'>
              {filterPosts().map(post => 
                <Post {...post}/>)}
            </div>
            { formActive && 
                <PostForm 
                    exitForm={() => setFormActive(false)} 
                    action={newPost} 
                    {...headers}/>
            }
            { message &&
                <div className='message'>{message}</div>
            }
          </div>
        )
    }
}

export default Menu