
// Import React to provide the React namespace for ReactNode types
import React from 'react';

export interface PreregistrationRequest {
  email: string;
}

export interface PreregistrationResponse {
  success: boolean;
  message: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ResearcherInfo {
  name: string;
  institution: string;
  currentFocus: string;
  bio: string;
}
