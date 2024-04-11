import React, { useState } from 'react';
import TotalVolumeGraph from './TotalVolume';
import './Progress.css'; // Import the CSS file

const Progress = () => {
    const options = ['Total Volume', 'Option 2', 'Option 3'];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="progress-container">
            <div className="progress-header">
                <label htmlFor="progress">Graphs</label>
            </div>
            <div className="select-container">
                <select id="progress" onChange={handleChange}>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            {selectedOption === 'Total Volume' && (
                <div className="bar-chart-container">
                    <TotalVolumeGraph />
                </div>
            )}
        </div>
    );
};

export default Progress;
