import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { getSession } from "./graphql/queries";
import "./CustomWorkoutHeader.css"; // Make sure the path is correct

export default function CustomViewWorkoutsHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cid, setCid] = useState('');
    const [sessionData, setSessionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const splitPath = location.pathname.split('/DispWorkouts/');
        if (splitPath.length > 1) {
            setCid(splitPath[1]);
        }
    }, [location]);

    useEffect(() => {
        if (cid) {
            const fetchData = async () => {
                const client = generateClient();
                try {
                    const response = await client.graphql({
                        query: getSession.replaceAll("__typename", ""),
                        variables: { id: cid },
                    });
                    setSessionData(response.data.getSession);
                } catch (err) {
                    setError(err);
                }
            };
            fetchData();
        }
    }, [cid]);

    const handleBackButtonClick = () => navigate("/Display");

    if (error) return <div className="error">Error: {error.message}</div>;
    if (!sessionData) return <div className="loading">Loading...</div>;

    return (
        <div className='centered'>
        <div className="viewWorkoutsHeader">
            <div className="sessionInfoText">{sessionData?.Date}</div>
            <div className="sessionInfoText">{sessionData?.Type}</div>
            <button className="backButton" onClick={handleBackButtonClick}>Back</button>
        </div>
        </div>
    );
}
