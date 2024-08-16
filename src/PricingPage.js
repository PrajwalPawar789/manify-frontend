import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleGetStartedClick = (planType) => {
    setSelectedPlan(planType);
    navigate(`/signup?planType=${planType}&startDate=${new Date().toISOString()}&endDate=${calculateEndDate(planType)}`);
  };

  const calculateEndDate = (planType) => {
    const endDate = new Date();
    if (planType === 'Free') {
      endDate.setDate(endDate.getDate() + 6); // Free plan has a 6-day trial
    } else {
      endDate.setDate(endDate.getDate() + 30); // Other plans have a 30-day trial
    }
    return endDate.toISOString();
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-center mb-8">Pricing Plans</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 mb-8">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Free</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => handleGetStartedClick('Free')}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 mb-8">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Basic</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => handleGetStartedClick('Basic')}
            >
              Get Started
            </button>
            
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 mb-8">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Professional</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={() => handleGetStartedClick('Professional')}
            >
              Get Started
            </button>
          </div>
        </div>
        
        {/* Render other plans in a similar way */}
      </div>
    </div>
  );
};

export default PricingPage;
