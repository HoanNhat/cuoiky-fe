import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseApi {
  private axiosInstance: AxiosInstance;


  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:5000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              break;
            case 404:           
              break;         
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // public async getWithoutToken<T = any>(
  //   url: string
  // ): Promise<AxiosResponse<T>> {
  //   const axiosInstance = axios.create({
  //     baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return axiosInstance.get<T>(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // public async postWithoutToken<T = any>(
  //   url: string,
  //   data?: any
  // ): Promise<AxiosResponse<T>> {
  //   const axiosInstance = axios.create({
  //     baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return axiosInstance.post<T>(url, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}
