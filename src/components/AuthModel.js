import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

export default function AuthModel ({setShowModel, isSignUp}){
    const [email, setEmail] = useState(null);
    const [password, setPassWord] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies('user');
    const Navigate = useNavigate();

    const handleClick = () => {
        setShowModel(false);
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            if( isSignUp && (password !== confirmPassword)) {
                setError('Make sure your passwords match!')
                return
                }
                const response = await axios.post(`http://localhost:3000/${isSignUp ? 'signup' : 'login'}`, { email, password });
                console.log( 'posting', email, password)
              
                setCookie('AuthToken', response.data.token);
                setCookie('UserId', response.data.user_id)

                const success =  response.status === 201;

            if(success && isSignUp ) Navigate('/onboarding');
            if(success && !isSignUp ) Navigate('/dashboard');
            window.location.reload();
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