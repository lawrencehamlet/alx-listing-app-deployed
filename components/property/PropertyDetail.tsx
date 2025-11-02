import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyProps } from '@/interfaces';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
  property: PropertyProps;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation would go here */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Property Images Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="relative h-96 md:h-[500px]">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/placeholder.jpg';
              }}
            />
            {property.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                -{property.discount}% OFF
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* Property Title and Rating */}
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {property.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="ml-1 font-semibold">{property.rating}</span>
                    <span className="ml-1">({property.rating} rating)</span>
                  </div>
                  <span>•</span>
                  <span>
                    {property.address.city}, {property.address.state}, {property.address.country}
                  </span>
                </div>
              </div>

              {/* Property Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {property.category.map((cat, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Property Features */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">Property Features</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mb-1">🛏️</span>
                    <span className="font-semibold">{property.offers.bed}</span>
                    <span className="text-sm text-gray-600">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mb-1">🚿</span>
                    <span className="font-semibold">{property.offers.shower}</span>
                    <span className="text-sm text-gray-600">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mb-1">👥</span>
                    <span className="font-semibold">{property.offers.occupants}</span>
                    <span className="text-sm text-gray-600">Guests</span>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">About this property</h2>
                <p className="text-gray-700 leading-relaxed">
                  Experience luxury and comfort at {property.name}. Located in the heart of{' '}
                  {property.address.city}, this beautiful property offers everything you need for
                  a perfect stay. With {property.offers.bed} spacious bedrooms, {property.offers.shower}{' '}
                  modern bathrooms, and accommodation for up to {property.offers.occupants} guests,
                  it&apos;s ideal for families, groups, or business travelers.
                </p>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <p className="text-gray-700">
                  <strong>Address:</strong> {property.address.city}, {property.address.state},{' '}
                  {property.address.country}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ${property.price}
                  </span>
                  <span className="text-gray-600">/ night</span>
                </div>
                {property.discount && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save {property.discount}% on this booking!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base price</span>
                    <span className="font-medium">${property.price}</span>
                  </div>
                  {property.discount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({property.discount}%)</span>
                      <span className="font-medium">
                        -${((parseFloat(property.price.toString()) * parseFloat(property.discount)) / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Link href="/booking">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Reserve Now
                </button>
              </Link>

              <p className="text-xs text-gray-500 text-center mt-3">
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {property.id && (
          <div className="mt-6">
            <ReviewSection propertyId={property.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;
