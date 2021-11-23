import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorTheme: string = 'light-mode';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): string {
    this.getColorTheme();
    this.renderer.addClass(this.document.body, this.colorTheme);
    return this.colorTheme;
  }

  update(theme: 'dark-mode' | 'light-mode') {
    this.setColorTheme(theme);
    const previousColorTheme = theme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.renderer.removeClass(this.document.body, previousColorTheme);
    this.renderer.addClass(this.document.body, theme);
  }

  isLightMode() {
    return this.colorTheme === 'light-mode';
  }

  isDarkMode() {
    return this.colorTheme === 'dark-mode';
  }

  private setColorTheme(theme: 'dark-mode' | 'light-mode') {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      const storedTheme = localStorage.getItem('user-theme');
      if (storedTheme) this.colorTheme = storedTheme;
      if (this.colorTheme !== 'light-mode' && this.colorTheme !== 'dark-mode') {
        this.colorTheme = 'light-mode';
      }
    } else {
      this.colorTheme = 'light-mode';
    }
  }


}
