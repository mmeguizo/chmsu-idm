import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
    Input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthServices } from '../../@core/services/auth.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
    selector: 'ngx-common',
    templateUrl: './common.component.html',
    styleUrls: ['./common.component.scss'],
})
export class CommonComponent implements OnInit, OnDestroy {
    @Input() employeeId: any;
    @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();
    private getSubscription = new Subject<void>();

    public headerTitle;
    public bodyContent;

    public frontEnddata;
    public username;
    public anyVariable;

    public id;
    public datas;
    public model;
    public apiName;
    public endpointType;

    constructor(
        public auth: AuthServices,
        private dialog: NbDialogRef<CommonComponent>
    ) {}

    ngOnInit(): void {
        console.log('common component');
        console.log({ data: this.employeeId });
    }

    runQuery() {
        this.logout();
        // if (this.model && this.model === 'user') {
        //     this.user
        //         .getRoute(this.endpointType, this.apiName, this.frontEnddata)
        //         .pipe(takeUntil(this.getSubscription))
        //         .subscribe((data: any) => {
        //             this.passEntry.emit(data);
        //             this.activeModal.close();
        //         });
        // } else if (this.model && this.model === 'customers') {
        //     this.customer
        //         .getRoute(this.endpointType, this.apiName, this.frontEnddata)
        //         .pipe(takeUntil(this.getSubscription))
        //         .subscribe((data: any) => {
        //             this.passEntry.emit(data);
        //             this.activeModal.close();
        //         });
        //     if (this.endpointType === 'post') {
        //     } else if (this.endpointType === 'put') {
        //     } else {
        //     }
        // } else if (this.model && this.model === 'fileupload') {
        //     this.user
        //         .getRoute(this.endpointType, this.apiName, this.frontEnddata)
        //         .pipe(takeUntil(this.getSubscription))
        //         .subscribe((data: any) => {
        //             this.passEntry.emit(data);
        //             this.activeModal.close();
        //         });
        // } else {
        //     this.logout();
        // }
    }

    closeModal() {
        this.dialog.close();
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.getSubscription.unsubscribe();
    }
}
