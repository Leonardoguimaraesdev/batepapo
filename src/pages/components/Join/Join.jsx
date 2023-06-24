import { useState } from "react";
import io from "socket.io-client";
import styles from "../../../styles/Join.module.scss";

export default function Join({ setChatVisibility, setSocket }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    console.log('Iniciando')
    if (!name.trim()) return;
    try {
      console.log('Iniciando 2');
      console.log(process.env.NEXT_PUBLIC_SERVER_URL)
      const socket = await io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
      console.log(socket)
      socket.emit("set_username", name);
      setSocket(socket);
      setChatVisibility(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Chat em tempo real</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome de usuário"
        />
        <button onClick={() => handleSubmit()}>ENTRAR</button>
      </div>
    </div>
  );
}
