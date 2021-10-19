import React from 'react';

export function useInterval(callback : any, delay : number){
    const saveCallback = React.useRef();

    React.useEffect(() => {
        saveCallback.current = callback;
    }, [callback]);

    React.useEffect(() => {
        function tick() {
            //@ts-ignore
            saveCallback.current();
        }

        if (delay !== null){
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}