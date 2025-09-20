// Vercel Analytics Integration

// Import the Analytics package from node_modules
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
document.addEventListener('DOMContentLoaded', function() {
    // Inject the analytics script into the page
    inject();
    
    console.log('Vercel Analytics initialized');
});