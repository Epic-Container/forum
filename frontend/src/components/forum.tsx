import React, { useEffect, useState, useRef } from "react";

interface ForumProps {
    title: string,
    mainContent: string,
    username: string,
    id: number,
    token: string,
    setFilteredData: (data: Array<{ title: string, content: string, username: string, id: number }>) => void,
}

interface RatingType {
    content: string,
    username: string,
    title: string,
    rating: { like: string[], dislike: string[] },
    id: number,
}

interface User {
    username: string,
    token: string
}

const Forum: React.FC<ForumProps> = ({ title, token, mainContent, username, id, setFilteredData }) => {
    const [blog, setBlog] = useState<RatingType[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [likeButton, setLikeButton] = useState(false);
    const [dislikeButton, setDislikeButton] = useState(false);
    const [likeValue, setLikeValue] = useState(0);
    const [dislikeValue, setDislikeValue] = useState(0);
    const [changed, setChanged] = useState(false);  // State baru untuk melacak perubahan pada like/dislike
    const isInit = useRef(true);

    function handleLikeButton() {
        setLikeButton(!likeButton);
        if (dislikeButton) {
            setDislikeButton(false);
        }
        setChanged(true);  // Menandai perubahan pada like/dislike
    }

    function handleDislikeButton() {
        setDislikeButton(!dislikeButton);
        if (likeButton) {
            setLikeButton(false);
        }
        setChanged(true);  // Menandai perubahan pada like/dislike
    }

    async function handleTransfer() {
        await fetch(`http://localhost:3211/like/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, dislikeButton, likeButton })
        });
        console.log("setted");
    }

    useEffect(() => {
        fetchingData().then(data => {
            setBlog(data);
        });
        fetchingDataUser().then(data => {
            setUsers(data);
        });
    }, []);

    useEffect(() => {
        for (let i in users) {
            if (users[i].token === token) {
                for (let s in blog) {
                    if (blog[s].id === id) {
                        let like = blog[s].rating.like;
                        let dislike = blog[s].rating.dislike;
                        setLikeValue(like.length);
                        setDislikeValue(dislike.length);
                        setLikeButton(like.includes(users[i].username));
                        setDislikeButton(dislike.includes(users[i].username));
                        console.log(users[i].username);
                    }
                }
            }
        }
    }, [blog]);

    useEffect(() => {
        if (!isInit.current && changed) {
            handleTransfer();
            setChanged(false);  // Reset status perubahan setelah transfer
        } else {
            isInit.current = false;
        }
    }, [likeButton, dislikeButton]);

    return (
        <div className="border-2 border-border rounded-lg p-5">
            <div className="overflow-y-scroll h-[200px]">
                <h1 className="text-2xl content1 pb-2">{title} <span className="text-sm">#{username}</span></h1>
                <h2 className="content2">{mainContent}</h2>
            </div>
            <div className="flex justify-end gap-5 p-2">
                <button onClick={handleLikeButton} className={likeButton ? "text-green-500" : ""}>
                    {likeValue} like
                </button>
                <button onClick={handleDislikeButton} className={dislikeButton ? "text-red-500" : ""}>
                    {dislikeValue} dislike
                </button>
            </div>
        </div>
    );
}

async function fetchingData() {
    const response = await fetch('http://localhost:3211/blog');
    const users = await response.json();
    return users.data;
}

async function fetchingDataUser() {
    const response = await fetch('http://localhost:3211/login');
    const users = await response.json();
    return users.data;
}

export default Forum;
