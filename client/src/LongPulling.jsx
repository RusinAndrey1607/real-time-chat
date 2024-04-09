import React, { useEffect, useState } from "react";
import axios from "axios";
const LongPulling = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    await axios.post("http://localhost:8000/new-messages", {
      id: Date.now(),
      message: value,
    });
    setValue('1');
  };
  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };
  useEffect(() => {
    subscribe();
  }, []);
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

export default LongPulling;
