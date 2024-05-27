import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtTokenService } from '../services/jwt-token.service';

Injectable({
  providedIn: 'root'
})

export const authGuard: CanActivateFn = (route, state) : boolean => {
  const token = inject(JwtTokenService);
  return !token.isTokenExpired();
};

export const authGuard2: CanActivateFn = (route, state) : boolean => {
  const token = inject(JwtTokenService);
  return token.isTokenExpired();
};
