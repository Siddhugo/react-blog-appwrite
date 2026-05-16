/**
 * Configuration object for Appwrite.
 * All values are read from Vite environment variables (import.meta.env).
 * Required variables are validated at startup.
 */

// List of required environment variable names
const requiredEnvVars = [
  "VITE_APPWRITE_URL",
  "VITE_APPWRITE_PROJECT_ID",
  "VITE_APPWRITE_DATABASE_ID",
  "VITE_APPWRITE_COLLECTION_ID",
  "VITE_APPWRITE_BUCKET_ID",
];

// Collect any missing variables
const missing = requiredEnvVars.filter(key => !import.meta.env[key]);

if (missing.length > 0) {
  throw new Error(
    `❌ Missing required environment variable(s):\n${missing.join("\n")}\n\n` +
    `Please check your .env file and restart the dev server.`
  );
}

// Optional: warn about common typos (e.g., VITE_APPWRITE_URL vs VITE_APPWRITE_URL_)
const allEnvKeys = Object.keys(import.meta.env);
requiredEnvVars.forEach(required => {
  const similar = allEnvKeys.find(key => 
    key !== required && key.toLowerCase().includes(required.toLowerCase())
  );
  if (similar) {
    console.warn(`⚠️ Did you mean "${required}"? Found "${similar}" in env.`);
  }
});

/**
 * @typedef {Object} AppwriteConfig
 * @property {string} appwriteUrl - Appwrite endpoint URL
 * @property {string} appwriteProjectId - Appwrite project ID
 * @property {string} appwriteDatabaseId - Database ID
 * @property {string} appwriteCollectionId - Collection ID (for posts)
 * @property {string} appwriteBucketId - Storage bucket ID (for images)
 */

/** @type {AppwriteConfig} */
const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

// Freeze to prevent accidental modifications
export default Object.freeze(conf);