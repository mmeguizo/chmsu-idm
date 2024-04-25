import { Component } from '@angular/core';

@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    template: `
        <span class="created-by">
            <a href="https://github.com/mmeguizo" target="_blank">
                {{ '@mmeguizo' }}
            </a>
            &copy; 2024
        </span>
        <div class="socials">
            <a
                href="https://www.facebook.com/chmsuofficialpage/"
                target="_blank"
                class="ion ion-social-facebook"
            ></a>
            <a
                href="https://chmsu.edu.ph/"
                target="_blank"
                class="ionicons ion-android-globe"
            ></a>
        </div>
    `,
})
export class FooterComponent {}
