import { createClient } from '@blinkdotnew/sdk'

// Initialize Blink client with your project ID
export const blink = createClient({
  projectId: 'createbookai-clone-6pnf6tl3', // Your actual project ID
  authRequired: true // Users will be redirected to sign in automatically
})

// Export for easy access throughout the app
export default blink