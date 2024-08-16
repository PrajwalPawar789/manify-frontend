import React, { useState } from 'react';
import Navbar from './Navbar';

const ProfileSection = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-2 text-center text-blue-700">{title}</h2>
    <div className="flex flex-col items-center justify-center">{children}</div>
  </div>
);

const ProfileDetail = ({ label, value }) => (
  <p className="mb-1 text-center"><strong>{label}:</strong> {value}</p>
);

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const userData = {
    full_name: "Prajwal Pawar",
    email: "prajwal@techonesolutionslab.com",
    join_date: "January 5th, 2022",
    credits: 100,
    credits_used: 20,
  };

  const paymentData = {
    invoices: [],
    subscription: {
      plan: "Enterprise Annual",
      credits_per_month: 500,
      users: 5,
      renewal_date: "Mar 28th, 2024",
    },
  };

  const setActive = (section) => setActiveSection(section);

  const navItemClass = (section) =>
    `cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${activeSection === section ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-10 py-6">
            <h1 className="text-2xl font-semibold text-center mb-6">Profile & Settings</h1>
            <div className="flex justify-center space-x-4 mb-6">
              <div className={navItemClass('profile')} onClick={() => setActive('profile')}>Profile</div>
              <div className={navItemClass('payment')} onClick={() => setActive('payment')}>Subscription</div>
              <div className={navItemClass('settings')} onClick={() => setActive('settings')}>Settings</div>
            </div>
            
            {activeSection === 'profile' && (
              <>
                <ProfileSection title="Personal Information">
                  <ProfileDetail label="Full Name" value={userData.full_name} />
                  <ProfileDetail label="Email" value={userData.email} />
                  <ProfileDetail label="Joined Since" value={userData.join_date} />
                </ProfileSection>

                <ProfileSection title="Usage">
                  <ProfileDetail label="Credits" value={`${userData.credits} available`} />
                  <ProfileDetail label="Credits Used" value={userData.credits_used} />
                </ProfileSection>

                <a href="#" className="text-center block text-blue-500 hover:underline">Reset Password</a>
              </>
            )}

            {activeSection === 'payment' && (
              <>
                <ProfileSection title="Subscription Details">
                  <ProfileDetail label="Plan" value={paymentData.subscription.plan} />
                  <ProfileDetail label="Credits per Month" value={paymentData.subscription.credits_per_month} />
                  <ProfileDetail label="Users" value={paymentData.subscription.users} />
                  <ProfileDetail label="Renewal Date" value={paymentData.subscription.renewal_date} />
                </ProfileSection>
                <ProfileSection title="Invoice History">
                  <p className="text-center">No Invoices Available</p>
                </ProfileSection>
              </>
            )}

            {activeSection === 'settings' && (
              <div className="flex justify-center">
                <p>Settings section content goes here...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
