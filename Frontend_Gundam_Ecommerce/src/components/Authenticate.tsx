import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Authenticate: React.FC = () => {

    const navigate = useNavigate()

    const fetch = async () => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
            const {data} = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
            console.log(data)
        } else {
            console.error("Access token không có trong URL.");
        }
    };

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>Authenticate...</div>
    )
}

export default Authenticate