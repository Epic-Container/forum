import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    token: string,
    post: Array<{title: string, content: string, username: string, id: number}>
    setFilteredData: (data:Array<{title: string, content: string, username: string, id: number}>) => void
}
const Navbar: React.FC<NavbarProps> = ({post, setFilteredData, token}) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState('')

    function log() {
        navigate("/");
    }
    useEffect(()=>{
        if (!token || token.length === 0) {
            setError('Please sign in here')
            return;
        }
    })
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);
        if (value === "") {
            setFilteredData(post);
        } else {
            const filtered = post.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
            setFilteredData(filtered);
        }
    };

    return (
        <div>
            <div className="navbar navbar-bordered navbar-glass navbar-floating mt-2">
                <div className="navbar-start">
                    <h1 className="navbar-item text-2xl">Forum</h1>
                </div>
                <div className="navbar-center">
                    <button onClick={log} className="underline text-red-500 text-sm">{error}</button>
                </div>
                <div className="navbar-end">
                    <input
                        className="input-ghost-primary input"
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    <div className="dropdown">
                        <input type="checkbox" id="drawer-left" className="drawer-toggle" />
                        <label htmlFor="drawer-left" className="btn btn-outline-primary">≡</label>
                        <label className="overlay" htmlFor="drawer-left"></label>
                        <div className="drawer">
                            <div className="drawer-content pt-10 flex flex-col h-full">
                                <label htmlFor="drawer-left" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                                <h1 className="text-3xl font-bold mb-5">Forum</h1>
                                <ul>
                                    <li className="text-2xl">
                                        <button className="p-2" onClick={log}>Account</button>
                                        <hr className="bg-primary"></hr>
                                    </li>
                                    <li className="text-2xl">
                                        <button className="p-2" onClick={() => navigate('/Post')}>Create post</button>
                                        <hr className="bg-primary"></hr>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
