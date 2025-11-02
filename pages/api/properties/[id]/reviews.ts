import type { NextApiRequest, NextApiResponse } from "next";

// Mock reviews data
const MOCK_REVIEWS = [
  {
    id: 1,
    userName: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely stunning property! The views were breathtaking and the amenities exceeded our expectations. The host was very responsive and helpful. Would definitely stay here again!",
    date: "October 28, 2024",
    userAvatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    userName: "Michael Chen",
    rating: 4,
    comment: "Great location and beautiful property. The only minor issue was the WiFi signal was a bit weak in some rooms, but overall an excellent stay. Highly recommend!",
    date: "October 22, 2024",
    userAvatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 3,
    userName: "Emma Rodriguez",
    rating: 5,
    comment: "Perfect getaway! The property was immaculate and exactly as pictured. The kitchen was fully equipped and the beds were incredibly comfortable. Best vacation rental we've had!",
    date: "October 15, 2024",
    userAvatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 4,
    userName: "David Thompson",
    rating: 4,
    comment: "Very nice property in a great location. Check-in was smooth and the space was clean and well-maintained. Would have given 5 stars if the parking was a bit easier.",
    date: "October 8, 2024",
    userAvatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 5,
    userName: "Lisa Anderson",
    rating: 5,
    comment: "Wonderful experience from start to finish! The property had everything we needed and more. The outdoor space was perfect for our family gatherings. Thank you for a memorable stay!",
    date: "September 30, 2024",
    userAvatar: "https://i.pravatar.cc/150?img=9"
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // In a real app, you would filter reviews by property ID
    // For now, we'll return the same mock reviews for any property
    
    // Simulate some variation by returning different number of reviews
    const propertyId = parseInt(id as string);
    const numberOfReviews = ((propertyId % 5) + 1); // Returns 1-5 reviews
    
    const reviews = MOCK_REVIEWS.slice(0, numberOfReviews);
    
    res.status(200).json(reviews);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
