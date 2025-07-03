// Placeholder for TripInputForm.tsx
import React, { useState } from 'react';

interface TripInputFormProps {
  onSubmit: (data: { destination: string; startDate: string; endDate: string }) => void;
  isLoading: boolean;
}

const TripInputForm: React.FC<TripInputFormProps> = ({ onSubmit, isLoading }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ destination, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Plan Your Trip</h2>
      <div>
        <label htmlFor="destination" style={{ marginRight: '10px' }}>Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          style={{ padding: '5px', marginRight: '20px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="startDate" style={{ marginRight: '10px' }}>Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={{ padding: '5px', marginRight: '20px' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="endDate" style={{ marginRight: '10px' }}>End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="submit" disabled={isLoading} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          {isLoading ? 'Loading...' : 'Get Trip Plan'}
        </button>
      </div>
    </form>
  );
};

export default TripInputForm;
