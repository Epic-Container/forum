import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface postModalProps {
    token: string,
}
const PostModal: React.FC<postModalProps> = ({ token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    function validate(title: string, content: string) {
        if (title.length > 0 && content.length > 0) {
            return true
        } else {
            return false
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!validate(title, content)) setError('Please fill in all fields')
        event.preventDefault();
        // Logika untuk mengirim data ke backend atau memprosesnya
        setError('')
        if (!token || token.length === 0) {
            setError('Please sign in')
            return;
        }
        let like = {
            "like":[],
            "dislike": []
        }
        await fetch(`http://localhost:3211/post/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content, like })
        });

        // Reset form setelah submit
        setTitle('');
        setContent('');
        navigate('/Home')
    };

    return (
        <form onSubmit={handleSubmit} className='max-h-screen m-5 flex flex-col gap-5'>
            <div>
                <h1>Title</h1>
                <input
                    type="text"
                    className='input input-ghost-primary input-block'
                    placeholder='Title'
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <h1>Description</h1>
                <textarea
                    className="textarea-ghost-primary textarea textarea-block"
                    placeholder="Description"
                    value={content}
                    onChange={handleDescriptionChange}
                />
            </div>
            {<h1 className='text-red-600'>{error}</h1>}
            <div>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </div>
        </form>
    );
};

export default PostModal;