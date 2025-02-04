import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useSendOtpMutation, useVerifyOtpMutation } from '../redux/features/auth/authApi';

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState("");

    const [registerUser] = useRegisterUserMutation();
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();

    const navigate = useNavigate();

    // Handle OTP Sending
    const handleSendOtp = async () => {
        try {
            await sendOtp(email).unwrap();
            setOtpSent(true); // Show OTP popup
            setMessage(""); // Clear any previous messages
            alert("OTP sent to your email");
        } catch (err) {
            setMessage("Failed to send OTP. Please try again.");
        }
    };

    // Handle OTP Verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp({ email, otp }).unwrap();
            alert("OTP verified successfully");

            // Proceed with Registration
            const data = { username, email, password };
            await registerUser(data).unwrap();
            alert("Registration successful");
            navigate('/login');
        } catch (err) {
            setMessage("Invalid or expired OTP. Please try again.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!email || !username || !password) {
            setMessage("All fields are required before sending OTP.");
            return;
        }
        handleSendOtp(); // Trigger OTP sending
    };

    return (
        <section className="h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-sm mx-auto bg-white border shadow p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-5">Please Register</h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <input
                        type="text"
                        value={username}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    {message && <p className="text-red-500">{message}</p>}
                    <button
                        type="submit"
                        className="w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
                    >
                        Register
                    </button>
                </form>
                <p className="my-5 italic text-sm text-center">
                    Already have an account? 
                    <Link to="/login" className="text-red-700 px-1 underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* OTP Verification Popup */}
            {otpSent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Verify OTP</h3>
                        <form onSubmit={handleVerifyOtp}>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full bg-gray-100 focus:outline-none px-5 py-3 mb-4 rounded"
                                required
                            />
                            {message && <p className="text-red-500 mb-4">{message}</p>}
                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
                            >
                                Verify OTP
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Register;
