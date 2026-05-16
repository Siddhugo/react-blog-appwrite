import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

/**
 * AuthService handles user registration, login, logout, and session management.
 * All methods are compatible with Appwrite's free tier.
 */
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  /**
   * Create a new user account and automatically log them in.
   * @param {Object} params - User details
   * @param {string} params.email - User's email
   * @param {string} params.password - User's password
   * @param {string} params.name - User's full name
   * @returns {Promise<Object>} The user session or throws error
   */
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        throw new Error("Account creation failed – no user returned");
      }

      // Auto-login after successful signup
      return await this.login({ email, password });
    } catch (error) {
      console.error("[AuthService] createAccount failed:", error.message);
      throw new Error(error.message || "Could not create account");
    }
  }

  /**
   * Log in an existing user.
   * @param {Object} params - Login credentials
   * @param {string} params.email
   * @param {string} params.password
   * @returns {Promise<Object>} The user session
   */
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("[AuthService] login failed:", error.message);
      throw new Error(error.message || "Invalid email or password");
    }
  }

  /**
   * Get the currently logged-in user.
   * Returns null if no session exists (silent fail).
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // No active session – this is not an error, just return null
      return null;
    }
  }

  /**
   * Log out the current user by deleting their active session.
   * @returns {Promise<boolean>} True if logout succeeded, false otherwise
   */
  async logout() {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("[AuthService] logout failed:", error.message);
      return false;
    }
  }
}

// Export a singleton instance
const authService = new AuthService();
export default authService;