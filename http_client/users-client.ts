import UserApiResponse = require('../types/user_response');
import HttpClient = require('./http-client-interceptor');
import config = require('../config.json');

class UsersApi extends HttpClient {
    public constructor(baseURL: string, token?: string) {
      super(baseURL, token)
    } 
    public getUserById = (id) => this.instance.get<UserApiResponse>('/api/users/' + id);
    public postUser = (body) => this.instance.post<UserApiResponse>('/api/users', body);
  }

export const UsersApiAuthorized = new UsersApi(config['api_host'], config['token'])
export const UsersApiNoAuthorization = new UsersApi(config['api_host'])
