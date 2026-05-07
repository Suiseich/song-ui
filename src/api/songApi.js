import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://song-api-fy89.onrender.com/tayag";

export const getSongs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/songs`);
        // Ensure we return an empty array if the response is empty or not as expected
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("API Error:", error);
        return []; // Return empty array so the frontend doesn't crash
    }
};
