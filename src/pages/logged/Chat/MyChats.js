import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { Toaster, useToaster } from 'react-hot-toast';
import { getSender } from '../../../config/ChatLogics';
import { ChatState } from '../../../contexts/ChatProvider';
import GroupChatModal from '../../../components/logged/GroupChatModal';

function MyChats({ fetchAgain }) {
    const [loggedUser, setLoggedUser] = useState();
    const [popupOpen, setPopupOpen] = useState(false);

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const trigger = useRef(null);
    const popup = useRef(null);
    
    useEffect(() => {
      const clickHandler = ({ target }) => {
        if (!popup.current) return;
        if (!popupOpen || popup.current.contains(target) || trigger.current.contains(target)) return;
        setPopupOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    }, [popupOpen]);
    
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!popupOpen || keyCode !== 27) return;
        setPopupOpen(false);
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    }, [popupOpen]);
  
    // const toast = useToaster();
  
    const fetchChats = async () => {
      // console.log(user._id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        const { data } = await axios.get("http://localhost:8080/api/chat", config);
        setChats(data);
        console.log(chats);
      } catch (error) {
        // toast.error({
        // loading: 'Проверка ...',
        // success : <b>Успешно!</b>,
        // error : <b>Грешна парола!</b>
        // });
        // toast.error('This is an error message!');

      }
    };
  
    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
      // eslint-disable-next-line
    }, [fetchAgain]);

  return (
    <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <button
          ref={trigger}
          onClick={() => setPopupOpen(!popupOpen)}
          className="flex items-center gap-2 rounded bg-primary py-2 px-4.5 font-medium text-white hover:bg-opacity-80"
        >
          <svg
            className="fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 7H9V1C9 0.4 8.6 0 8 0C7.4 0 7 0.4 7 1V7H1C0.4 7 0 7.4 0 8C0 8.6 0.4 9 1 9H7V15C7 15.6 7.4 16 8 16C8.6 16 9 15.6 9 15V9H15C15.6 9 16 8.6 16 8C16 7.4 15.6 7 15 7Z"
              fill=""
            />
          </svg>
          Групов чат
        </button>

        <GroupChatModal
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          
        />

        {chats ? (
          <div>
            {chats.map((chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
                {chat.latestMessage && (
                  <p fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1>No chats</h1>
        )}

                      {/* <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                {chatList.map((object, item) => {
                  return (
                    <div
                      key={item}
                      className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark"
                    >
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        <img
                          src={object.imgSrc}
                          alt="profile"
                          className="h-full w-full object-cover object-center"
                        />
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      </div>
                      <div className="w-full">
                        <h5 className="text-sm font-medium text-black dark:text-white">
                          {object.name}
                        </h5>
                        <p className="text-sm">{object.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div> */}
  </div>
  )
}

export default MyChats