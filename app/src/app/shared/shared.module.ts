import { NgModule } from '@angular/core';
import {
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbCardModule,
    NbBadgeModule,
    NbTabsetModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbWindowModule,
    NbCheckboxModule,
    NbDialogModule,
    NbInputModule,
    NbPopoverModule,
    NbCalendarModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { CommonComponent } from './common/common.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const NB_MODULES = [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule,
    NbCardModule,
    NbBadgeModule,
    NbTabsetModule,
    NbTooltipModule,
    NbWindowModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
    NbInputModule,
    NbPopoverModule,
    NbCalendarModule,
];

@NgModule({
    imports: [
        ThemeModule,
        NbMenuModule.forRoot(),
        NbDatepickerModule.forRoot(),
        // BsDropdownModule.forRoot(),
        NbActionsModule,
        // SharedModule,
        // DataTablesModule,
        // ImageCropperModule,
        ...NB_MODULES,
        // NgApexchartsModule
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [CommonComponent, ProfileComponent],
    entryComponents: [],
    exports: [],
    providers: [],
})
export class SharedModule {}
