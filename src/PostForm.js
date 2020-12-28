import { useState } from "react"

const PostForm = ({ post, exitForm, action, headers, }) => {
    const [message, setMessage] = useState(null);
    const [data, setData] = useState({
        title: post?.title || '',
        content: post?.content || '',
        published: post?.published || false,
    });

    const handleSubmit = async () => {
        await action(data);
        exitForm();
    }

    const deletePost = () => {
        fetch(`${process.env.BE_DB}/posts/${post.id}`, {
            method: 'DELETE',
            headers,
        })
            .then(res => res.json())
            .then(result => setMessage(result.message),
                (error) => setMessage(error.message)
            ); 
    }
    
    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <label>
                Title: 
                <input 
                    type='text' 
                    name='title' 
                    value={data.title} 
                    onChange={(e) => setData({ ...data, title: e.target.value })}/>
            </label>
            <label>
                Content: 
                <input 
                    type='textarea' 
                    name='content'
                    value={data.content} 
                    onChange={(e) => setData({ ...data, content: e.target.value })} />
            </label>
            <label>
                Published: 
                <input 
                    type='checkbox'
                    name='published'
                    checked={data.published}
                    onChange={() => setData({ ...data, published: !data.published })} />
            </label>
            <button type='submit'>Save</button>
            { post?.id &&
                <div className='update-post-footer'>
                    <div>Comments: ({post.comment.count})</div>
                    <div>Added: {post.timeCreated}</div>
                    <div>Last Edited: {post.timeLastEdited}</div>
                    <button onClick={deletePost}>Delete</button>
                </div> 
            }
            { message &&
                <div className='message'>{message}</div>
            }
            <button className='exit-btn' onClick={exitForm}>x</button>
        </form>
    )
}

export default PostForm