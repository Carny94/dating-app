import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";


export default function MatchesDisplay ({matches, setClickedUser}) {
    const [matchedProfiles, setMatchedProfile] = useState(null);
    const [cookies] = useCookies(null);

    const matchedUserIds = matches.map(({ user_id}) => user_id)
    const userId = cookies.UserId;
    console.log(userId)

    const getMatches = async () =>  { 
        try {
           const response = await axios.get('http://localhost:3000/users', {
            params: {userIds: JSON.stringify(matchedUserIds) },
        });
           setMatchedProfile(response.data);
     } catch (error) {
        console.log(error);
    }
  }
    useEffect(() => {
        getMatches();
    }, [matches]);
  
    const handleAddMatch = async (matchUserId) => {
      try {
          await axios.patch(`http://localhost:3000/users/${userId}`, {
              $push: { matches: matchUserId } // Assuming 'matches' is the array field in your MongoDB document
          });
          // Perform any necessary actions after adding the match
      } catch (error) {
          console.log(error);
      }
  };
    const filteredMatchedProfiles = matchedProfiles?.filter(
      (matchedProfile) =>
        matchedProfile.matches.filter((profile) => profile.user_id === userId)
          .length > 0
    );
    

      return (
        <div className="matches-display">
          {filteredMatchedProfiles?.map((match) => (
            <div 
              key={match.user_id}
              className="match-card" 
              onClick={() => {setClickedUser(match);
                 handleAddMatch(match.user_id);}}
              >
              <div className="img-container">
                <img src={match?.url} alt={match?.first_name + " profile"} />
              </div>
              <h3>{match?.first_name}</h3>
            </div>
          ))}
        </div>
      );
          }      
