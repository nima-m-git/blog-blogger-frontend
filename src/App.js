import { useEffect, useState } from 'react';
import './App.css';

const BEURL = 'https://still-eyrie-61337.herokuapp.com';

const App = () => {
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`${BEURL}/posts`)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setPosts(result)
      },
      (error) => {
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
        <FilterBar {...setFilter}/>
        <div className='posts-container'>
          {posts.filter(FILTERHERE).map(post => 
            <Post {...filteredPosts || posts}/>)}
        </div>

      </div>
    )
  }



}


export default App;
