import React, { useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    await axios.post("http://localhost:8000/new-messages", {
      id: Date.now(),
      message: value,
    });
    setValue("");
    
  };
  useEffect(() => {
    subscribe();
  }, []);
  const subscribe = async () => {
    const evenSource = new EventSource("http://localhost:8000/connect")
    evenSource.onmessage = (event) =>{
      const message = JSON.parse(event.data)
      setMessages((prev) => [message, ...prev])
    }
  };

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
            <Message key={item.id} message={item.message} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Message = (props) => {
  return <div className="message">{props.message}</div>;
};

export default EventSourcing;
