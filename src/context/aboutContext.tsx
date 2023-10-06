import axios from 'axios';
import { baseURL } from 'lib/url';
import React, { useEffect } from 'react';

interface SwitchAboutProps {
    initialAbout?: any;
    children: React.ReactNode;
}


export const AboutContext = React.createContext({});

export const AboutProvider = ({ initialAbout, children }: SwitchAboutProps) => {
    const [aboutData, setAboutData] = React.useState();


    function getAbout() {
        return aboutData;
    }

    const toggleAbout = {
        getAbout
    }

    useEffect(() => {
        if (aboutData) {
            return;
        }
        axios.post(`${baseURL}/about`).then((response: any) => {
            setAboutData(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [aboutData]);

    return (
        <AboutContext.Provider value={toggleAbout}>
            {children}
        </AboutContext.Provider>
    );
};