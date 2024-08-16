import { Disclosure } from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import * as XLSX from 'xlsx';
import { useState } from "react";

const CompanyNameFilter = ({ selectedCompanies, handleCompanySelection, handleCompanySelection1, handleCompanySelection3, handleCompanySelection4, handleCompanySearchChange, companySearchTerm }) => {
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);

  // Handle file input change for included companies
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      parseExcel(file, false); // false indicates inclusion
    }
  };

  // Handle file input change for excluded companies
  const handleFileChange1 = (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile1(file1);
      parseExcel(file1, true); // true indicates exclusion
    }
  };

  const handleFileChange3 = (event) => {
    const file3 = event.target.files[0];
    if (file3) {
      setFile3(file3);
      parseExcel3(file3, false); // true indicates exclusion
    }
  };

  const handleFileChange4 = (event) => {
    const file4 = event.target.files[0];
    if (file4) {
      setFile4(file4);
      parseExcel3(file4, true); // true indicates exclusion
    }
  };

  // Parse the Excel file and update the company names
  const parseExcel = (file, isExcluded) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      console.log("Excel Data:", data); // Debugging: log the raw data

      // Extract all company names from the first column
      const companies = data.flat().map(row => row?.toString().trim()).filter(company => company);

      console.log("Extracted Companies:", companies); // Debugging: log the extracted companies

      // Update the state with new companies
      if (isExcluded) {
        handleCompanySelection1(companies); // Pass the array for exclusion
      } else {
        handleCompanySelection(companies); // Pass the array for inclusion
      }
    };
    reader.readAsArrayBuffer(file);
  };

    // Parse the Excel file and update the company names
    const parseExcel3 = (file, isExcluded) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
        console.log("Excel Data:", data); // Debugging: log the raw data
  
        // Extract all company names from the first column
        const companies = data.flat().map(row => row?.toString().trim()).filter(company => company);
  
        console.log("Extracted Companies:", companies); // Debugging: log the extracted companies
  
        // Update the state with new companies
        if (isExcluded) {
          handleCompanySelection4(companies); // Pass the array for exclusion
        } else {
          handleCompanySelection3(companies); // Pass the array for inclusion
        }
      };
      reader.readAsArrayBuffer(file);
    };

  return (
    <Disclosure as="div" key="company" className="border-b border-gray-200 py-4">
      {({ open }) => (
        <>
          <h3 className="flow-root">
            <Disclosure.Button className="py-2 flex justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>Company Name</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          {selectedCompanies.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 mt-2">
              {selectedCompanies.map((company) => (
                <span key={company} className="flex items-center gap-2 bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {company}
                  <XMarkIcon
                    className="cursor-pointer h-4 w-4"
                    onClick={() => handleCompanySelection([company], false)} // For inclusion
                  />
                </span>
              ))}
            </div>
          )}
          <Disclosure.Panel className="pt-4">
            <div className="pb-2">
              <input
                type="text"
                placeholder="Search company names"
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleCompanySearchChange}
                value={companySearchTerm}
              />
            </div>
            <span>Including Company</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Excluding Company</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange1}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Including Domain Name</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange3}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Excluding Domain Name</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange4}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default CompanyNameFilter;
