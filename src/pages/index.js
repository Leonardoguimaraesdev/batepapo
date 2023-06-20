import styles from '@/styles/Home.module.scss'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
import { useState } from 'react'
import { getStaticPaths } from 'next';


export default function Home() {

  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)


  return (
    <div className={styles.main}>
      {chatVisibility ? <Chat socket={socket}/> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility}/>}
    </div>
  )
}
