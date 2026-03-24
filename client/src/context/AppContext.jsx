import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // ✅ Load credits
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/user/credits',
                { headers: { token } }
            );

            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // ✅ FINAL IMAGE GENERATION FUNCTION
    const generateImage = async (prompt) => {
        try {
            if (!token) {
                toast.error("Please login first");
                return null;
            }

            const { data } = await axios.post(
                backendUrl + '/api/image/generate-image',
                { prompt },
                { headers: { token } }
            );

            console.log("API Response:", data);

            // ✅ IMPORTANT FIX (resultImage instead of image)
            if (data.success && data.resultImage) {
                return data.resultImage; // already base64
            } else {
                toast.error(data.message || "No image received");
                return null;
            }

        } catch (error) {
            console.log("ERROR:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Image generation failed");
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AppContext.Provider value={value}>
                {props.children}
            </AppContext.Provider>
        </motion.div>
    );
};

export default AppContextProvider;