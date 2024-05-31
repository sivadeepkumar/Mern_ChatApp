import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import loader from "../assets/loader.gif"
import "../../../src/index.css"
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

const SetAvator = () => {
    const api = "https://api.multiavatar.com/45678";
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [onlyFour,setOnlyFour] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [selectedAvator,setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position : "bottom-right",
        autoClose: 8000,
        pauseOnHover : true,
        draggable: true,
        theme:"dark",
    }
    var storeAvatar = []

    useEffect(() => {
      const checkUser = async () => {
          if (!localStorage.getItem("chat-app-user")) {
              navigate('/login');
          }
      };

      checkUser();
  }, [navigate]);

  
    const setProfilePicture = async () => {
      if (selectedAvator === undefined) {
        toast.error("Please select an avatar", toastOptions);

      } else {
        const user = await JSON.parse(
          localStorage.getItem("chat-app-user")
        );
  
        console.log(user,selectedAvator)
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
          image: avatars[selectedAvator],
          
        });
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(user)
          );
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      }
    };
  

    
    useEffect(() => {
        // async function fetchData() {
          const fetchData = async () => {
          try {
            
            for (let i = 0; i < 4; i++) {
              // console.log(i,"i")
              const response = await axios.get(
                `${api}${Math.round(Math.random() * 1000)}`
              );
              // console.log(response.data,"response.data");
              // const buffer = new Buffer(response.data);
              // const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(response.data)));
              // fetchedAvatars.push(buffer.toString("base64"));
              storeAvatar.push(response.data);
            }
            // console.log(fetchedAvatars,"fetchedAvatars")
            setAvatars(storeAvatar);
            setIsLoading(false);

            const shuffleArray = (array) => {
              
              let shuffled = array.slice(); // Create a copy of the array
              for (let i = shuffled.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));

                  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
              }
              
              return shuffled;
          };
          
          // Shuffle avatars and select the first 4
          if (avatars.length > 0) {
            const shuffledAvatars = shuffleArray(avatars);
            setOnlyFour(shuffledAvatars.slice(0, 4));
          }
          

          } catch (error) {
            console.error('Error fetching avatars:', error);
            if (error.response && error.response.status === 429) {
              // Handle rate-limiting error here (e.g., show a message to the user)
              setIsLoading(false);
            } else {
              // Handle other errors
              setIsLoading(false);
              // You can throw the error or handle it differently based on your application logic
            }
          }
        }
      
        fetchData(); // Call the fetchData function
      
        // Include dependencies if needed (e.g., [api])
      }, []); // Empty dependency array because fetchData does not depend on props or state
    
    
    
    return (
        <>
        {
          isLoading ? <Container> <img src={loader} alt="loader" className="loader"/> </Container> :

        <Container>
        <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
            
        </div>
        <div className="avatars">
        {onlyFour.map((avatar, index) => {
                        return (
                          <div
                                key={index}
                                className={`avatar ${
                                    selectedAvator === index ? "selected" : ""
                                }`}
                                  >
                                <img
                                    src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
                                    alt="avatar"
                                    onClick={() => setSelectedAvatar(index)}
                                    />
                            </div>
                        );
                      })}
        </div> 
        <button className="submit-btn" onClick={setProfilePicture}>Set profile picture</button>
        </Container>
        }
        <ToastContainer/>
        </>
    )
} 


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      font-size:25px;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      width:120px;
      height:120px;
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      
      img {
        width:100px;
        height:100px;
        // height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    width:120px;
    height:50px;
    background-color: #4e0eff;
    color: white;
    // padding: 1rem 5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 0.5rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
`;

export default SetAvator