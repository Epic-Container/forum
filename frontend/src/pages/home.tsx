import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import Forum from '../components/forum';

interface Post {
    title: string,
    content: string,
    username: string,
    id: number
}
interface homeProps {
    token: string,
}
const Home: React.FC<homeProps> = ({ token }) => {
    const [post, setPosting] = useState<Post[]>([]);
    const [filteredData, setFilteredData] = useState(post);

    useEffect(()=>{
        fetchingData().then((data)=>{
            setPosting(data)
        })
    }, [])
    useEffect(()=>{
        setFilteredData(post)
    }, [post])
    return (
        <div className=''>
            <Navbar post={post} token={token} setFilteredData={setFilteredData} />
            <div className="mt-20 mx-5 p-2 flex flex-col flex-grow gap-4">
                {filteredData.map((post) => (
                    <Forum 
                        setFilteredData={setFilteredData}
                        id={post.id} 
                        token={token} 
                        username={post.username} 
                        title={post.title} 
                        mainContent={post.content}
                    />
                ))}
            </div>
        </div>
    );
};
async function fetchingData () {
    const response = await fetch('http://localhost:3211/blog');
    const users = await response.json();
    return users.data
}
export default Home;