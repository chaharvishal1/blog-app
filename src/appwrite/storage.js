import config from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class StorageService {
    client = new Client();
    databases;
    bucket

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug, title, content, featureImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featureImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            );
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                slug
            );
            return true
        } catch (error) {
            console.error("Error deleting post:", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabase,
                config.appwriteCollection,
                slug
            );
        } catch (error) {
            console.error("Error fetching post:", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabase,
                config.appwriteCollection,
                queries
            );
        } catch (error) {
            console.error("Error fetching posts:", error);
            return false
        }
    }

    // Image file handling methods

    async uploadImage(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucket,
                ID.unique(),
                file
            )
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    async deleteImage(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucket,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Error deleting image:", error);
            return false;
        }
    }

    imagePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucket,
            fileId
        );
    }

}

const storageService = new StorageService();

export default storageService;