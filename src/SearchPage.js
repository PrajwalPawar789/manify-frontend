import { useState, useEffect } from "react";
import ProspectTable from "./ProspectTable";
import Loader from "./Loader";
import Contactandcompany from "./contactandcompany";
import IndustryFilter from "./IndustryFilter";
import JobTitleFilter from "./JobTitleFilter";
import Navbar from "./Navbar";
import CountryFilter from "./CountryFilter";
import JobLevelFilter from "./JobLevelFilter";
import JobFunctionFilter from "./JobFunctionFilter";
import EmployeeSizeFilter from "./EmployeeSizeFilter";
import CompanyNameFilter from "./CompanyNameFilter";
import Sub_Industry from "./Sub_Industry";
import Region from "./Region";
import * as XLSX from "xlsx";
import LeadTaggingFilter from "./LeadTaggingFilter";
import ClientCodeFilter from "./ClientCodeFilter";
import MSFTFilter from "./MSFTFilter";

export default function SearchPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSubIndustries, setSelectedSubIndustries] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedTitles1, setSelectedTitles1] = useState([]);
  const [selectedTitles3, setSelectedTitles3] = useState([]);
  const [selectedTitles4, setSelectedTitles4] = useState([]);
  const [selectedClientCodes, setSelectedClientCodes] = useState([]);
  const [clientCodeSearchTerm, setClientCodeSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [fetchedProspects, setFetchedProspects] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");
  const [SubindustrySearchTerm, setSubIndustrySearchTerm] = useState("");
  const [titleSearchTerm, setTitleSearchTerm] = useState("");
  const [functionSearchTerm, setFunctionSearchTerm] = useState("");
  const [levelSearchTerm, setLevelSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [regionSearchTerm, setRegionSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [sizeSearchTerm, setSizeSearchTerm] = useState("");
  const [tagSearchTerm, setTagSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [selectedIncludedCompanies, setSelectedIncludedCompanies] = useState(
    []
  );
  const [selectedExcludedCompanies, setSelectedExcludedCompanies] = useState(
    []
  );
  const [selectedIncludedCompanies3, setSelectedIncludedCompanies3] = useState(
    []
  );
  const [selectedIncludedCompanies4, setSelectedIncludedCompanies4] = useState(
    []
  );

  const fetchFilteredProspects = async () => {
    setLoading(true);

    // Check if any filter is selected
    if (
      selectedIndustries.length > 0 ||
      selectedSubIndustries.length > 0 ||
      selectedTitles.length > 0 ||
      selectedTitles1.length > 0 ||
      selectedTitles3.length > 0 ||
      selectedTitles4.length > 0 ||
      selectedLevels.length > 0 ||
      selectedFunctions.length > 0 ||
      selectedSizes.length > 0 ||
      selectedTags.length > 0 ||
      companyName ||
      selectedCountry ||
      selectedRegion ||
      selectedState ||
      selectedCity ||
      selectedIncludedCompanies.length > 0 ||
      selectedExcludedCompanies.length > 0 ||
      selectedIncludedCompanies3.length > 0 ||
      selectedIncludedCompanies4.length > 0 ||
      selectedClientCodes.length > 0 ||
      selectedClients.length > 0
    ) {
      try {
        // First API call
        const response1 = await fetch(
          "http://192.168.1.36:5030/api/v1/fetchLeads",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedIndustries,
              selectedSubIndustries,
              selectedTitles,
              selectedTitles1,
              selectedTitles3,
              selectedTitles4,
              selectedLevels,
              selectedFunctions,
              selectedSizes,
              selectedTags,
              companyName,
              selectedCountry,
              selectedRegion,
              selectedState,
              selectedCity,
              selectedIncludedCompanies,
              selectedExcludedCompanies,
              selectedIncludedCompanies3,
              selectedIncludedCompanies4,
              selectedClientCodes,
              selectedClients,
            }),
          }
        );

        if (response1.ok) {
          const data1 = await response1.json();
          console.log("Fetched data from first API:", data1.data);
          if (data1.success) {
            setTotalContacts(data1.data[0].totalContacts);
            setTotalCompanies(data1.data[0].totalCompanies);
          } else {
            console.error(
              "Failed to fetch counts from first API:",
              data1.message
            );
          }
        } else {
          console.error("Failed to fetch prospects from first API");
        }

        // Second API call
        const response2 = await fetch(
          "http://192.168.1.36:5030/api/v1/fetchLeads2",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              selectedIndustries,
              selectedSubIndustries,
              selectedTitles,
              selectedTitles1,
              selectedTitles3,
              selectedTitles4,
              selectedLevels,
              selectedFunctions,
              selectedSizes,
              selectedTags,
              companyName,
              selectedCountry,
              selectedRegion,
              selectedState,
              selectedCity,
              selectedIncludedCompanies,
              selectedExcludedCompanies,
              selectedIncludedCompanies3,
              selectedIncludedCompanies4,
              selectedClientCodes,
              selectedClients,
            }),
          }
        );

        if (response2.ok) {
          const data2 = await response2.json();
          setFetchedProspects(data2.data);

          console.log("Fetched data from second API:", data2.data);
          // Handle data from the second API call as needed
        } else {
          console.error("Failed to fetch prospects from second API");
        }
      } catch (error) {
        console.error("Error during API fetch:", error);
      }
    } else {
      console.log("No filters selected, skipping API calls...");
      setFetchedProspects([]); // Clear results when no filters are selected
    }

    setLoading(false);
  };

  const handleSearch = () => {
    setSearchClicked(true);
  };

  useEffect(() => {
    if (isSearchTriggered) {
      fetchFilteredProspects();
      setIsSearchTriggered(false);
    }
  }, [isSearchTriggered]);

  const [campaignId, setCampaignId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Step 1: Prompt for Campaign ID
      const campaignId = prompt("Enter Campaign ID:");
      if (!campaignId) {
        alert("Campaign ID is required.");
        setIsLoading(false);
        return; // Stop further execution
      }

      // Step 2: Retrieve the username from session (adjust as needed)
      const username = sessionStorage.getItem("username") || "Unknown User";

      // Step 3: Get the contact and company counts from your state
      const contactCount = totalContacts;
      const companyCount = totalCompanies;

      // Step 4: Prompt for Comment
      const comment = prompt("Enter a comment:");
      if (!comment) {
        alert("Comment is required.");
        setIsLoading(false);
        return; // Stop further execution
      }

      // Step 5: Get the current timestamp
      const timestamp = new Date().toISOString();

      // Step 6: Log the data to the console for debugging
      console.log({
        campaignId,
        username,
        contactCount,
        companyCount,
        timestamp,
        comment,
      });

      // Step 7: Send data to the backend for insertion into the database
      const logResponse = await fetch(
        "http://192.168.1.36:5030/api/v1/logCampaignData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId,
            username,
            contactCount,
            companyCount,
            comment,
          }),
        }
      );

      const logData = await logResponse.json();
      if (!logData.success) {
        console.error("Failed to insert log:", logData.message);
        alert("Failed to log campaign data.");
        setIsLoading(false);
        return; // Stop further execution
      }

      console.log("Log inserted successfully:", logData);

      // Step 8: Proceed with the file download process
      const downloadResponse = await fetch(
        "http://192.168.1.36:5030/api/v1/fetchLeads1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedIndustries,
            selectedSubIndustries,
            selectedTitles,
            selectedTitles1,
            selectedTitles3,
            selectedTitles4,
            selectedLevels,
            selectedFunctions,
            selectedSizes,
            selectedTags,
            companyName,
            selectedCountry,
            selectedRegion,
            selectedState,
            selectedCity,
            selectedIncludedCompanies,
            selectedExcludedCompanies,
            selectedIncludedCompanies3,
            selectedIncludedCompanies4,
            selectedClientCodes,
            selectedClients,
          }),
        }
      );

      if (downloadResponse.ok) {
        const downloadData = await downloadResponse.json();
        if (downloadData.success) {
          if (totalContacts > 300000) {
            alert(
              `Cannot download. The record count is ${downloadData.totalRecords}, which exceeds the limit of 200,000.`
            );
          } else {
            // Convert JSON data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(downloadData.data);

            // Convert the worksheet to CSV
            const csvContent = XLSX.utils.sheet_to_csv(worksheet);

            // Create a Blob from the CSV content
            const blob = new Blob([csvContent], {
              type: "text/csv;charset=utf-8;",
            });

            // Create a download link and trigger the download
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "filtered_prospects.csv"; // Set the filename for the CSV
            a.click();
            URL.revokeObjectURL(url); // Clean up the object URL
          }
        } else {
          console.error("Failed to fetch data for download");
          alert("Failed to fetch data for download.");
        }
      } else {
        console.error("Failed to fetch data");
        alert("Failed to fetch data from the server.");
      }
    } catch (error) {
      console.error("Error during download:", error);
      alert("An error occurred during the download process.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustrySelection = (selectedOption) => {
    console.log("Selected industry:", selectedOption);
    setSelectedIndustries((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((industry) => industry !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleSubIndustrySelection = (selectedOption) => {
    console.log("Selected industry:", selectedOption);
    setSelectedSubIndustries((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((industry) => industry !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleClientSearchChange = (event) => {
    setClientSearchTerm(event.target.value.toLowerCase());
  };

  const handleClientSelection = (selectedOption) => {
    console.log("Selected client type:", selectedOption);
    setSelectedClients((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((client) => client !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleTitleSelection = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setSelectedTitles(selectedOption);
    } else {
      setSelectedTitles((prevSelected) =>
        prevSelected.includes(selectedOption)
          ? prevSelected.filter((title) => title !== selectedOption)
          : [...prevSelected, selectedOption]
      );
    }
  };

  const handleClientCodeSelection = (selectedOption) => {
    console.log("Selected client code:", selectedOption);
    setSelectedClientCodes((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((code) => code !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleClientCodeSearchChange = (event) => {
    setClientCodeSearchTerm(event.target.value.toLowerCase());
  };

  const handleCompanySelection = (companies) => {
    // Handle the selection of included companies
    setSelectedIncludedCompanies(companies);
  };

  const handleCompanySelection3 = (companies) => {
    // Handle the selection of included companies
    setSelectedIncludedCompanies3(companies);
  };

  const handleCompanySelection4 = (companies) => {
    // Handle the selection of included companies
    setSelectedIncludedCompanies4(companies);
  };

  const handleCompanySelection1 = (companies) => {
    // Handle the selection of excluded companies
    setSelectedExcludedCompanies(companies);
  };

  const handleTitleSelection1 = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setSelectedTitles1(selectedOption);
    } else {
      setSelectedTitles1((prevSelected) =>
        prevSelected.includes(selectedOption)
          ? prevSelected.filter((title) => title !== selectedOption)
          : [...prevSelected, selectedOption]
      );
    }
  };

  const handleTitleSelection3 = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setSelectedTitles3(selectedOption);
    } else {
      setSelectedTitles3((prevSelected) =>
        prevSelected.includes(selectedOption)
          ? prevSelected.filter((title) => title !== selectedOption)
          : [...prevSelected, selectedOption]
      );
    }
  };

  const handleTitleSelection4 = (selectedOption) => {
    if (Array.isArray(selectedOption)) {
      setSelectedTitles4(selectedOption);
    } else {
      setSelectedTitles4((prevSelected) =>
        prevSelected.includes(selectedOption)
          ? prevSelected.filter((title) => title !== selectedOption)
          : [...prevSelected, selectedOption]
      );
    }
  };

  const handleSizeSelection = (selectedOption) => {
    setSelectedSizes((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((size) => size !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleTagSelection = (selectedOption) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((size) => size !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleSizeSearchChange = (event) => {
    setSizeSearchTerm(event.target.value.toLowerCase());
  };

  const handleTagSearchChange = (event) => {
    setTagSearchTerm(event.target.value.toLowerCase());
  };

  const handleFunctionSelection = (selectedOption) => {
    console.log("Selected function:", selectedOption);
    setSelectedFunctions((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((func) => func !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleLevelSelection = (selectedOption) => {
    console.log("Selected level:", selectedOption);
    setSelectedLevels((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((level) => level !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleCountrySelection = (selectedOption) => {
    setSelectedCountry((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((country) => country !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleRegionSelection = (selectedOption) => {
    setSelectedRegion((prevSelected) =>
      prevSelected.includes(selectedOption)
        ? prevSelected.filter((country) => country !== selectedOption)
        : [...prevSelected, selectedOption]
    );
  };

  const handleCompanyNameSearchChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyNameInput = (companies, excluded) => {
    if (excluded) {
      setSelectedExcludedCompanies(companies);
    } else {
      setSelectedIncludedCompanies(companies);
    }
  };

  const handleIndustrySearchChange = (event) => {
    setIndustrySearchTerm(event.target.value.toLowerCase());
  };

  const handleSubIndustrySearchChange = (event) => {
    setSubIndustrySearchTerm(event.target.value.toLowerCase());
  };

  const handleTitleSearchChange = (event) => {
    setTitleSearchTerm(event.target.value.toLowerCase());
  };

  const handleFunctionSearchChange = (event) => {
    setFunctionSearchTerm(event.target.value.toLowerCase());
  };

  const handleLevelSearchChange = (event) => {
    setLevelSearchTerm(event.target.value.toLowerCase());
  };

  const handleCountrySearchChange = (event) => {
    setCountrySearchTerm(event.target.value.toLowerCase());
  };

  const handleRegionSearchChange = (event) => {
    setRegionSearchTerm(event.target.value.toLowerCase());
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="">
        <main className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8">
          <div className="flex gap-11 items-center border-b border-gray-200 pb-6 pt-14">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mr-4">
              Prospect Search
            </h1>

            {/* Contact and Company Component */}
            <Contactandcompany
              totalContacts={totalContacts}
              totalCompanies={totalCompanies}
            />

            <button
              onClick={handleDownload}
              className={`relative flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:from-blue-600 hover:to-blue-800 focus:outline-none ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0c-5.523 0-10 4.477-10 10h2zm2 5.291A7.952 7.952 0 014 12H2c0 2.21.896 4.21 2.344 5.656l1.656-1.365z"
                    ></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                "Download Excel"
              )}
            </button>

            {/* Go to 90 Days Active Data Button */}
            {/* <button
              onClick={() =>
                (window.location.href = "http://192.168.1.36:3033/search")
              }
              className="relative flex items-center bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-200 focus:outline-none"
            >
              Go to 90 Days Active Data
            </button> */}

            {/* Search Button */}
            <button
              onClick={() => setIsSearchTriggered(true)}
              className="relative flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-yellow-200 focus:outline-none "
            >
              Search
            </button>
          </div>

          <section aria-labelledby="prospects-heading" className="pb-24 pt-6">
            <h2 id="prospects-heading" className="sr-only">
              Prospects
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              {/* Filters */}
              <div className="col-span-4">
                <form className="hidden lg:grid grid-cols-2 items-start justify-start gap-4 h-[80vh] overflow-y-auto overflowHidden bg-gray-50 p-4 border border-gray-150 rounded-xl">
                  <h3 className="sr-only">Categories</h3>
                  <div>
                    <CompanyNameFilter
                      selectedCompanies={[]} // Pass any necessary prop or remove if not used
                      handleCompanySelection={handleCompanySelection}
                      handleCompanySelection1={handleCompanySelection1}
                      companySearchTerm={companyName}
                      handleCompanySearchChange={handleCompanyNameSearchChange}
                      handleCompanySelection3={handleCompanySelection3}
                      handleCompanySelection4={handleCompanySelection4}
                    />
                  </div>
                  <CountryFilter
                    selectedCountry={selectedCountry}
                    handleCountrySelection={handleCountrySelection}
                    handleCountrySearchChange={handleCountrySearchChange}
                    countrySearchTerm={countrySearchTerm}
                  />

                  <Sub_Industry
                    selectedSubIndustries={selectedSubIndustries}
                    handleSubIndustrySelection={handleSubIndustrySelection}
                    SubindustrySearchTerm={SubindustrySearchTerm}
                    handleSubIndustrySearchChange={
                      handleSubIndustrySearchChange
                    }
                  />
                  <JobTitleFilter
                    selectedTitles={selectedTitles}
                    handleTitleSelection={handleTitleSelection}
                    handleTitleSelection1={handleTitleSelection1}
                    handleTitleSelection3={handleTitleSelection3}
                    handleTitleSelection4={handleTitleSelection4}
                    titleSearchTerm={titleSearchTerm}
                    handleTitleSearchChange={handleTitleSearchChange}
                  />
                  <JobFunctionFilter
                    selectedFunctions={selectedFunctions}
                    handleFunctionSelection={handleFunctionSelection}
                    functionSearchTerm={functionSearchTerm}
                    handleFunctionSearchChange={handleFunctionSearchChange}
                  />
                  <JobLevelFilter
                    selectedLevels={selectedLevels}
                    handleLevelSelection={handleLevelSelection}
                    handleLevelSearchChange={handleLevelSearchChange}
                    levelSearchTerm={levelSearchTerm}
                  />
                  <EmployeeSizeFilter
                    selectedSizes={selectedSizes}
                    handleSizeSelection={handleSizeSelection}
                    sizeSearchTerm={sizeSearchTerm}
                    handleSizeSearchChange={handleSizeSearchChange}
                  />

                  <LeadTaggingFilter
                    selectedTags={selectedTags}
                    handleTagSelection={handleTagSelection}
                    handleTagSearchChange={handleTagSearchChange}
                    tagSearchTerm={tagSearchTerm}
                  />

                  <IndustryFilter
                    selectedIndustries={selectedIndustries}
                    handleIndustrySelection={handleIndustrySelection}
                    industrySearchTerm={industrySearchTerm}
                    handleIndustrySearchChange={handleIndustrySearchChange}
                  />
                  
                  <Region
                    selectedRegion={selectedRegion}
                    handleRegionSelection={handleRegionSelection}
                    handleRegionSearchChange={handleRegionSearchChange}
                    regionSearchTerm={regionSearchTerm}
                  />
                  <ClientCodeFilter
                    selectedClientCodes={selectedClientCodes}
                    handleClientCodeSelection={handleClientCodeSelection}
                    clientCodeSearchTerm={clientCodeSearchTerm}
                    handleClientCodeSearchChange={handleClientCodeSearchChange}
                  />
                  <MSFTFilter
                    selectedClients={selectedClients}
                    handleClientSelection={handleClientSelection}
                    clientSearchTerm={clientSearchTerm}
                    handleClientSearchChange={handleClientSearchChange}
                  />
                </form>
              </div>

              {/* <div className="lg:col-span-3">
                {loading ? (
                  <Loader />
                ) : (
                  <h1>successful</h1>
                  // <ProspectTable prospects={fetchedProspects} />
                )}
              </div> */}
              <div className="col-span-8 h-[80vh] overflow-y-auto overflowHidden ">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {fetchedProspects?.length > 0 ? (
                      <ProspectTable prospects={fetchedProspects} />
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center text-gray-500 mt-10">
                          <svg
                            className="w-24 h-24 animate-pulse"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <p className="mt-4 text-lg font-medium">
                            No results found
                          </p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
