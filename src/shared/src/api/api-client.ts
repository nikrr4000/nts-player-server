import { Site } from '../types/site';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

export const apiClient = {
  async getSiteScenarios(): Promise<Site> {
    const response = await fetch(`${API_URL}/repo`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  },
}