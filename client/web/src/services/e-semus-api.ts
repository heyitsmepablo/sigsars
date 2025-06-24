import { Injectable } from '@angular/core';
import axios, { Axios } from 'axios';
import { environment } from '../environments/environment';
import { LoginPayload } from '../types/api-client.type';
@Injectable({
  providedIn: 'root',
})
export class ESemusApiClient {
  client!: Axios;
  constructor() {
    this.client = axios.create({ baseURL: environment.apiUrl });
  }
  async login(credencials: { usuario: string; senha: string }) {
    try {
      const response: LoginPayload = (
        await this.client.post('auth/login', credencials)
      ).data;
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error
      }
      throw error;
    }
  }
}
