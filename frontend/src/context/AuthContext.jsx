import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUsuario = JSON.parse(localStorage.getItem("usuario"));
        const storedToken = localStorage.getItem("token");
        if (storedUsuario && storedToken) {
            setUsuario(storedUsuario);
            setToken(storedToken);
        }
    }, []);

    const login = (userData, token) => {
        setUsuario(userData);
        setToken(token);
        localStorage.setItem("usuario", JSON.stringify(userData));
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);