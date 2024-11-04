// index.jsx
import React, { useState, useEffect } from 'react';
import './styles.css';

const DigitalClock = ({ use24Hour = true, showDate = true }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        let period = '';

        if (!use24Hour) {
            period = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
        }

        return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}${period}`;
    };

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="clock-container">
            <div className="digital-clock">
                <div className="time-display">
                    {formatTime(time)}
                </div>
                {showDate && (
                    <div className="date-display">
                        {formatDate(time)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DigitalClock;