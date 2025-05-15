import React, { useState, useEffect } from 'react';
import PatientHistory from './PatientHistory';

interface PatientDetailsProps {
  patientId: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patientId }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    console.log('PatientDetails: Active tab changed to', activeTab);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    console.log('PatientDetails: Switching to tab', tab);
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Patient Details</h1>
      </div>

      <div className="flex-1">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <a
              href="#"
              className={`${
                activeTab === 'overview'
                  ? 'border-[#014B6E] text-[#014B6E]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              onClick={() => handleTabChange('overview')}
            >
              Overview
            </a>
            <a
              href="#"
              className={`${
                activeTab === 'visits'
                  ? 'border-[#014B6E] text-[#014B6E]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              onClick={() => handleTabChange('visits')}
            >
              Visits
            </a>
            <a
              href="#"
              className={`${
                activeTab === 'history'
                  ? 'border-[#014B6E] text-[#014B6E]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
              onClick={() => handleTabChange('history')}
            >
              History
            </a>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div>Overview content</div>
          )}
          {activeTab === 'visits' && (
            <div>Visits content</div>
          )}
          {activeTab === 'history' && (
            <PatientHistory patientId={patientId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails; 