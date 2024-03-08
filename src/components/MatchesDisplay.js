import axios from 'axios';
import { useState, useEffect } from 'react';


export default function MatchesDisplay ({matches, setClickedUser}) {

    const [matchedProfiles, setMatchedProfile] = useState();
    const matchedUserIds = matches.map(({user_id})  => user_id )
    
    const getMatches = async () =>  { 
        try {
           const response = await axios.get('http://localhost:3000/users', {
            params: {userIds: JSON.stringify(matchedUserIds) }
        });
           setMatchedProfile(response.data);
     } catch (error) {
        console.log(error);
    }
}
    useEffect(() => {
        getMatches();
    }, [matches]);
  

    console.log(matchedProfiles)

    return(
        <div className="matches-display">
           {matchedProfiles?.map((match, _index) => (

           <div key={{_index}} className="match-card" onClick={() => setClickedUser(match)}>
            <div className='img-container'>
                <img src={match?.url} alt={match?.first_name + ' profile'} />
            </div>
        </div>
       ))}
    </div>
  )
}