import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contactandcompany = ({ totalContacts, totalCompanies }) => {
  const [contacts, setContacts] = useState(totalContacts);
  const [companies, setCompanies] = useState(totalCompanies);

  // Update the state whenever the props change
  useEffect(() => {
    setContacts(totalContacts);
    setCompanies(totalCompanies);
  }, [totalContacts, totalCompanies]);

  useEffect(() => {
    if (contacts === 0 && companies === 0) {
      axios.get('http://192.168.1.36:5030/api/v1/databasecount')
        .then(response => {
          console.log(response);
          setContacts(response.data.data.totalContacts);
          setCompanies(response.data.data.totalCompanies);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [contacts, companies]);

  return (
    <div>
      <div className="gap-2 flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          height="16"
          width="16"
        >
          <g clipPath="url(#clip0_8183_21)">
            {/* SVG paths */}
          </g>
          <defs>
            <clipPath id="clip0_8183_21">
              <rect
                transform="matrix(-1 0 0 1 16 0)"
                fill="white"
                height="16"
                width="16"
              ></rect>
            </clipPath>
          </defs>
        </svg>
        <div className="gap-2 flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-md">
          <span>Contacts ({contacts})</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="16" width="16">
            <path fill="#151417" d="M0.6 15H5.4C5.55913 15 5.71174 14.9617 5.82426 14.8935C5.93679 14.8253 6 14.7328 6 14.6364V7.36364C6 7.26719 5.93679 7.1747 5.82426 7.10651C5.71174 7.03831 5.55913 7 5.4 7H0.6C0.44087 7 0.288258 7.03831 0.175736 7.10651C0.0632138 7.1747 0 7.26719 0 7.36364V14.6364C0 14.7328 0.0632138 14.8253 0.175736 14.8935C0.288258 14.9617 0.44087 15 0.6 15ZM2.1 9.18182C2.1 9.03715 2.19482 8.89842 2.3636 8.79612C2.53239 8.69383 2.76131 8.63636 3 8.63636C3.23869 8.63636 3.46761 8.69383 3.6364 8.79612C3.80518 8.89842 3.9 9.03715 3.9 9.18182V9.90909C3.9 10.0538 3.80518 10.1925 3.6364 10.2948C3.46761 10.3971 3.23869 10.4545 3 10.4545C2.76131 10.4545 2.53239 10.3971 2.3636 10.2948C2.19482 10.1925 2.1 10.0538 2.1 9.90909V9.18182ZM2.1 12.0909C2.1 11.9462 2.19482 11.8075 2.3636 11.7052C2.53239 11.6029 2.76131 11.5455 3 11.5455C3.23869 11.5455 3.46761 11.6029 3.6364 11.7052C3.80518 11.8075 3.9 11.9462 3.9 12.0909V12.8182C3.9 12.9628 3.80518 13.1016 3.6364 13.2039C3.46761 13.3062 3.23869 13.3636 3 13.3636C2.76131 13.3636 2.53239 13.3062 2.3636 13.2039C2.19482 13.1016 2.1 12.9628 2.1 12.8182V12.0909Z"></path>
            <path fill="#151417" d="M15.3933 3.39612L8.39333 1.06269C8.2413 1.0121 8.0755 0.991627 7.91079 1.0031C7.74608 1.01458 7.58761 1.05764 7.44955 1.12844C7.31149 1.19924 7.19816 1.29557 7.1197 1.4088C7.04125 1.52202 7.00012 1.64862 7 1.77724V14.2222C7 14.4285 7.10536 14.6263 7.29289 14.7722C7.48043 14.9181 7.73478 15 8 15H15C15.2652 15 15.5196 14.9181 15.7071 14.7722C15.8946 14.6263 16 14.4285 16 14.2222V4.11067C16 3.95843 15.9425 3.80954 15.8347 3.6825C15.7268 3.55547 15.5734 3.45588 15.3933 3.39612ZM10.6667 11.3702C10.6667 11.5765 10.5613 11.7744 10.3738 11.9202C10.1862 12.0661 9.93188 12.148 9.66667 12.148C9.40145 12.148 9.1471 12.0661 8.95956 11.9202C8.77202 11.7744 8.66667 11.5765 8.66667 11.3702V10.3331C8.66667 10.1269 8.77202 9.92902 8.95956 9.78315C9.1471 9.63728 9.40145 9.55534 9.66667 9.55534C9.93188 9.55534 10.1862 9.63728 10.3738 9.78315C10.5613 9.92902 10.6667 10.1269 10.6667 10.3331V11.3702ZM10.6667 6.70337C10.6667 6.90966 10.5613 7.1075 10.3738 7.25336C10.1862 7.39923 9.93188 7.48118 9.66667 7.48118C9.40145 7.48118 9.1471 7.39923 8.95956 7.25336C8.77202 7.1075 8.66667 6.90966 8.66667 6.70337V5.66629C8.66667 5.46 8.77202 5.26216 8.95956 5.11629C9.1471 4.97043 9.40145 4.88848 9.66667 4.88848C9.93188 4.88848 10.1862 4.97043 10.3738 5.11629C10.5613 5.26216 10.6667 5.46 10.6667 5.66629V6.70337Z"></path>
          </svg>
          <span>Companies ({companies})</span>
        </div>
      </div>
    </div>
  );
};

export default Contactandcompany;
