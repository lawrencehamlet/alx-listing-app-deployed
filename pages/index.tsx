import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PropertyProps } from "@/interfaces";
import Pill from "@/components/common/Pill";
import PropertyCard from "@/components/property/PropertyCard";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [properties, setProperties] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filterOptions = [
    'All',
    'Top Villa',
    'Self Checkin',
    'Pet Friendly',
    'Luxury Villa',
    'Mountain View',
    'Beachfront',
    'City Center'
  ];

  const filteredProperties = activeFilter === 'All'
    ? properties
    : properties.filter(property => property.category.includes(activeFilter));

  useEffect(() => {
    const fetchProperties = async () => {
      try {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const url = API_BASE ? `${API_BASE}/properties` : '/api/properties';
  const response = await axios.get(url);
  // Assume API returns an array of properties
  setProperties(response.data || []);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/placeholder.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find your favorite place here!
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {filterOptions.map((filter) => (
              <Pill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <p className="col-span-full text-center">Loading properties...</p>
            ) : (
              filteredProperties.map((property, index) => (
                <PropertyCard key={property.id ?? index} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
