export default function AuthModel ({setShowModel}){

    const handleClick = () => {
       
        setShowModel(false)
    }

    return (
        <div className="auth-model">
            <div onClick={handleClick} >ⓧ</div>
            yo
        </div>    
    )
}