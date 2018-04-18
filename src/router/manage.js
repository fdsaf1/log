// import Manage from '../pages/manage/manage';
// import Account from '../pages/manage/account';
// import AddAccount from '../pages/manage/add-account';
// import Logistics from '../pages/manage/logistics';
// import AddLogistics from '../pages/manage/add-logistics';
// import RouterPage from '../pages/manage/router';
// import AddRouter from '../pages/manage/add-router';
const Manage = r => require.ensure([], () => r(require('../pages/manage/manage')), 'manage');
const Account = r => require.ensure([], () => r(require('../pages/manage/account')), 'manage');
const AddAccount = r => require.ensure([], () => r(require('../pages/manage/add-account')), 'manage');
const Logistics = r => require.ensure([], () => r(require('../pages/manage/logistics')), 'manage');
const AddLogistics = r => require.ensure([], () => r(require('../pages/manage/add-logistics')), 'manage');
const RouterPage = r => require.ensure([], () => r(require('../pages/manage/router')), 'manage');
const AddRouter = r => require.ensure([], () => r(require('../pages/manage/add-router')), 'manage');
const Cart = r => require.ensure([], () => r(require('../pages/manage/cart')), 'manage');
const AddCart = r => require.ensure([], () => r(require('../pages/manage/add-cart')), 'manage');
const Address = r => require.ensure([], () => r(require('../pages/manage/address')), 'manage');

export const manageRouter = {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    children: [{
            path: 'account',
            name: 'Account',
            component: Account
        },
        {
            path: 'account/add-account',
            name: 'AddAccount',
            component: AddAccount
        },
        {
            path: 'logistics',
            name: 'Logistics',
            component: Logistics
        },
        {
            path: 'logistics/add-logistics',
            name: 'AddLogistics',
            component: AddLogistics
        },
        {
            path: 'router',
            name: 'RouterPage',
            component: RouterPage
        },
        {
            path: 'router/add-router',
            name: 'AddRouter',
            component: AddRouter
        },
        {
            path: 'cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: 'cart/add-cart',
            name: 'AddCart',
            component: AddCart
        },
        {
            path: 'address',
            name: 'Address',
            component: Address
        },
    ]
}