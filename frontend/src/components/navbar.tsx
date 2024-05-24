import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    function log ( ) {
        navigate("/Auth");
    }
    return (
        <div className="navbar navbar-bordered navbar-glass navbar-floating mt-2">
            <div className="navbar-start">
                <h1 className="navbar-item text-2xl">Forum</h1>
            </div>
            <div className="navbar-end">
                <input className="input-ghost-primary input" placeholder="Search" />
                <div className="dropdown">
                    <input type="checkbox" id="drawer-left" className="drawer-toggle" />
                    <label htmlFor="drawer-left" className="btn btn-outline-primary ">≡</label>
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
                                    <h1 className="p-2">Create Post</h1>
                                    <hr className="bg-primary"></hr>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;