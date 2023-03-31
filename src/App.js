import { Container } from '@mui/material'

import Login from './components/Login'
import Home from './components/Home'

export default function App() {
    const nickname = localStorage.getItem('nickname')

    return <Container>{nickname ? <Home nickname={nickname} /> : <Login />}</Container>
}
