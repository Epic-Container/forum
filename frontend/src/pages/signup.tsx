import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('')
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function validate(email: string, password: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(email) && password.length > 5) {
            return true;
        } else {
            return false;
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (validate(email, password)) {
            setError("");
            // Perform sign-in logic here
            try {
                await fetch("http://localhost:3211/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password, token: generateRandomString(), username })
                });
            } catch (error) {
                setError("An error occurred. Please try again later.");
            }
        } else {
            setError("Please enter a valid email and password must be at least 6 characters long.");
        }
    };

    return (
        <div className="my-20 mx-auto bg-backgroundSecondary flex max-w-sm w-max gap-6 flex-col border-2 border-border rounded-lg p-5">
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-3xl font-semibold">Sign Up</h1>
                <h2 className="text-sm">Make an Account here</h2>
            </div>
            <form className="form-group" onSubmit={handleSubmit}>
            <div className="form-field">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <div className="form-control">
                        <input
                            type="text"
                            id="Username"
                            placeholder="Username"
                            className="input max-w-full"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
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
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

function generateRandomString() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const segments = [4, 4, 4]; // Panjang segmen yang diinginkan
    const delimiter = '-';
    let result = '';

    segments.forEach((segmentLength, index) => {
        for (let i = 0; i < segmentLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            result += chars[randomIndex];
        }
        if (index < segments.length - 1) {
            result += delimiter;
        }
    });

    return result;
}

export default Signup;
