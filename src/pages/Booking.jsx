
import React, { useState } from 'react';
import { Calendar, Clock, Car, User, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    vehicle: {
      make: '',
      model: '',
      year: '',
      registration: '',
      mileage: ''
    },
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  // Services data with pricing details
  const services = [
    { id: 'mot', name: 'MOT Test', price: 54.85, duration: '1 hour', description: 'Official MOT testing for Class 4, 5 & 7 vehicles' },
    { id: 'service', name: 'Full Service', price: 89.00, duration: '2 hours', description: 'Complete vehicle health check and maintenance' },
    { id: 'repair', name: 'Vehicle Repair', price: 0, duration: 'TBD', description: 'Custom repair based on your vehicle needs' },
    { id: 'brakes', name: 'Brake Service', price: 120.00, duration: '1.5 hours', description: 'Brake inspection and replacement' },
    { id: 'battery', name: 'Battery Service', price: 80.00, duration: '30 minutes', description: 'Battery testing and replacement' },
    { id: 'clutch', name: 'Clutch Repair', price: 450.00, duration: '4 hours', description: 'Clutch repair and replacement' },
    { id: 'exhaust', name: 'Exhaust Service', price: 150.00, duration: '1 hour', description: 'Exhaust system inspection and repair' },
    { id: 'diagnostics', name: 'Vehicle Diagnostics', price: 45.00, duration: '45 minutes', description: 'Comprehensive diagnostic scan' }
  ];

  // Time slots array
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Form field configurations for vehicle and customer sections
  const formFields = {
    vehicle: [
      { name: 'make', label: 'Vehicle Make *', type: 'text', placeholder: 'e.g., Ford, BMW, Toyota', colSpan: 1 },
      { name: 'model', label: 'Vehicle Model *', type: 'text', placeholder: 'e.g., Focus, 3 Series, Corolla', colSpan: 1 },
      { name: 'year', label: 'Year *', type: 'number', placeholder: '2020', colSpan: 1 },
      { name: 'registration', label: 'Registration Number *', type: 'text', placeholder: 'AB12 CDE', colSpan: 1, transform: (value) => value.toUpperCase() },
      { name: 'mileage', label: 'Current Mileage', type: 'number', placeholder: '50000', colSpan: 2 }
    ],
    customer: [
      { name: 'firstName', label: 'First Name *', type: 'text', colSpan: 1 },
      { name: 'lastName', label: 'Last Name *', type: 'text', colSpan: 1 },
      { name: 'email', label: 'Email Address *', type: 'email', colSpan: 1 },
      { name: 'phone', label: 'Phone Number *', type: 'tel', colSpan: 1 },
      { name: 'address', label: 'Address', type: 'textarea', rows: 3, colSpan: 2 }
    ]
  };
  
  const paymentFields = [
    { name: 'cardNumber', label: 'Card Number *', type: 'text', placeholder: '1234 5678 9012 3456', colSpan: 2 },
    { name: 'expiryDate', label: 'Expiry Date *', type: 'text', placeholder: 'MM/YY', colSpan: 1 },
    { name: 'cvv', label: 'CVV *', type: 'text', placeholder: '123', colSpan: 1 },
    { name: 'nameOnCard', label: 'Name on Card *', type: 'text', placeholder: 'John Smith', colSpan: 2 }
  ];
  
  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-6 h-6 mr-3" /> },
    { id: 'cash', label: 'Pay at Garage', icon: <span className="w-6 h-6 mr-3 text-2xl">💷</span> }
  ];

  // Define missing variables
  const SERVICE_PRICES = {
    'Class 4': 54.85,
    'Class 5': 54.85,
    'Class 7': 54.85
  };

  const classOptions = [
    { label: 'Class 4', price: 54.85 },
    { label: 'Class 5', price: 54.85 },
    { label: 'Class 7', price: 54.85 }
  ];

  const handleInputChange = (section, field, value) => {
    if (section) {
      setBookingData(prev => {
        const sectionData = { ...prev[section] };
        // Apply transformation if defined
        if (sectionData[field] && typeof formFields[section]?.find(f => f.name === field)?.transform === 'function') {
          sectionData[field] = formFields[section].find(f => f.name === field).transform(value);
        } else {
          sectionData[field] = value;
        }
        return {
          ...prev,
          [section]: sectionData
        };
      });
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    setStep(5);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.date && !!bookingData.time;
      case 3:
        return !!bookingData.vehicle.make && !!bookingData.vehicle.model && 
               !!bookingData.vehicle.registration && !!bookingData.customer.firstName && 
               !!bookingData.customer.email && !!bookingData.customer.phone;
      case 4:
        return bookingData.payment.method === 'cash' || 
              (!!bookingData.payment.cardNumber && !!bookingData.payment.expiryDate && 
               !!bookingData.payment.cvv && !!bookingData.payment.nameOnCard);
      default:
        return true;
    }
  };

  const selectedService = services.find(s => s.id === bookingData.service);
  const resetMotSelection = () => {
    setBookingData(prev => ({
      ...prev,
      service: '',
      motClass: ''
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Book Your Service</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Schedule your vehicle service appointment online. Quick, easy, and secure booking process.
          </p>
        </div>
      </section>
      {/* Progress Indicator */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-600">
              Step {step} of 4: {
                step === 1 ? 'Select Service' :
                step === 2 ? 'Choose Date & Time' :
                step === 3 ? 'Vehicle & Contact Details' :
                'Payment Information'
              }
            </p>
          </div>
        </div>
      </section>
      {/* Booking Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <Car className="w-8 h-8 mr-3 text-blue-600" />
                  Select Your Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        handleInputChange(null, 'service', service.id);
                        resetMotSelection();
                      }}
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        bookingData.service === service.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                      <p className="text-sm mb-3">{service.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {service.duration}
                        </span>
                        <span className="font-semibold text-blue-600">
                          {service.price > 0 ? `£${service.price.toFixed(2)}` : 'Quote on request'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!bookingData.service}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <Calendar className="w-8 h-8 mr-3 text-blue-600" />
                  Choose Date & Time
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange(null, 'date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleInputChange(null, 'time', time)}
                          className={`p-2 text-sm rounded-lg border transition-all duration-300 ${
                            bookingData.time === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {selectedService && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected Service:</h3>
                    <p className="text-gray-600">{selectedService.name}</p>
                    <p className="text-blue-600 font-semibold">
                      {selectedService.price > 0 ? `£${selectedService.price}` : 'Quote on request'}
                    </p>
                  </div>
                )}
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!bookingData.date || !bookingData.time}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <User className="w-8 h-8 mr-3 text-blue-600" />
                  Vehicle & Contact Details
                </h2>
                <div className="space-y-8">
                  {/* Vehicle Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formFields.vehicle.map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            value={bookingData.vehicle[field.name]}
                            onChange={(e) => handleInputChange('vehicle', field.name, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formFields.customer.map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            value={bookingData.customer[field.name]}
                            onChange={(e) => handleInputChange('customer', field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!bookingData.vehicle.make || !bookingData.vehicle.model || !bookingData.customer.firstName || !bookingData.customer.email}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                  <CreditCard className="w-8 h-8 mr-3 text-blue-600" />
                  Payment Information
                </h2>
                
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-semibold">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-semibold">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-semibold">{bookingData.vehicle.make} {bookingData.vehicle.model}</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">
                          {selectedService?.price > 0 ? `£${selectedService.price}` : 'Quote on request'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() => handleInputChange('payment', 'method', 'card')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          bookingData.payment.method === 'card'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                          <span className="font-semibold">Credit/Debit Card</span>
                        </div>
                      </div>
                      <div
                        onClick={() => handleInputChange('payment', 'method', 'cash')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          bookingData.payment.method === 'cash'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="w-6 h-6 mr-3 text-2xl">💷</span>
                          <span className="font-semibold">Pay at Garage</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {bookingData.payment.method === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={bookingData.payment.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={bookingData.payment.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={bookingData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="123"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          value={bookingData.payment.nameOnCard}
                          onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="John Smith"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Your appointment has been successfully booked. We'll send you a confirmation email shortly.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-semibold">{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-semibold">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle:</span>
                      <span className="font-semibold">{bookingData.vehicle.registration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                  >
                    Return Home
                  </a>
                  <a
                    href="/my-account"
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300"
                  >
                    View My Bookings
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
