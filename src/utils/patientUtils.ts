import { getNumberFromString } from './stringUtils';

export const generateFavoriteNotes = (patientName: string, patientId: string): string[] => {
  const notes: string[] = [];
  
  // Add condition-based notes
  if (getNumberFromString(patientId + '1', 2) === 0) {
    notes.push('Allergic to aloe');
  }
  if (getNumberFromString(patientId + '2', 2) === 0) {
    notes.push('Pregnant');
  }
  if (getNumberFromString(patientId + '3', 2) === 0) {
    notes.push('Prefers morning appointments');
  }
  if (getNumberFromString(patientId + '4', 2) === 0) {
    notes.push('Service dog present');
  }
  if (getNumberFromString(patientId + '5', 2) === 0) {
    notes.push('Requires wheelchair access');
  }

  return notes;
}; 