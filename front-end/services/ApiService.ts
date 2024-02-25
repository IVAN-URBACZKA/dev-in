import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
 
});

interface User {
  email: string;
  password: string;
  
}


interface Article {
    name: string,
    content: string,
  }

class ApiService {

  static async login(user: User): Promise<AxiosResponse> {
    return api.post('api/login', user);
  }

  static async addArticle(article: Article): Promise<AxiosResponse> {
    return api.post('/add/article', article);
  }

  static async getArticle(slug: String): Promise<AxiosResponse> {
    return api.get(`/articles/${slug}`)
  }

  
}

export default ApiService;
