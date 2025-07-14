import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';
import { environment } from '../../environments/environment';
import { LoginPayload } from '../types/api-client.type';
import { CookieService } from 'ngx-cookie-service';
import { paths } from '../types/api-types';
@Injectable({
  providedIn: 'root',
})
export class ESemusApiClient {
  client!: Axios;
  jwtToken!: string;
  constructor(private readonly cookie: CookieService) {
    this.client = axios.create({
      baseURL: environment.apiUrl,
    });
  }

  private haveLogin() {
    if (!this.cookie.check('token')) {
      throw Error('Usuario Não Logado');
    }
  }

  async login(credencials: { usuario: string; senha: string }) {
    try {
      const response: LoginPayload = (
        await this.client.post('auth/login', credencials)
      ).data;
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  private get headers() {
    return { Authorization: `Bearer ${this.cookie.get('token')}` };
  }

  async getAllBoletins() {
    this.haveLogin();
    try {
      const response = await this.client.get('/boletim/sindrome-gripal', {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
  async getBoletimDetails(id: string) {
    this.haveLogin();
    try {
      const response = await this.client.get<
        paths['/boletim/sindrome-gripal/{id}']['get']['responses']['200']['content']['application/json']
      >(`/boletim/sindrome-gripal/${id}`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async getAllFichaSpa() {
    type apiResponse =
      paths['/ficha-spa']['get']['responses']['200']['content']['application/json'];
    this.haveLogin();
    try {
      const response = await this.client.get<apiResponse>('/ficha-spa', {
        headers: this.headers,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }

  async getOneFichaSpa(id: string) {
    type apiResponse =
      paths['/ficha-spa/{id}']['get']['responses']['200']['content']['application/json'];
    this.haveLogin();
    try {
      const response = await this.client.get<apiResponse>('/ficha-spa/' + id, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw error;
    }
  }
}
