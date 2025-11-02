import type { NextApiRequest, NextApiResponse } from "next";
import { PROPERTYLISTINGSAMPLE } from "@/constants";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Add IDs to the properties for consistency
    const propertiesWithIds = PROPERTYLISTINGSAMPLE.map((property, index) => ({
      ...property,
      id: index + 1,
    }));

    // Return the properties list
    res.status(200).json(propertiesWithIds);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
