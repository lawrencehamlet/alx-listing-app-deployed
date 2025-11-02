import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { PropertyProps } from "@/interfaces";

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/placeholder.jpg';
          }}
        />
        {property.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{property.discount}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {property.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2">
          {property.address.city}, {property.address.state}, {property.address.country}
        </p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {property.category.slice(0, 2).map((cat, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {cat}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600">
            <span>{property.offers.bed} beds • {property.offers.shower} baths</span>
          </div>
          <div className="text-sm text-gray-600">
            {property.offers.occupants} guests
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ${property.price}
            </span>
            <span className="text-gray-600 text-sm ml-1">/ night</span>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
