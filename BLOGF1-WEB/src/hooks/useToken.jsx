import { useState, useEffect, createContext, useContext } from 'react';


function parseToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

const TokenContext = createContext({ token: '', useToken: () => { } });

const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('login_time', Date.now());
        }
    }, [token]);

    const isLoggedIn = () => {
        const loginTime = localStorage.getItem('login_time');
        if (!loginTime) {
            return false;
        }

        const currentTime = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (currentTime - loginTime > oneHour) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('login_time');
            return false;
        }

        return !!token;
    };

    const getRawToken = () => {
        return parseToken(token);
    };

    return (
        <TokenContext.Provider value={{ token, setToken, isLoggedIn, getRawToken }}>
            {children}
        </TokenContext.Provider>
    );
};

const useToken = () => {
    return useContext(TokenContext);
};

export default useToken;
export { TokenContext, TokenProvider };