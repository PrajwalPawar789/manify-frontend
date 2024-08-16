import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SignUpForm = () => {
  const [planType, setPlanType] = useState('');
  const [planStartDate, setPlanStartDate] = useState('');
  const [planEndDate, setPlanEndDate] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setPlanType(params.planType);
    
    // Parse start date
    const startDate = new Date(params.startDate);
    const startDateFormatted = startDate.toISOString().split('T')[0]; // Get only the date part
    setPlanStartDate(startDateFormatted);
    
    // Parse end date
    const endDate = new Date(params.endDate);
    const endDateFormatted = endDate.toISOString().split('T')[0]; // Get only the date part
    setPlanEndDate(endDateFormatted);
  }, [searchParams]);
  

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Sign Up Form</h2>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planType">
            Plan Type
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="planType"
            type="text"
            value={planType}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planStartDate">
            Plan Start Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="planStartDate"
            type="date"
            value={planStartDate}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="planEndDate">
            Plan End Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="planEndDate"
            type="date"
            value={planEndDate}
            readOnly
          />
        </div>
        {/* Add other form fields */}
        {/* Your additional form fields go here */}
      </form>
    </div>
  );
};

export default SignUpForm;
