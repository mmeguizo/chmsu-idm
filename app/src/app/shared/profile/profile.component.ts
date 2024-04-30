import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    OnDestroy,
    Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { setTimeout } from 'timers';
import { AuthServices } from '../../@core/services/auth.service';
import { FileService } from '../../@core/services/file.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserService } from '../../@core/services/user.service';

@Component({
    selector: 'ngx-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    @Input() employeeId: any;
    @Output() passEntry: EventEmitter<string> = new EventEmitter<string>();

    private getSubscription = new Subject<void>();

    public loading = true;
    public form: any;
    public data: any;
    public uid: any;
    public dataID: any;
    public showpassword = false;
    public eyeIcon = 'eye-off-outline';
    public profile_pic: any;
    public role: any;
    public profile_pic_image: any;

    private userData: any;
    public buttonStatus: String = 'primary';
    public buttonTxt: String = 'action';
    public action: String = 'action to perform in';
    public id: String;
    selected: String;

    loadingMediumGroup = false;

    constructor(
        private auth: AuthServices,
        private user: UserService,
        public formBuilder: FormBuilder,
        public file: FileService,
        private dialog: NbDialogRef<ProfileComponent>
    ) {
        this.profile_pic = this.auth.getUserProfilePic();
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirm: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.id = this.auth.getTokenUserObjectID();
        this.getUser(this.id);
    }

    getUser(user: any) {
        this.user
            .getUsers(user)
            .pipe(takeUntil(this.getSubscription))
            .subscribe((data: any) => {
                const { username, email, profile_pic } = data.user;
                // this.profile_pic = profile_pic;
                this.form = this.formBuilder.group({
                    username: [username, [Validators.required]],
                    email: [email, [Validators.required]],
                    password: ['', [Validators.required]],
                    confirm: ['', [Validators.required]],
                });
            });
    }

    showPassword() {
        if (this.showpassword == true) {
            this.showpassword = false;
            this.eyeIcon = 'eye-outline';
        } else {
            this.showpassword = true;
            this.eyeIcon = 'eye-off-outline';
        }
    }

    imageLoader = false;
    elEventListenerActive: boolean;
    openFile(ev, id) {
        let file,
            el = document.getElementById(id);
        el.click();
        let handler = (fc) => {
            try {
                let fileList: any;
                let fd = new FormData();
                if (fc.target['files'][0]['name'] !== undefined) {
                    fileList = fc.target;
                    let file: File = fileList.files[0];
                    fd.append('avatar', file, file.name);
                    this.file
                        .addAvatar(fd)
                        .pipe(takeUntil(this.getSubscription))
                        .subscribe((data: any) => {
                            this.elEventListenerActive = false;
                            this.profile_pic = data.data.source;
                            el.removeEventListener('change', handler);
                        });
                } else {
                    // this.Product.image = '';
                    ev.target.innerHTML = 'Browse';
                    this.elEventListenerActive = false;
                    el.removeEventListener('change', handler);
                }
            } catch (e) {
                // this.Product.image = '';
                ev.target.innerHTML = 'Browse';
                this.elEventListenerActive = false;
                el.removeEventListener('change', handler);
            }
        };
        if (!this.elEventListenerActive) {
            el.addEventListener('change', handler);
            this.elEventListenerActive = true;
        }
    }

    closeModal() {
        this.dialog.close();
    }

    executeAction(form) {
        form.value.id = this.id;
        form.value.profile_pic = this.profile_pic;
        let data = form.value;
        this.user
            .updateProfile(data)
            .pipe(takeUntil(this.getSubscription))
            .subscribe((data: any) => {
                if (data.success) {
                    this.auth.makeToast(
                        'success',
                        `Updating ${form.value.username}`,
                        data.message
                    );
                    this.closeModal();
                    this.logout();
                } else {
                    this.auth.makeToast(
                        'danger',
                        `Updating ${form.value.username}`,
                        data.message
                    );
                }
            });
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.getSubscription.unsubscribe();
    }
}
