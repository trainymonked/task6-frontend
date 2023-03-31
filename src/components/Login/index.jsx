import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

export default function Login() {
    const [nickname, setNickname] = useState('')
    const login = (event) => {
        event.preventDefault()
        localStorage.setItem('nickname', nickname)
        window.location.reload()
    }

    return (
        <Box sx={{ textAlign: 'center', mt: 20 }}>
            <Typography>Enter a nickname:</Typography>
            <form onSubmit={login}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', mt: 2 }}>
                    <TextField
                        size='small'
                        id='nickname'
                        autoFocus
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <Button disabled={nickname.trim().length === 0} type='submit' variant='contained' color='success'>
                        Continue
                    </Button>
                </Box>
            </form>
        </Box>
    )
}
