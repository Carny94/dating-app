import {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import {useCookies} from 'react-cookie'

export default function Dashboard (){
  const [ cookies, setCookie, removeCookie] = useCookies(['user'])
  const [user, setUser] = useState(null)
  const [ genderedUsers, setGenderUsers] = useState(null)
  const userId = cookies.UserId
  console.log(userId)

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
  
  const getGenderedUsers = async () => {
    try {
    const response = await axios.get('http://localhost:8000/gendered-users', {
      params: { gender: user?.gender_interest }

    })
    setGenderUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getGenderedUsers()
  }, []);

    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://i.imgur.com/jVbVnOA.jpeg'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://i.imgur.com/d14PMta.jpg'
        },
        {
          name: 'Monica Hall',
          url: 'https://i.imgur.com/wqCE1zk.jpg'
        },
        {
          name: 'Jared Dunn',
          url: 'https://i.imgur.com/jVbVnOA.jpeg'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://i.imgur.com/jVbVnOA.jpeg'
        }
      ]
    const [lastDirection, setLastDirection] = useState();


    //


  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
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
            {characters.map((character) =>
          <TinderCard 
           className='swipe' 
           key={character.name} 
           onSwipe={(dir) => swiped(dir, character.name)} 
           onCardLeftScreen={() => outOfFrame(character.name)}>
           <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
           className='card'>
              <h3>{character.name}</h3>
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