import TinderCard from 'react-tinder-card';
import {useEffect, useState} from 'react';
import ChatContainer from '../components/ChatContainer';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = ({matches}) => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const [loading, setLoading] = useState(true);
    
    console.log(genderedUsers)
    // genderedUsers is not being pushed to the gendered user array
    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3000/getUsers', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/genderedUsers', {
                params: {gender: user?.gender_interest}
              
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
            setLoading(false); 
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:3000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches?.map(({ user_id, }) => user_id ).concat(userId);
    console.log({user, matches})
    const filteredGenderedUsers = Array.isArray(genderedUsers)
    ? genderedUsers.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))
    : [];   
  
    console.log('filteredGenderedUsers ', filteredGenderedUsers)
    return (
      <>
            {loading ? ( // Render loading indicator while loading data
                <div>Loading...</div>
            ) : (
                <>
                    {user && (
                        <div className="dashboard">
                            <ChatContainer user={user} />
                            <div className="swipe-container">
                                <div className="card-container">
                                    {filteredGenderedUsers?.map((genderedUser) => (
                                        <TinderCard
                                            className="swipe"
                                            key={genderedUser.user_id}
                                            onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                            onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                                        >
                                            <div
                                                style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                                                className="card"
                                            >
                                                <h3>{genderedUser.first_name}</h3>
                                            </div>
                                        </TinderCard>
                                    ))}
                                    <div className="swipe-info">
                                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Dashboard