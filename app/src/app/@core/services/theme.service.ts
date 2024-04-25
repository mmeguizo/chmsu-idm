import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class ThemeService {
    constructor() {}

    private _selectedTheme = '';

    get selectedTheme() {
        return this._selectedTheme;
    }

    setSelectedTheme(theme: string) {
        this._selectedTheme = theme;
    }

    setThemeToDefault() {
        this._selectedTheme = '';
    }
}
