import {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {genderedUsers}  from '../../controllers/api/users';

export default function Dashboard () {
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)
  const [lastDirection, setLastDirection] = useState();
  const [ genderedUser, setGenderUsers] = useState([])
  const userId = cookies.UserId
 

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getUser', {
        params: {userId}
      })
      setUser(response.data)
    }catch(error) {
      console.log(error)
    }
  }
  
  const getgenderedUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/genderedUser', {
      params: { gender: user?.gender_interest }

    })
    setGenderUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getgenderedUser()
  }, [user, genderedUser]);

 const updateMatches = async (matchedUserId) => {
    try {
        await axios.put('http://localhost:3000/addmatch', {
        userId,
        matchedUserId
    })
    getUser()
  } catch (error) {
    console.log(error)
  }
}  
    const swiped = (direction, swipedUserId) => {
    
      if (direction === 'right') {
      updateMatches(swipedUser)
    }
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

    return (
      <>
      { user &&
    <div className="dashboard">
        <ChatContainer user={user}/>
        <div className='swipe-container'>
            <div className="card-container">
            {genderedUsers?.map((genderedUser) =>
          <TinderCard 
           className='swipe' 
           key={genderedUser.first_name} 
           onSwipe={(dir) => swiped(dir, genderedUser.user_id)} 
           onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
           <div style={{ backgroundImage: 'url(' + genderedUser.url + ')'}} 
            className='card'>
           <h3>{genderedUser.first_name}</h3>
            </div>
          </TinderCard>
        )}

        <div className='swipe-info'>
            {lastDirection ? <p> You swiped {lastDirection} </p> : <p/>} 
        </div>
      </div>
    </div>
</div>}
</>
  )
}