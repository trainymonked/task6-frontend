import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

export default function Message({ message }) {
    const [bodyVisibility, setBodyVisibility] = useState(false)
    const toggleBody = () => {
        setBodyVisibility((bodyVisibility) => !bodyVisibility)
    }
    return (
        <Box sx={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: '4px', padding: 1, mt: 0.5 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    gap: '20px',
                }}
            >
                <Typography minWidth={'200px'}>Sender: {message.sender}</Typography>
                <Button onClick={toggleBody} variant='outlined' size='small' color='info'>
                    Title: {message.title}
                </Button>
                <Typography>Sent: {new Date(Math.round(message.date)).toLocaleString()}</Typography>
            </Box>
            {bodyVisibility && <Typography>{message.body}</Typography>}
        </Box>
    )
}
