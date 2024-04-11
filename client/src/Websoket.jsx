import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Websoket = () => {
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const socket = useRef();
  const sendMessage = async () => {
    const message = {
      event: "message",
      username,
      id: Date.now(),
      message:value
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };
  const connect = () => {
    socket.current = new WebSocket("ws://localhost:8000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket closed");
    };
    socket.current.onerror = () => {
      console.log("Error");
    };
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            placeholder="Type username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <button onClick={connect}>Login</button>
        </div>
      </div>
    );
  }
  return (
    <div className="center">
      <div className="">
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((item) => (
            <Message key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};


const Message = ({props}) => {
  return <div className="">{props.event === "connection" 
  ? <div className="connection_message"> User {props.username} has connected</div>
  : <div className="message">{props.username} {props.message}</div> }</div>;
};

export default Websoket;
