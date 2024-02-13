import axios from 'axios';
import { useState, useEffect } from 'react';
import formData from  '../pages/Onboarding'

export default function MatchesDisplay ({matches}) {

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
           
        </div>
    )
}