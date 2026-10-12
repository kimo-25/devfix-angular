import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>((localStorage.getItem('devfix-theme') as Theme) || 'light');

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    localStorage.setItem('devfix-theme', this.theme());
    this.apply();
  }

  private apply(): void {
    document.documentElement.setAttribute('data-theme', this.theme());
  }
}
