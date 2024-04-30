import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'Dashboard',
        icon: 'activity-outline',
        link: '/user/dashboard',
        home: true,
    },
    {
        title: 'Users',
        icon: 'person-outline',
        link: '/user/users',
    },
    {
        title: 'Customers',
        icon: 'person-done-outline',
        link: '/user/customers',
    },
];
