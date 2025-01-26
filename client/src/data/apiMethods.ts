import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API URL (you can set it in your config or environment variable)
const BASE_URL = 'https://www.lemiel.shop/api';
const AUTH_URL = 'https://www.lemiel.shop/auth'

// Generic function to handle all HTTP requests (fetch, create, modify, delete)
class ApiService {
  // Define a static method for handling all HTTP requests (fetch, create, modify, delete)
  static async apiRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: any,
    params?: any,
    useAuthUrl: boolean = false
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method,
      url: `${useAuthUrl ? AUTH_URL : BASE_URL}${endpoint}`,
      data,
      params,
      withCredentials: true
    };

    try {
      const response = await axios(config);
      return response;
    } catch (error: any) {
      console.error(`API request failed: ${error.message}`);
      throw error;
    }
  }

  // Static method to fetch data
  static async fetchData(endpoint: string, params?: any, useAuthUrl: boolean = false): Promise<AxiosResponse> {
    return await this.apiRequest('get', endpoint, undefined, params, useAuthUrl);
  }

  // Static method to create data
  static async createData(endpoint: string, data: any, useAuthUrl: boolean = false): Promise<AxiosResponse> {
    return await this.apiRequest('post', endpoint, data, undefined, useAuthUrl);
  }

  // Static method to update data
  static async updateData(endpoint: string, data: any, useAuthUrl: boolean = false): Promise<AxiosResponse> {
    return await this.apiRequest('put', endpoint, data, undefined, useAuthUrl);
  }

  // Static method to delete data
  static async deleteData(endpoint: string, useAuthUrl: boolean = false): Promise<AxiosResponse> {
    return await this.apiRequest('delete', endpoint, undefined, undefined, useAuthUrl);
  }
}

export class ProductsAPI extends ApiService{

  static async getRows(max_items = 8, page = 1){
    return await this.fetchData("/products", {max_items: max_items, page: page});
  }

  static async getRow(id: string){
    return await this.fetchData(`/products/${id}`);
  }

}

export class Brands extends ApiService{

    static async getRows(){
      return await this.fetchData("/brands");
    }
  
    static async getRow(id){
      return await this.fetchData(`/brands/${id}`);
    }
}

  export class CategoriesAPI extends ApiService{

    static async getRows(){
      return await this.fetchData("/categories");
    }
  
    static async getRow(id){
      return await this.fetchData(`/categories/${id}`);
    }
  
  }

export class AuthAPI extends ApiService {
  
  static async login(email: string, password: string): Promise<AxiosResponse> {
    return await this.createData('/login', { email, password }, true);
  }

  static async signUp(firstName: string, lastName: string, gender: string, numberPhone: string, email: string, password: string): Promise<AxiosResponse> {
    return await this.createData('/sign-up', { firstName, lastName, gender, numberPhone, email, password }, true);
  }

  static async verifySignUp(message: string): Promise<AxiosResponse> {
    return await this.fetchData('/sign-up/verify', { message }, true);
  }

  static async isLoggedIn(): Promise<AxiosResponse> {
    return await this.fetchData('/isloggedin', undefined, true);
  }

  static async oauthSuccess(): Promise<AxiosResponse> {
    return await this.fetchData('/oauth-success', undefined, true);
  }

  static async oauthFailed(): Promise<AxiosResponse> {
    return await this.fetchData('/oauth-failed', undefined, true);
  }

  static async logout(): Promise<AxiosResponse> {
    return await this.fetchData('/logout', undefined, true);
  }

  static async getProfile(): Promise<AxiosResponse> {
    return await this.fetchData('/profile', undefined, true);
  }
}