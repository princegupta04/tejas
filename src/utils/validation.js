// Validation utilities for mobile OTP authentication

export const isValidMobile = (mobile) => {
  // Remove all non-digit characters
  const cleanMobile = mobile.replace(/\D/g, '');
  
  // Check if it's a valid 10-digit mobile number (can be extended for international)
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(cleanMobile);
};

export const formatMobile = (mobile) => {
  // Remove all non-digit characters
  const cleanMobile = mobile.replace(/\D/g, '');
  
  // Format as +91 XXXXX XXXXX for display
  if (cleanMobile.length === 10) {
    return `+91 ${cleanMobile.slice(0, 5)} ${cleanMobile.slice(5)}`;
  }
  
  return mobile;
};

export const cleanMobile = (mobile) => {
  // Remove all non-digit characters and return clean mobile number
  return mobile.replace(/\D/g, '');
};

export const maskMobile = (mobile) => {
  // Mask mobile number for display: +91 XXXXX XX789
  const cleanNumber = cleanMobile(mobile);
  if (cleanNumber.length === 10) {
    return `+91 ${cleanNumber.slice(0, 5)} XX${cleanNumber.slice(-3)}`;
  }
  return mobile;
};