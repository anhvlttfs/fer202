import { createContext, useState } from "react";

const contextData = createContext({
    user: {}
});

const Context = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <contextData.Provider value={user}>
            {children}
        </contextData.Provider>
    );
}

export default Context;