// Placeholder for ItineraryDisplay.tsx
import React from 'react';

// Matches the itinerary structure defined in API design
interface Activity {
  time: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

interface ItineraryDisplayProps {
  itinerary: ItineraryDay[];
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return <p>No itinerary to display.</p>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Your Itinerary</h2>
      {itinerary.map((dayPlan) => (
        <div key={dayPlan.day} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
          <h3>Day {dayPlan.day} ({dayPlan.date})</h3>
          <ul>
            {dayPlan.activities.map((activity, index) => (
              <li key={index}>
                <strong>{activity.time}:</strong> {activity.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ItineraryDisplay;
