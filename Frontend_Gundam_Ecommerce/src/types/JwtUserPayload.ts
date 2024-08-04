type JwtUserPayload = {
    user_id: number,
    sub: string,
    scope: string,
    iat: number,
    exp: number
}

export default JwtUserPayload