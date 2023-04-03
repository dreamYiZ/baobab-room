"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import style from "@/app/style/chat-room.module.scss";
import { Markdown } from "../Markdown/Markdown";
import {
  ACTIONS,
  LIMIT_RENDER_MESSAGES,
  localStore as store,
  uuid,
} from "../../util/util";

function ChatMessage({ message, me }: { message: any; me: any }) {
  const isMe = me?.id === message?.sender?.id;
  return (
    <div
      className={`${style["chat-message"]} ${
        isMe ? style["chat-message-is-me"] : style["chat-message-not-me"]
      }`}
    >
      <div className={style["message-container"]}>
        <div className={style["message-title"]}>
          {isMe ? (
            <>
              <div className={style["message-sender"]}>
                {message?.sender?.name}
              </div>
              -<div className={style["message-idx"]}>{message.messageIdx}</div>
            </>
          ) : (
            <>
              {" "}
              <div className={style["message-idx"]}>{message.messageIdx}</div>-
              <div className={style["message-sender"]}>
                {message?.sender?.name}
              </div>
            </>
          )}
        </div>
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

  const [currentMessage, setCurrentMessage] = useState<any>("");

  const endRef: any = useRef(null);

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
      {
        id: uuid(),
        text: currentMessage,
        sender: me,
        messageIdx: messages.length,
      },
    ]);
    setCurrentMessage("");
  };

  useEffect(() => {
    const _messages: any = store.get(ACTIONS.MESSAGES);
    console.log("_messages", _messages);
    if (_messages && _messages.length) {
      setMessages(
        _messages.map((message: any, idx: number) => {
          message.messageIdx = idx;
          // message.id = uuid();
          return message;
        })
      );

      setTimeout(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }, 10);
    }
  }, []);

  useEffect(() => {
    store.set(ACTIONS.MESSAGES, messages);
  }, [messages]);

  const testFunc = () => {
    setMessages((prev: any) => {
      return new Array(300)
        .fill(1)
        .map((i) => prev)
        .flat()
        .slice(300);
    });
  };

  const clearAll = () => {
    // store.set(ACTIONS.MESSAGES, []);
    setMessages([]);
  };

  const handleScroll = (e: any) => {};

  const goToBottom = () => {
    setTimeout(() => {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  return (
    <div className={style["chat-box"]}>
      <div className={style["message-box"]} onScroll={handleScroll}>
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
        <div style={{ float: "left", clear: "both" }} ref={endRef}></div>
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

      <div className={style["message-manage-button-group"]}>
        <button onClick={testFunc}>生成聊天记录</button>
        <button onClick={clearAll}>清空聊天记录</button>
        <button onClick={goToBottom}>拉到底部</button>
      </div>
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
