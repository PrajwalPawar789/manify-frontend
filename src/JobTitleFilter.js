import { Disclosure } from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import filters from './filters';
import * as XLSX from 'xlsx';
import { useState } from "react";

const JobTitleFilter = ({ selectedTitles, handleTitleSelection, handleTitleSelection1, handleTitleSelection3, handleTitleSelection4 , handleTitleSearchChange, titleSearchTerm }) => {
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);


  const jobTitleFilter = filters.find((f) => f.id === "title");
  const filteredJobTitleOptions = jobTitleFilter.options.filter((option) =>
    option.label.toLowerCase().includes(titleSearchTerm)
  );

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      parseExcel(file);
    }
  };

  const handleFileChange1 = (event) => {
    const file1 = event.target.files[0];
    if (file1) {
      setFile1(file1);
      parseExcel1(file1);
    }
  };

  const handleFileChange3 = (event) => {
    const file3 = event.target.files[0];
    if (file3) {
      setFile3(file3);
      parseExcel3(file3);
    }
  };

  const handleFileChange4 = (event) => {
    const file4 = event.target.files[0];
    if (file4) {
      setFile4(file4);
      parseExcel4(file4);
    }
  };

  // Parse the Excel file and update the job titles
const parseExcel1 = (file1) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const ab = e.target.result;
    const wb = XLSX.read(ab, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    console.log("Excel Data:", data); // Debugging: log the raw data

    // Extract all job titles from the first column
    const titles = data.flat().map(row => row?.toString().trim()).filter(title => title);

    console.log("Extracted Titles Excluding:", titles); // Debugging: log the extracted titles

    // Update the state with new titles
    handleTitleSelection1(titles); // Pass the array directly
  };
  reader.readAsArrayBuffer(file1);
};

const parseExcel3 = (file3) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const ab = e.target.result;
    const wb = XLSX.read(ab, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    console.log("Excel Data:", data); // Debugging: log the raw data

    // Extract all job titles from the first column
    const titles = data.flat().map(row => row?.toString().trim()).filter(title => title);

    console.log("Extracted Titles Including fuzzy:", titles); // Debugging: log the extracted titles

    // Update the state with new titles
    handleTitleSelection3(titles); // Pass the array directly
  };
  reader.readAsArrayBuffer(file3);
};

const parseExcel4 = (file4) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const ab = e.target.result;
    const wb = XLSX.read(ab, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    console.log("Excel Data:", data); // Debugging: log the raw data

    // Extract all job titles from the first column
    const titles = data.flat().map(row => row?.toString().trim()).filter(title => title);

    console.log("Extracted Titles Excluding Fuzzy:", titles); // Debugging: log the extracted titles

    // Update the state with new titles
    handleTitleSelection4(titles); // Pass the array directly
  };
  reader.readAsArrayBuffer(file4);
};

  // Parse the Excel file and update the job titles
  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  
      console.log("Excel Data:", data); // Debugging: log the raw data
  
      // Extract all job titles from the first column
      const titles = data.flat().map(row => row?.toString().trim()).filter(title => title);
  
      console.log("Extracted Titles:", titles); // Debugging: log the extracted titles
  
      // Update the state with new titles
      handleTitleSelection(titles); // Pass the array directly
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Disclosure as="div" key="title" className="border-b border-gray-200 py-4">
      {({ open }) => (
        <>
          <h3 className="flow-root">
            <Disclosure.Button className="py-2 flex justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>Job Title</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          {selectedTitles.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 mt-2">
              {selectedTitles.map((title) => (
                <span key={title} className="flex items-center gap-2 bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {title}
                  <XMarkIcon
                    className="cursor-pointer h-4 w-4"
                    onClick={() => handleTitleSelection(title)}
                  />
                </span>
              ))}
            </div>
          )}
          <Disclosure.Panel className="pt-4">
            <div className="pb-2">
              <input
                type="text"
                placeholder="Search job titles"
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleTitleSearchChange}
                value={titleSearchTerm}
              />
              
            </div>
            <span>Including Title Exact Match</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Including Title Fuzzy Match</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange3}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Excluding Title Exact Match</span>

            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange1}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <span>Excluding Title Fuzzy Match</span>
            <div className="pb-2">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange4}
                className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              <div className="space-y-2">
                {filteredJobTitleOptions.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-title-${optionIdx}`}
                      name="title[]"
                      value={option.value}
                      type="checkbox"
                      checked={selectedTitles.includes(option.value)}
                      onChange={() => handleTitleSelection(option.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`filter-title-${optionIdx}`} className="ml-3 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default JobTitleFilter;
