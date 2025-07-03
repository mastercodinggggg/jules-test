// API route for /api/trip
import type { NextApiRequest, NextApiResponse } from 'next';

// Re-defining types here for clarity within the API route
// In a larger app, these might be shared from a common types file
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

interface TripDataResponse {
  itinerary: ItineraryDay[];
  hotelSuggestions: MockHotel[];
}

interface ErrorResponse {
  message: string;
  errors?: any[]; // Optional for more detailed validation errors
}

// Mock hotel data as defined in Step 6
const mockHotels: MockHotel[] = [
  {
    id: "mock-hotel-1",
    name: "The Cozy Corner Inn",
    pricePerNight: 120,
    currency: "USD",
    rating: 4.3,
    imageUrl: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Hotel1",
    placeholderLink: "#hotel1"
  },
  {
    id: "mock-hotel-2",
    name: "Riverside Mock Suites",
    pricePerNight: 180,
    currency: "USD",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Hotel2",
    placeholderLink: "#hotel2"
  },
  {
    id: "mock-hotel-3",
    name: "Downtown Budget Mockup",
    pricePerNight: 75,
    currency: "USD",
    rating: 3.9,
    imageUrl: "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Hotel3",
    placeholderLink: "#hotel3"
  }
];

// Basic Itinerary Generation Logic (from Step 7)
function generateItinerary(destination: string, startDateStr: string, endDateStr: string): ItineraryDay[] {
  const itinerary: ItineraryDay[] = [];
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
    // Invalid date handling, though primary validation should be before calling this
    return [];
  }

  let currentDate = new Date(startDate);
  let dayNumber = 1;

  while (currentDate <= endDate) {
    const activities: Activity[] = [];
    if (dayNumber === 1) {
      activities.push({ time: "Morning", description: `Arrive in ${destination} and check into your accommodation.` });
      activities.push({ time: "Afternoon", description: `Explore the area around your hotel in ${destination}.` });
      activities.push({ time: "Evening", description: "Dinner at a local restaurant." });
    } else if (currentDate.getTime() === endDate.getTime()) { // Last day
      activities.push({ time: "Morning", description: `Enjoy a final breakfast in ${destination}.`});
      activities.push({ time: "Afternoon", description: `Depart from ${destination}.` });
    } else {
      activities.push({ time: "Full Day", description: `Free day to explore ${destination}. Consider visiting a famous landmark or museum.` });
    }

    itinerary.push({
      day: dayNumber,
      date: currentDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      activities: activities,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    dayNumber++;
  }
  return itinerary;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TripDataResponse | ErrorResponse>
) {
  if (req.method === 'POST') {
    const { destination, startDate, endDate } = req.body;

    // Basic validation
    if (!destination || typeof destination !== 'string' || destination.trim() === '') {
      return res.status(400).json({ message: 'Destination is required and must be a string.' });
    }
    if (!startDate || typeof startDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      return res.status(400).json({ message: 'Start date is required and must be in YYYY-MM-DD format.' });
    }
    if (!endDate || typeof endDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return res.status(400).json({ message: 'End date is required and must be in YYYY-MM-DD format.' });
    }

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    if (isNaN(sDate.getTime()) || isNaN(eDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format provided.' });
    }

    if (sDate > eDate) {
      return res.status(400).json({ message: 'Start date cannot be after end date.' });
    }

    // Simulate some processing delay
    setTimeout(() => {
      const itinerary = generateItinerary(destination, startDate, endDate);

      if (itinerary.length === 0 && (sDate <= eDate) ) { // check if itinerary is empty due to an internal error not caught by prior validation
        return res.status(500).json({ message: 'Failed to generate itinerary due to an unexpected date issue.' });
      }

      const responseData: TripDataResponse = {
        itinerary,
        hotelSuggestions: mockHotels, // Using the predefined mock hotels
      };
      res.status(200).json(responseData);
    }, 1000); // 1-second delay

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
