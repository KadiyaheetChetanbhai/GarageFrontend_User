import { useState, useEffect } from "react";
 
export const useGetOnlineStatus = (retry) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            retry?.()
        };
        const handleOffline = () => {
            setIsOnline(false);

        };
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return isOnline;
};
