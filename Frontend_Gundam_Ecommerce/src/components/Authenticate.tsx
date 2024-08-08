import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Authenticate: React.FC = () => {

    const navigate = useNavigate()

    const fetch = async () => {
        const params = new URL(window.location.href)
        const code = params.searchParams.get("code")
        if (code) {
            const {data} = await axios({
                method: 'POST',
                url: `http://localhost:8080/auth/outbound/authentication`,
                params: {
                    code: code
                }
            });
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