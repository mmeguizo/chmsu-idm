import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { UsersComponent } from './users/users.component';
// import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            // { path: 'users', component: UsersComponent },
            // { path: 'customers', component: CustomersComponent },
        ],
    },
    { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
