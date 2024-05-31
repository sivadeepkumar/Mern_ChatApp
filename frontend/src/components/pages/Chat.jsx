import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { allUsersRoute } from "../utils/APIRoutes"
import Contacts from "../pages/Contacts"
import Welcome from "./Welcome"
import ChatContainer from "./ChatContainer"

export const Chat = () => {
    const [contacts,setContacts] = useState([])
    const [currentUser,setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined);
    const navigate = useNavigate()

    useEffect(() => {
        const checkLocalStorage = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate("/login")
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
                console.log(currentUser)
            }
            
        }
        checkLocalStorage()
    },[navigate])


    useEffect(() => {
        const checkUser = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                    setContacts(data.data)
                    
                } else {
                    navigate('/setAvator')
                }
                
            }
        }
        checkUser()
    },[currentUser,navigate])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
        
    }

return (
    <Container>
    <div className="container">
    <Contacts 
    contacts={contacts} 
    currentUser={currentUser}  
    changeChat={handleChatChange} 
    />
    {currentChat != undefined ? 
    <ChatContainer currentChat={currentChat}/> :
    <Welcome currentUser={currentUser}/>
    }
    </div>
    </Container>
)
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;