// Main page for the Trip Planner - pages/index.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import TripInputForm from '@/components/TripInputForm';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import HotelSuggestionsDisplay from '@/components/HotelSuggestionsDisplay';

// Define types for our data structures based on API and mock data definitions
interface Activity {
  time: string;
  description: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

interface MockHotel {
  id: string;
  name: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  imageUrl?: string;
  placeholderLink: string;
}

interface TripData {
  itinerary: ItineraryDay[];
  hotelSuggestions: MockHotel[];
}

const PlannerPage: React.FC = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: { destination: string; startDate: string; endDate: string }) => {
    setIsLoading(true);
    setError(null);
    setTripData(null);

    try {
      const response = await fetch('/api/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result: TripData = await response.json();
      setTripData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch trip plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>Trip Planner MVP</title>
        <meta name="description" content="Plan your next trip!" />
        {/* Default Next.js projects might not have favicon.ico in public root initially.
            If it's missing, this link won't work until the file is added.
            For now, this is fine.
        */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Trip Planner</h1>
      </header>

      <main>
        <TripInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />

        {isLoading && <p style={{ textAlign: 'center' }}>Loading your trip plan...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

        {tripData && (
          <>
            <ItineraryDisplay itinerary={tripData.itinerary} />
            <HotelSuggestionsDisplay hotels={tripData.hotelSuggestions} />
          </>
        )}
      </main>

      <footer style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <p>© {new Date().getFullYear()} Trip Planner MVP</p>
      </footer>
    </div>
  );
};

export default PlannerPage;
