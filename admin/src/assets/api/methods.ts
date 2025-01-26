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
    params?: any
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method,
      url: `${BASE_URL}${endpoint}`,
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
  static async fetchData(endpoint: string, params?: any): Promise<AxiosResponse> {
    return await this.apiRequest('get', endpoint, undefined, params);
  }

  // Static method to create data
  static async createData(endpoint: string, data: any): Promise<AxiosResponse> {
    return await this.apiRequest('post', endpoint, data);
  }

  // Static method to update data
  static async updateData(endpoint: string, data: any): Promise<AxiosResponse> {
    return await this.apiRequest('put', endpoint, data);
  }

  // Static method to delete data
  static async deleteData(endpoint: string): Promise<AxiosResponse> {
    return await this.apiRequest('delete', endpoint);
  }
}

export class BrandsAPI extends ApiService{
  static async getAllRowsUnpaginated(){
    return await this.fetchData("/brands?max_items=1000");
  }

  static async getRows(){
    return await this.fetchData("/brands");
  }

  static async getRow(id){
    return await this.fetchData(`/brands/${id}`);
  }

  static async createRow(data){
    return await this.createData("/brands", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/brands/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/brands/${id}`);
  }
}

export class ProductsAPI extends ApiService{
  static async getAllRowsUnpaginated(){
    return await this.fetchData("/products?max_items=1000");
  }

  static async getRows(max_items = 10, page = 1){
    return await this.fetchData("/products", { max_items: max_items, page: page});
  }

  static async getRow(id){
    return await this.fetchData(`/products/${id}`);
  }

  static async createRow(data){
    return await this.createData("/products", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/products/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/products/${id}`);
  }
}

// TODO: make sure they can handle file in axios
export class CategoriesAPI extends ApiService{
  static async getAllRowsUnpaginated(){
    return await this.fetchData("/categories?max_items=1000");
  }

  static async getRows(max_items = 10, page = 1){
    return await this.fetchData("/categories", {max_items: max_items, page: page});
  }

  static async getRow(id){
    return await this.fetchData(`/categories/${id}`);
  }

  static async createRow(data){
    return await this.createData("/categories", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/categories/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/categories/${id}`);
  }
}


export class Product_typesAPI extends ApiService{
  static async getAllRowsUnpaginated(){
    return await this.fetchData("/product-types?max_items=1000");
  }

  static async getRows(){
    return await this.fetchData("/product-types");
  }

  static async getRow(id){
    return await this.fetchData(`/product-types/${id}`);
  }

  static async createRow(data){
    return await this.createData("/product-types", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/product-types/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/product-types/${id}`);
  }
}

export class CouponAPI extends ApiService{
  static async getRows(max_items = 10, page = 1){
    return await this.fetchData("/coupons", {max_items, page});
  }

  static async getRow(id){
    return await this.fetchData(`/coupons/${id}`);
  }

  static async createRow(data){
    return await this.createData("/coupons", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/coupons/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/coupons/${id}`);
  }
}

export class DeliveriesAPI extends ApiService{
  static async getRows(perPage = 10, page = 1){
    return await this.fetchData("/deliveries", {max_items: perPage, page: page});
  }

  static async getRow(id){
    return await this.fetchData(`/deliveries/${id}`);
  }

  static async createRow(data){
    return await this.createData("/deliveries", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/deliveries/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/deliveries/${id}`);
  }
}

export class PaymentsAPI extends ApiService{
  static async getRows(perPage = 10, page = 1){
    return await this.fetchData("/payments", {max_items: perPage, page: page});
  }

  static async getRow(id){
    throw Error("Unimplemnted functionality ! Contact Admin");
    return await this.fetchData(`/payments/${id}`);
  }

  static async createRow(data){
    throw Error("Unimplemnted functionality ! Contact Admin");
    return await this.createData("/payments", data);
  }

  static async modifyRow(id, data){
    throw Error("Unsupported functionality ! Contact Admin");
    return await this.updateData(`/payments/${id}`, data);
  }

  static async deleteRow(id){
    throw Error("Unsupported functionality ! Contact Admin");
    return await this.deleteData(`/payments/${id}`);
  }
}

export class StockAPI extends ApiService{
  static async getRows(){
    return await this.fetchData("/stocks");
  }

  static async getRow(id){
    return await this.fetchData(`/stocks/${id}`);
  }

  static async createRow(data){
    return await this.createData("/stocks", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/stocks/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/stocks/${id}`);
  }
}

export class StockProductsAPI extends ApiService{
  static async getRowsByStockID(id: int){
    return await this.fetchData("/stockProducts", {stockID: id});
  }

  static async getRows(){
    throw Error("Unsupported functionality ! Contact Admin");
    return await this.fetchData("/stockProducts");
  }

  static async getRow(id){
    return await this.fetchData(`/stockProducts/${id}`);
  }

  static async createRow(data){
    return await this.createData("/stockProducts", data);
  }

  static async modifyRow(id, data){
    return await this.updateData(`/stockProducts/${id}`, data);
  }

  static async deleteRow(id){
    return await this.deleteData(`/stockProducts/${id}`);
  }
}

export class AuthAPI {
  static async apiRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: any,
    params?: any
  ): Promise<AxiosResponse> {
    const config: AxiosRequestConfig = {
      method,
      url: `${AUTH_URL}${endpoint}`,
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
  static async logIn(data: any, params?: any): Promise<AxiosResponse> {
    return await this.apiRequest('post', "/login", data, params);
  }
  
  // Static method to create data
  static async logOut(): Promise<AxiosResponse> {
    return await this.apiRequest('get', "/logout");
  }

  static async CheckStatus(): Promise<AxiosResponse> {
    return await this.apiRequest('get', "/isloggedin?ac_mo=a");
  }
}