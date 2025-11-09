import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces";

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const url = API_BASE ? `${API_BASE}/properties/${id}` : `/api/properties/${id}`;
  const response = await axios.get(url);
  setProperty(response.data);
        setError(false);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Property not found</p>
      </div>
    );
  }

  return <PropertyDetail property={property} />;
}
