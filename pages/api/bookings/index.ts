import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Get the booking data from the request body
    const bookingData = req.body;

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "cardNumber",
      "expirationDate",
      "cvv"
    ];

    const missingFields = requiredFields.filter(field => !bookingData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        fields: missingFields
      });
    }

    // Simulate processing delay
    // In a real app, this would process the payment and create the booking

    // Generate a mock booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Return success response
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: bookingId,
      booking: {
        id: bookingId,
        ...bookingData,
        // Remove sensitive payment info from response
        cardNumber: `****-****-****-${bookingData.cardNumber.slice(-4)}`,
        cvv: "***",
        status: "confirmed",
        createdAt: new Date().toISOString()
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
