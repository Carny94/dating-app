import { useState } from "react";

export default function AuthModel ({setShowModel, isSignUp}){
    const [email, setEmail] = useState(null);
    const [password, setPassWord] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);

    // const isSignUp = true;

    const handleClick = () => {
       
        setShowModel(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if( isSignUp && (password !== confirmPassword)) {
                setError('Make sure your passwords match!')
            }
            console.log('make a post request to our database');
        } catch (error) {
            console.log(error);
        }
    }


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
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="passsword-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit" />
                <p>{error}</p>
            </form>
            <h2>Get the app</h2>



        </div>    
    )
}