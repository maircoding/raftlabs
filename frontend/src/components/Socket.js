import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from 'react-router-dom'

const token = sessionStorage.getItem("key");
const user = sessionStorage.getItem("user");

const socket = io("http://localhost:3002", {
  query: { token: token },
});

function Socket() {  
  const navigate = useNavigate()

  const [messageOut, setMessageOut] = useState("");
  const [messagesIn, setMessagesIn] = useState([]);
  const [room, setRoom] = useState("");
  console.log(user, token);
  useEffect(() => {
    socket.on("message", (data) => {
      setMessagesIn((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("messages").off();
    };
  }, [navigate]);

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("message", messageOut, room);
    setMessageOut("");
  };


  return (
    <div className="">
      <div className="bg-gradient-to-r flex justify-center items-center from-pink-500 to-blue-500 h-screen">
        <div class="bg-white flex justify-center w-4/6 h-full gap-4 place-content-center">
          <div class="grid grid-cols-1 flex bottom-0 w-4/6 gap-4 place-content-center relative">
            <h1 className="absolute top-5 mx-auto text-3xl">Hello {user}</h1>
            <div className="absolute top-20 w-full">
              <div className="" spacing={2}>
              {messagesIn.map((message, index) => (<div className="bg-slate-100 border w-full rounded" key={index}>{message}</div>))}
            </div>
            </div>
            <form className="absolute flex bottom-5" onSubmit={sendMessage}>
              <div className="w-4/5">
                <input
                  className="bg-slate-200 h-10 m-1 p-5 rounded w-full"
                  placeholder="Message"
                  value={messageOut}
                  onChange={(event) => setMessageOut(event.target.value)}
                />
                <input
                  className="bg-slate-200 h-10 m-1 w-full p-5 rounded"
                  value={room}
                  placeholder="Room"
                  onChange={(event) => setRoom(event.target.value)}
                />
              </div>

              <div className="w-2/5">

                <button
                    className="bg-pink-500 m-1 h-10 rounded text-white w-full"
                  type="submit">
                  Send
                </button>

                <button
                  className="bg-pink-500 m-1 h-10 rounded text-white w-full"
                  onClick={() => {
                    socket.emit("joinRoom", room);
                  }}
                >
                  Join Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Socket;
