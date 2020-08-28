import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'


declare module 'axios' {
  // eslint-disable-next-line
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  //[x:string]: any;
  protected readonly instance: AxiosInstance;
  protected readonly token?: string;

  public constructor(baseURL: string, token?: string) {
    this.instance = axios.create({
      baseURL
    })

    this.token = token
    this.instance.getUri = this.instance.getUri.bind(this)
    this.instance.request = this.instance.request.bind(this)
    this.instance.get = this.instance.get.bind(this)
    this.instance.delete = this.instance.delete.bind(this)
    this.instance.head = this.instance.head.bind(this)
    this.instance.post = this.instance.post.bind(this)
    this.instance.put = this.instance.put.bind(this)
    this.instance.patch = this.instance.patch.bind(this)

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  };

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    if (this.token != null) {
      config.headers['Authorization'] = this.token
    }
    return config
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;
  // eslint-disable-next-line
  protected _handleError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
    return error.response.data
  };
}

export = HttpClient