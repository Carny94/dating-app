import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";

export default function MatchesDisplay ({ matches, setClickedUser }) {
    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const [cookies] = useCookies(null);
    const userId = cookies.UserId;

    useEffect(() => {
        const getMatches = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users', {
                    params: { userIds: JSON.stringify(matches.map(match => match.user_id)) }
                });
                setMatchedProfiles(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (matches) {
            getMatches();
        }
    }, [matches]);

    const handleAddMatch = async (matchUserId) => {
        try {
            await axios.patch(`http://localhost:3000/users/${userId}`, {
                $push: { matches: matchUserId } // Update this with correct MongoDB update syntax
            });
            // Perform any necessary actions after adding the match
        } catch (error) {
            console.log(error);
        }
    };

    const handleMatchClick = (match) => {
        setClickedUser(match);
        handleAddMatch(match.user_id);
    };

    return (
        <div className="matches-display">
            {matchedProfiles && matchedProfiles.map((match) => (
                <div 
                    key={match.user_id}
                    className="match-card" 
                    onClick={() => handleMatchClick(match)}
                >
                    <div className="img-container">
                        <img src={match.url} alt={`${match.first_name} profile`} />
                    </div>
                    <h3>{match.first_name}</h3>
                </div>
            ))}
        </div>
    );
}
