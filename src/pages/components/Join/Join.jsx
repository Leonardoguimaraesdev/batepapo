import { useState } from "react"
import io from 'socket.io-client'

export default function Join({setChatVisibility, setSocket}) {

    const [name, setName] = useState('')

    const handleSubmit = async () => {
        if(!name.trim()) return
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', name)
        setSocket(socket)
        setChatVisibility(true)   
    }

    return (
        <div>
            <h1>Join</h1>
            <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder="Nome de usuário" />
            <button onClick={() => handleSubmit()}>Entrar</button>
        </div>
    )
}