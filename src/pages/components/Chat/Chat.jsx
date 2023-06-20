import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Chat.module.scss";

export default function Chat({ socket }) {
  const bottomRef = useRef();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    if (!message.trim()) return;

    socket.emit("message", message);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    setMessage("");
  };
  const focusInput = () => {
    inputRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.chatBody}>
          {messageList.map((message, i) => (
            <div className={`${styles.messageContainer} ${message.authorId === socket.id ? styles.send : styles.receive}`} key={i}>
              <div className={styles.messageAuthor}>{message.author}:</div>
              <div className={styles.messageText}>{message.text}</div>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
        <div className={styles.chatFooter}>
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => getEnterKey(e)}
            type="text"
            placeholder="Mensagem"
          />
          <svg
            onClick={() => handleSubmit()}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.iconSend}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
