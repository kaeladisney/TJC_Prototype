export const getNumberFromString = (str: string, mod: number): number => {
  // Convert string to a number using character codes
  const numericValue = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Return the value modulo mod
  return numericValue % mod;
}; 