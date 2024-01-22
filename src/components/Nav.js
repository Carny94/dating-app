import lovester from '../images/lovester.png';
import ytlogo from '../images/ytlogo.png';


export default function Nav ({minimal, authToken, setShowModel, showModel, setIsSignUp}) {

const handleClick = () => {
    setShowModel(true);
    setIsSignUp(false);
}
    return(
       <nav>
        <div className="logo-container">
            <img className="logo" alt= 'logo' src={minimal ? lovester : ytlogo}/> 
        </div>
        {!authToken && !minimal && <button 
            className="nav-button"
                onClick={handleClick}
                disabled={showModel}
                >Log in</button>}
       </nav>
    
    )
}