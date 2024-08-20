import React, { useState } from "react";
import "./App.css"; // Adjust the path according to where your CSS file is located
import { FiMail, FiPhone, FiGlobe, FiLinkedin, FiMapPin } from "react-icons/fi";

const MAX_PAGE_NUMBERS_TO_SHOW = 5;
const ITEMS_PER_PAGE = 20;

const ProspectTable = ({ prospects }) => {
  const [expandedRowUuid, setExpandedRowUuid] = useState(null);

  const [selectedProspectDetails, setSelectedProspectDetails] = useState(null);

  const fetchProspectDetails = async (uuid) => {
    if (uuid === expandedRowUuid) {
      // Collapse the current row if it's already expanded
      setExpandedRowUuid(null);
      setSelectedProspectDetails(null);
    } else {
      // Fetch new details and expand the new row
      const response = await fetch(
        `http://localhost:5000/api/v1/prospectDetails/${uuid}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedProspectDetails(data.data);
        setExpandedRowUuid(uuid);
        console.log(selectedProspectDetails);
      } else {
        console.error("Failed to fetch prospect details");
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(prospects.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = prospects.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    let startPage = Math.max(currentPage - MAX_PAGE_NUMBERS_TO_SHOW, 1);
    let endPage = Math.min(startPage + MAX_PAGE_NUMBERS_TO_SHOW, totalPages);

    if (currentPage - 1 >= MAX_PAGE_NUMBERS_TO_SHOW) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className="rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out text-blue-600 bg-white"
        >
          1
        </button>
      );

      if (currentPage - 2 >= MAX_PAGE_NUMBERS_TO_SHOW) {
        pageNumbers.push(
          <span key={"start-ellipsis"} className="px-4 py-2 mx-1">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "text-blue-600 bg-white"
          } rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out`}
        >
          {i}
        </button>
      );
    }

    if (totalPages - currentPage >= MAX_PAGE_NUMBERS_TO_SHOW) {
      if (totalPages - currentPage - 1 >= MAX_PAGE_NUMBERS_TO_SHOW) {
        pageNumbers.push(
          <span key={"end-ellipsis"} className="px-4 py-2 mx-1">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="rounded-md px-4 py-2 mx-1 transition duration-300 ease-in-out text-blue-600 bg-white"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="bg-[#f6f6f6] shadow overflow-hidden rounded-md">
        <div className="overflow-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Job title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Industry
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Show details</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((prospect, index) => (
                <React.Fragment key={index}>
                  <tr className="hover:bg-gray-50">
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer"
                      title={prospect.contactName}
                    >
                      <div className="flex items-center">
                        <span className="truncate">{prospect.contactName}</span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer"
                      title={prospect.job_title}
                    >
                      <span className="truncate">{prospect.jobTitle}</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer"
                      title={prospect.company_name}
                    >
                      <span className="truncate">{prospect.companyName}</span>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-0 overflow-hidden text-ellipsis hover:text-blue-600 cursor-pointer"
                      title={prospect.industry}
                    >
                      <span className="truncate">{prospect.industry}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => fetchProspectDetails(prospect.sr_no)}
                        className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Show details
                      </button>
                    </td>
                  </tr>
                  {expandedRowUuid === prospect.uuid && (
                    <tr className="bg-gray-50">
                      <td
                        colSpan="5"
                        className="py-8 px-4 md:px-6 transition-all ease-in-out duration-500"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all ease-in-out duration-500">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl font-semibold text-gray-900">
                                {selectedProspectDetails?.firstname}{" "}
                                {selectedProspectDetails?.lastname}
                              </span>
                              <a
                                href={`${selectedProspectDetails?.linkedinlink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  <path d="M19.671 3H4.33A1.329 1.329 0 0 0 3 4.329V19.67A1.329 1.329 0 0 0 4.329 21H19.67A1.329 1.329 0 0 0 21 19.671V4.33A1.329 1.329 0 0 0 19.671 3zM8.365 18.334H5.659V9.738h2.706v8.596zM7.01 8.546a1.554 1.554 0 1 1 1.563-1.552A1.531 1.531 0 0 1 7.01 8.546zm11.33 9.795h-2.705v-4.696c0-1.385-.589-1.813-1.349-1.813-.802 0-1.59.605-1.59 1.848v4.661H9.99V9.744h2.602v1.191h.035c.262-.529 1.177-1.433 2.573-1.433 1.51 0 3.141.897 3.141 3.522l-.001 5.317z"></path>
                                </svg>
                              </a>
                            </div>
                            <div className="text-gray-700">
                              <div>{selectedProspectDetails?.jobTitle}</div>
                              <div>{selectedProspectDetails?.companyName}</div>
                            </div>
                            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                              <div>
                                <FiMail className="inline mr-1" />
                                <a
                                  href={`mailto:${selectedProspectDetails?.emailid}`}
                                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                                >
                                  {selectedProspectDetails?.emailid}
                                </a>
                              </div>
                              <div>
                                <FiPhone className="inline mr-1" />
                                <span>
                                  {selectedProspectDetails?.directnumber ||
                                    "N/A"}
                                </span>
                              </div>
                              <div>
                                <FiPhone className="inline mr-1" />
                                <span>
                                  {selectedProspectDetails?.phonenumber ||
                                    "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 ease-in-out">
                            <div className="mb-4">
                              <div className="font-bold text-xl text-gray-900 mb-2">
                                {selectedProspectDetails?.company_name}
                              </div>
                              <p className="text-gray-800 text-base">
                                <FiGlobe className="inline mr-1" />
                                <a
                                  href={`https://${selectedProspectDetails?.domain}`}
                                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                                >
                                  {selectedProspectDetails?.domain}
                                </a>
                              </p>
                              <p className="text-gray-700 text-sm mt-3">
                                <FiMapPin className="inline mr-1" />
                                {selectedProspectDetails?.city},{" "}
                                {selectedProspectDetails?.state},{" "}
                                {selectedProspectDetails?.country}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                                {selectedProspectDetails?.industrytype},{" "}
                                {selectedProspectDetails?.subindustry}
                              </span>
                              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">
                                {selectedProspectDetails?.employeesize} employee
                                headcount
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination section */}
      <div className="py-3 flex items-center justify-between">
        {/* Previous Button */}
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            &lt;
          </button>
        )}

        {/* Page Numbers */}
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {renderPageNumbers()}
        </nav>

        {/* Next Button */}
        {currentPage !== totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="relative inline-flex items-center px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
};

export default ProspectTable;