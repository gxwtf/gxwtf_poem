import React, { useEffect, useState } from "react";

const TodayInHistory = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/today-in-history');
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data.events);
                } else {
                    console.error('Failed to fetch events:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-[256px] flex flex-col">
            <h2 className="text-xl font-bold mb-4">历史上的今天</h2>
            <ul className="list-disc pl-5">
                {events.map((event, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                        {event}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodayInHistory;