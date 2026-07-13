import { createContext, useState } from "react";

const LayoutProver = createContext({
    user: ""
});

const Layout = ({ children }) => {
    const [user, setUser] = useState(null);
    
    return (
        <LayoutProver.Provider value={user}>
            
        </LayoutProver.Provider>
    );
}

export default Layout;