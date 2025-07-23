/**
 * Webflow Bits - Development Entry Point
 * This file is for local development and testing
 * For CDN usage, use webflow-bits.js instead
 */

import webflowBits from './webflow-bits.js';

// Auto-initialize for development with debug enabled
webflowBits.init({ 
  debug: true,
  autoInit: true 
});

// Export for consistency
export default webflowBits;