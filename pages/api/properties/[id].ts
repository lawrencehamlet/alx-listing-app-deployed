import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Find the property by ID
    const propertyIndex = parseInt(id as string) - 1;
    
    if (propertyIndex >= 0 && propertyIndex < PROPERTYLISTINGSAMPLE.length) {
      const property = {
        ...PROPERTYLISTINGSAMPLE[propertyIndex],
        id: propertyIndex + 1,
      };
      
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
