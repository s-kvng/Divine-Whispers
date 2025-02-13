import { useEffect, useState } from "react";

export const useHasBrowser = () => {
    const [hasBrowser , setHasBrowser] = useState(false);

    useEffect(() => {
        const isBrowser = typeof window !== "undefined";
        setHasBrowser(isBrowser);
    }, []);

    return hasBrowser;
}