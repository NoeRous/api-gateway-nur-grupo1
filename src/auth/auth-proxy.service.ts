import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthProxyService {
  private readonly authServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl =
      this.configService.get<string>('AUTH_SERVICE_URL') ||
      'http://localhost:3000';
  }

  async login(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/auth/login`, {
          email,
          password,
        }),
      );
      return response.data;
    } catch (error: any) {
      console.log("error", error)
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Error en el servicio de autenticación',
          error.response.status || HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        'Error de conexión con el servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authServiceUrl}/users/register`, {
          email,
          password,
          name,
        }),
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Error en el registro',
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Error de conexión con el servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async refreshToken(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Token de refresh inválido o expirado',
          error.response.status || HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        'Error de conexión con el servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async logout(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new HttpException(
          error.response.data || 'Error al cerrar sesión',
          error.response.status || HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        'Error de conexión con el servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
