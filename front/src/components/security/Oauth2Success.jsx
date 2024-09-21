import React, { useEffect, useState } from 'react'
import { setToken } from '../../service/auth/Auth';
import { useNavigate } from 'react-router-dom';
import { exchangeOneTimeToken } from '../../service/Service';

const Oauth2Success = () => {
    const navigate = useNavigate();
    const [tokenExchanged, setTokenExchanged] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token && !tokenExchanged) {
            console.log("onetimetoken "+ token)
            setTokenExchanged(true);
            exchangeOneTimeToken(token).then(response => {
                setToken(response.data);
                navigate("/");
            }).catch(err => {
                console.log("Error exchanging one time token " + err);
            })
        }
    }, [navigate, tokenExchanged]);

    return (
        <div>
            Logging in...
        </div>
    );
}

export default Oauth2Success