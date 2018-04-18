// import Query from '../pages/query/query';
// import CarryOrder from '../pages/query/carry-order';

const Query = r => require.ensure([], () => r(require('../pages/query/query')), 'query');
const CarryOrder = r => require.ensure([], () => r(require('../pages/query/carry-order')), 'query');
const CarryOrderDetail = r => require.ensure([], () => r(require('../pages/query/carry-order-detail')), 'query');

export const queryRouter = {
    path: '/query',
    name: 'Query',
    component: Query,
    children: [{
            path: 'carry-order',
            name: 'CarryOrder',
            component: CarryOrder
        },
        {
            path: 'carry-order/carry-order-detail/:id',
            name: 'CarryOrderDetail',
            component: CarryOrderDetail
        }
    ]
}