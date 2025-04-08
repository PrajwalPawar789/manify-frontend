// MSFTFilter.js
import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import filters from './filters';

const MSFTFilter = ({ selectedClients, handleClientSelection, handleClientSearchChange, clientSearchTerm }) => {
  const msftFilter = filters.find((f) => f.id === "msft_non_msft");
  const filteredClientOptions = msftFilter.options.filter((option) =>
    option.label.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  return (
    <Disclosure as="div" key="msft_non_msft" className="border-b border-gray-200 py-4">
      {({ open }) => (
        <>
          <h3 className="flow-root">
            <Disclosure.Button className="py-2 flex justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>Client Type</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          {selectedClients.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 mt-2">
              {selectedClients.map((client) => (
                <span key={client} className="flex items-center gap-2 bg-green-50 text-green-800 text-sm px-3 py-1 rounded-full">
                  {client}
                  <XMarkIcon
                    className="cursor-pointer h-4 w-4"
                    onClick={() => handleClientSelection(client)}
                  />
                </span>
              ))}
            </div>
          )}
          <Disclosure.Panel className="pt-4">
            <div className="pb-2">
              <input
                type="text"
                placeholder="Search client types"
                className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleClientSearchChange}
                value={clientSearchTerm}
              />
            </div>
            <div className="max-h-60 overflow-y-auto">        
              <div className="space-y-2">
                {filteredClientOptions.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-client-${optionIdx}`}
                      name="client-type"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      onChange={() => handleClientSelection(option.value)}
                      checked={selectedClients.includes(option.value)}
                    />
                    <label htmlFor={`filter-client-${optionIdx}`} className="ml-3 text-sm text-gray-600">
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

export default MSFTFilter;
