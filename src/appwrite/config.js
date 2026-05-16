import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

/**
 * Service layer for database (posts) and storage (images).
 * All methods use free-tier compatible permissions.
 * Assumes your Appwrite collections/buckets have proper read/write roles.
 */
export class Service {
  client = new Client();
  databases;
  bucket;

  // Collection attribute names as constants (avoids typos)
  static POST_ATTRIBUTES = {
    TITLE: "title",
    SLUG: "slug",
    CONTENT: "content",
    FEATURED_IMAGE: "featuredImage",
    STATUS: "status",
    USER_ID: "userId",
  };

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // -------------------- POST CRUD --------------------

  /**
   * Create a new blog post.
   * @param {Object} post - Post data
   * @returns {Promise<Object>} Created document
   */
async createPost({ title, slug, content, featuredImage, status, userId }) {
  try {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      ID.unique(),
      { title, slug, content, featuredImage, status, userId },
      [`user:${userId}`]  // 👈 This is the key: only this user can write (update/delete)
    );
  } catch (error) {
    console.error("Service :: createPost :: error", error);
    throw error;
  }
}

  /**
   * Update an existing post.
   * @param {string} documentId - Document ID to update
   * @param {Object} data - Partial data to update
   * @returns {Promise<Object>} Updated document
   */
  async updatePost(documentId, data) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        data
      );
    } catch (error) {
      console.error("[Service] updatePost error:", error.message);
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  /**
   * Delete a post by its document ID.
   * @param {string} documentId
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("[Service] deletePost error:", error.message);
      return false;
    }
  }

  /**
   * Fetch a single post by document ID.
   * @param {string} documentId
   * @returns {Promise<Object|null>} Post document or null
   */
  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("[Service] getPost error:", error.message);
      return null;
    }
  }

  /**
   * List all posts with optional queries.
   * Default query returns only active posts.
   * @param {Array} queries - Appwrite Query array (e.g., [Query.equal("status", "active")])
   * @returns {Promise<Object|null>} List of documents or null
   */
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("[Service] getPosts error:", error.message);
      return null;
    }
  }

  // -------------------- FILE UPLOAD (Storage) --------------------

  /**
   * Upload an image file to the storage bucket.
   * @param {File} file - The file object (from input)
   * @returns {Promise<Object|null>} File metadata or null
   */
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("[Service] uploadFile error:", error.message);
      return null;
    }
  }


  /**
 * Get a single post by its slug attribute.
 * @param {string} slug - The slug to search for.
 * @returns {Promise<Object|null>} First matching post or null.
 */
async getPostBySlug(slug) {
  try {
    const response = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      [Query.equal("slug", slug), Query.limit(1)]
    );
    return response.documents[0] || null;
  } catch (error) {
    console.error("[Service] getPostBySlug error:", error.message);
    return null;
  }
}



  /**
   * Delete a file from storage.
   * @param {string} fileId - File ID to delete
   * @returns {Promise<boolean>} True if deleted, false otherwise
   */
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("[Service] deleteFile error:", error.message);
      return false;
    }
  }

  /**
   * Get a preview URL for an image file.
   * Works with both public and authenticated files (if session is active).
   * For private files, ensure the user is logged in before using this URL.
   * @param {string} fileId
   * @returns {string} Preview URL
   */
  getFilePreview(fileId) {
    // The URL itself doesn't require a session; the actual request does.
    // If the bucket is private, the browser will send cookies automatically
    // when the user is logged in via Appwrite.
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  /**
   * Get a download URL for a file (forces download).
   * @param {string} fileId
   * @returns {string}
   */
  getFileDownload(fileId) {
    return this.bucket.getFileDownload(conf.appwriteBucketId, fileId);
  }

  // In appwrite/config.js
async getUserPosts(userId, queries = []) {
  try {
    const userPostsQuery = [Query.equal("userId", userId), ...queries];
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      userPostsQuery
    );
  } catch (error) {
    console.error("Service :: getUserPosts :: error", error);
    return null;
  }
}

}

// Singleton instance
const service = new Service();
export default service;