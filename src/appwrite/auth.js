import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession();
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }

    async createAccount({email, password, name}) {
        try {
            const userData = await this.account.create(ID.unique(), email, password, name);
            if(userData) {
                await this.login({email, password});
            }
            else {
                return userData;
            }
        } catch (error) {
            console.error("Account creation error:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;