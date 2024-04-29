import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-logout-propmt',
    templateUrl: 'logout-propmt.html',
    styleUrls: ['logout-propmt.scss'],
})
export class logoutPromptComponent {
    constructor(protected ref: NbDialogRef<logoutPromptComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close({ close: true });
    }
}
