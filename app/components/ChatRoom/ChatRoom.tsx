"use client";

import { useState } from "react";
import { uuid } from "@/app/util/util";
import style from "@/app/style/chat-room.module.scss";
import { Markdown } from "../Markdown/Markdown";

function ChatMessage({ message, me }: { message: any; me: any }) {
  const isMe = me?.id === message?.sender?.id;
  return (
    <div
      className={`${style["chat-message"]} ${
        isMe ? style["chat-message-is-me"] : style["chat-message-not-me"]
      }`}
    >
      <div>
        <div className={style["message-sender"]}>{message?.sender?.name}:</div>
        <div>
          <Markdown content={message.text} />
        </div>
      </div>
    </div>
  );
}

function ChatBox() {
  const [messages, setMessages] = useState<any>([
    {
      id: uuid(),
      sender: {
        name: "章三",
        id: uuid(),
      },
      text: "Hello!",
    },
    {
      id: uuid(),
      sender: {
        name: "里斯",
        id: uuid(),
      },
      text: "Hi!",
    },
    {
      id: uuid(),
      sender: {
        name: "找刘",
        id: uuid(),
      },
      text: "Hello again!",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState<any>(null);

  const me = {
    id: "003",
    name: "Sam",
  };

  const handleInputChange = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const handleMessageSubmit = (event: any) => {
    event.preventDefault();
    // const message = event.target.elements.textarea.value;
    console.log("message", currentMessage);
    setMessages([
      ...messages,
      { id: uuid(), text: currentMessage, sender: me },
    ]);
    setCurrentMessage("");
  };

  return (
    <div className={style["chat-box"]}>
      <div className={style["message-box"]}>
        {messages.map((message: any) => (
          //   <p key={message.id}>{message.text}</p>
          <ChatMessage me={me} key={message.id} message={message} />
        ))}
        {currentMessage && (
          <ChatMessage
            me={me}
            message={{ id: uuid(), text: currentMessage, sender: me }}
          />
        )}
      </div>
      <form onSubmit={handleMessageSubmit} className={style["message-form"]}>
        <textarea
          className={style["message-input"]}
          title="message"
          value={currentMessage}
          placeholder=""
          name="message"
          onChange={handleInputChange}
        />
        <button type="submit" className={style["submit-button"]}>
          发送
        </button>
      </form>
    </div>
  );
}

export default function ChatRoom() {
  return (
    <div className={style["chat-room"]}>
      <ChatBox />
    </div>
  );
}
