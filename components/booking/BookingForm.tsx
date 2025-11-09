import React, { useState } from "react";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return false;
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.phoneNumber) {
      setError("Phone number is required");
      return false;
    }

    if (!formData.cardNumber || formData.cardNumber.length < 13) {
      setError("Please enter a valid card number");
      return false;
    }

    if (!formData.expirationDate || !/^\d{2}\/\d{2}$/.test(formData.expirationDate)) {
      setError("Please enter expiration date in MM/YY format");
      return false;
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      setError("Please enter a valid CVV");
      return false;
    }

    if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      setError("Please complete all billing address fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate form
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const url = API_BASE ? `${API_BASE}/bookings` : '/api/bookings';
  await axios.post(url, formData);
      setSuccess(true);
      setError(null);
      
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });

      // Show success alert
      alert("Booking confirmed! Your reservation has been successfully processed.");
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("Failed to submit booking. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      
      {/* Success Message */}
      {success && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Booking confirmed successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="border p-2 w-full mt-2 rounded"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="border p-2 w-full mt-2 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 w-full mt-2 rounded"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`mt-6 text-white py-2 px-4 rounded-md w-full font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

