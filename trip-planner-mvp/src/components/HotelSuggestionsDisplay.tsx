// Placeholder for HotelSuggestionsDisplay.tsx
import React from 'react';

// Matches the MockHotel structure defined earlier
interface MockHotel {
  id: string;
  name: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  imageUrl?: string;
  placeholderLink: string;
}

interface HotelSuggestionsDisplayProps {
  hotels: MockHotel[];
}

const HotelSuggestionsDisplay: React.FC<HotelSuggestionsDisplayProps> = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return <p>No hotel suggestions to display.</p>;
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h2>Hotel Suggestions</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={{ border: '1px solid #ddd', padding: '15px', width: '200px', borderRadius: '5px' }}>
            {hotel.imageUrl && (
              <img src={hotel.imageUrl} alt={hotel.name} style={{ width: '100%', height: '120px', objectFit: 'cover', marginBottom: '10px' }} />
            )}
            <h4>{hotel.name}</h4>
            <p>Rating: {hotel.rating}/5</p>
            <p>Price: {hotel.pricePerNight} {hotel.currency}/night</p>
            <a href={hotel.placeholderLink} target="_blank" rel="noopener noreferrer">
              View Deal (Placeholder)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelSuggestionsDisplay;
