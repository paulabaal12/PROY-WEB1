// hooks/useNavigate.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate as useReactRouterNavigate } from 'react-router-dom'; // Importar useNavigate desde react-router-dom

const NavigationContext = createContext({ page: '/', navigate: () => {} });

const NavigationProvider = ({ children }) => {
    const navigate = useReactRouterNavigate(); // Usar useNavigate de react-router-dom
    const [page, setPage] = useState('/');

    useEffect(() => {
        const handleNavigate = () => {
            const path = window.location.hash.substring(1);
            setPage(path || '/');
        };

        window.addEventListener('hashchange', handleNavigate);
        handleNavigate(); // Establecer la ruta inicial

        return () => {
            window.removeEventListener('hashchange', handleNavigate);
        };
    }, []);

    const navigateTo = (url) => {
        navigate(url); // Usar navigate de react-router-dom
        setPage(url);
        window.location.hash = url;
    };

    return (
        <NavigationContext.Provider value={{ page, navigate: navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
};

const useNavigate = () => {
    return useContext(NavigationContext);
};

export default useNavigate;
export { NavigationProvider };