import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Permission } from "appwrite";  // Remove Role

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // -------------------- POST CRUD --------------------

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log("createPost userId:", userId);
      // Use string literals – these are 100% compatible with free tier
      const permissions = [
        Permission.read("users"),                      // any logged-in user
        Permission.update(`user:${userId}`),           // only author
        Permission.delete(`user:${userId}`)            // only author
      ];
      console.log("Permissions array:", permissions);

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, slug, content, featuredImage, status, userId },
        permissions
      );
    } catch (error) {
      console.error("Service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(documentId, data, userId) {
  try {
    // Re‑apply permissions using valid string literals
    const permissions = [
      Permission.read("users"),               // any logged‑in user can read
      Permission.update(`user:${userId}`),    // only author can update
      Permission.delete(`user:${userId}`)     // only author can delete
    ];
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentId,
      data,
      permissions
    );
  } catch (error) {
    console.error("Service :: updatePost error:", error.message);
    throw new Error(`Failed to update post: ${error.message}`);
  }
}

  async deletePost(documentId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
      return true;
    } catch (error) {
      console.error("Service :: deletePost error:", error.message);
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("Service :: getPost error:", error.message);
      return null;
    }
  }

  async getPostBySlug(slug) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("slug", slug), Query.limit(1)]
      );
      return response.documents[0] || null;
    } catch (error) {
      console.error("Service :: getPostBySlug error:", error.message);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Service :: getPosts error:", error.message);
      return null;
    }
  }

  async getUserPosts(userId, queries = []) {
    try {
      const userPostsQuery = [Query.equal("userId", userId), ...queries];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        userPostsQuery
      );
    } catch (error) {
      console.error("Service :: getUserPosts error:", error.message);
      return null;
    }
  }

  // -------------------- FILE STORAGE --------------------

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Service :: uploadFile error:", error.message);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Service :: deleteFile error:", error.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  getFileDownload(fileId) {
    return this.bucket.getFileDownload(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;