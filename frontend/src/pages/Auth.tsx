import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    email:string;
    password:string;
    token:string;
}
interface AuthProps {
    setToken: (token:string) => void
}
const Auth: React.FC<AuthProps> = ({ setToken }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchingData().then((data) => {
            setUsers(data);
        });
    }, []);

    function signup() {
        navigate("/signup");
    }

    function validate(email: string, password: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(email) && password.length > 5) {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate(email, password)) {
            setError("");
            // Perform sign-in logic here
            for (let i in users) {
                if (users[i].email === email && users[i].password === password) {
                    setToken(users[i].token);
                    navigate("/Home")
                } else {
                    setError("Email not registered yet or password is incorrect");
                }
            }
        } else {
            setError("Please enter a valid email and password must be at least 6 characters long.");
        }
    }

    return (
        <div className="my-20 mx-auto bg-backgroundSecondary flex max-w-sm w-max gap-6 flex-col border-2 border-border rounded-lg p-5">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-3xl font-semibold">Sign In</h1>
                <h2 className="text-sm">
                    Don't have an Account yet?{" "}
                    <button onClick={signup} className="hover:text-blue-900 text-primary underline">
                        Create here
                    </button>
                </h2>
            </div>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="form-control">
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="input max-w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-field">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="form-control">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="input max-w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <div className="form-field">
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;

async function fetchingData() {
    const response = await fetch('http://localhost:3211/login');
    const users = await response.json();
    return users.data
}