import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";


function LoadingBar() {
    const [value, setValue] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setValue(oldValue => {
                const newValue = oldValue + 10;
                if (newValue === 100) {
                    clearInterval(interval);
                }
                return newValue;
            })
        }, 5000)
    }, [])
    return (
        <LinearProgress variant="determinate" />
    )
}

export default LoadingBar;