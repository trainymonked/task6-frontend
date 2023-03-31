import { useEffect, useRef, useState } from 'react'
import { Autocomplete, Box, Button, TextField, TextareaAutosize, Typography } from '@mui/material'

import { serverUri } from '../../api/Constants'
import Message from '../Message'

export default function Home({ nickname }) {
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    const [messageRecipient, setMessageRecipient] = useState('')
    const [messageTitle, setMessageTitle] = useState('')
    const [messageBody, setMessageBody] = useState('')

    const socket = useRef()

    useEffect(() => {
        socket.current = new WebSocket(serverUri)

        socket.current.onopen = () => {
            const message = {
                event: 'connection',
                nickname,
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setUsers(data.users)
            setMessages(data.messages)
        }
        return () => {
            socket.current.close()
        }
    }, [nickname])

    const sendMessage = async () => {
        socket.current.send(
            JSON.stringify({
                event: 'message',
                sender: nickname,
                recipient: messageRecipient,
                title: messageTitle,
                body: messageBody,
            })
        )
        setMessageBody('')
        setMessageTitle('')
        setMessageRecipient('')
    }

    return (
        <div>
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography>Hello, {nickname}</Typography>
                <Button
                    size='small'
                    onClick={() => {
                        localStorage.removeItem('nickname')
                        window.location.reload()
                    }}
                >
                    Log out
                </Button>
            </Box>
            <Box
                mt={2}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, alignItems: 'flex-start' }}
                width={'500px'}
            >
                <Autocomplete
                    options={users}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label='Recipient' />}
                    value={messageRecipient}
                    size='small'
                    onInputChange={(_, v) => setMessageRecipient(v)}
                    fullWidth
                />
                <TextField
                    label='Title'
                    id='message-title'
                    fullWidth
                    size='small'
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                />
                <TextareaAutosize
                    placeholder='Message body'
                    style={{ width: '490px', padding: '5px' }}
                    minRows={5}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                />
                <Button
                    variant='contained'
                    onClick={sendMessage}
                    disabled={!messageBody.trim() || !messageTitle.trim() || !messageRecipient.trim()}
                >
                    Send
                </Button>
            </Box>
            <Box mt={2}>
                <Typography>Inbox:</Typography>
                {messages
                    .filter(({ recipient }) => recipient === nickname)
                    .reverse()
                    .map((message) => (
                        <Message key={message.id} message={message} />
                    ))}
            </Box>
        </div>
    )
}
