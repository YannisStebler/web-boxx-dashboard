import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Home',
    icon: 'home',
    link: '/home'
  },
  {
    label: 'Functions',
    isTitle: true
  },
  {
    label: 'Cash Register',
    icon: 'credit-card',
    link: '/cash-register'
  },
  {
    label: 'Manage Products',
    icon: 'codesandbox',
    link: '/manage-products'
  },
  {
    label: 'Active Orders',
    icon: 'bell',
    link: '/active-orders'
  },

  {
    label: 'Reports',
    isTitle: true
  },
  {
    label: 'Sales Report',
    icon: 'activity',
    link: '/sales-report'
  },
  {
    label: 'Order History',
    icon: 'book-open',
    link: '/order-history'
  },
];
