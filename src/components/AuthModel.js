import { useState } from "react";

export default function AuthModel ({setShowModel}){
    const [email, setEmail] = useState(null);
    const [password, setPassWord] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);


    console.log( email, password, confirmPassword);
    const handleClick = () => {
       
        setShowModel(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const isSignUp = true;

    return (
        <div className="auth-model">
            <div className="close-icon" onClick={handleClick} >ⓧ</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking log in or create account you agree to our terms. Learn how we process your data in our privacy policy and cookie policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="passsword"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassWord(e.target.value)}
                />
                <input
                    type="password-check"
                    id="password-check"
                    name="passsword-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />



            </form>



        </div>    
    )
}