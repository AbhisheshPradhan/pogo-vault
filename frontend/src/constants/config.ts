// Centralized place to handle env variables
export const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:4000';

// You can also add other global configs here
export const IS_PRODUCTION = import.meta.env.PROD;
export const TIMEOUT_MS = 5000;
