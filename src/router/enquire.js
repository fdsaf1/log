const Enquire = r => require.ensure([], () => r(require('../pages/enquire/enquire')), 'enquire');
const Distribution = r => require.ensure([], () => r(require('../pages/enquire/distribution')), 'enquire');
const DistributionDetail = r => require.ensure([], () => r(require('../pages/enquire/distribution-detail')), 'enquire');
const Choose = r => require.ensure([], () => r(require('../pages/enquire/choose')), 'enquire');
const ChooseDetail = r => require.ensure([], () => r(require('../pages/enquire/choose-detail')), 'enquire');
const Complete = r => require.ensure([], () => r(require('../pages/enquire/complete')), 'enquire');
const CompleteDetail = r => require.ensure([], () => r(require('../pages/enquire/complete-detail')), 'enquire');
const Payed = r => require.ensure([], () => r(require('../pages/enquire/payed')), 'enquire');
const Responded = r => require.ensure([], () => r(require('../pages/enquire/responded')), 'enquire');
const RespondedDetail = r => require.ensure([], () => r(require('../pages/enquire/responded-detail')), 'enquire');
const PayedDetail = r => require.ensure([], () => r(require('../pages/enquire/payed-detail')), 'enquire');

export const enquireRouter = {
    path: '/enquire',
    name: 'Enquire',
    component: Enquire,
    children: [{
            path: 'distribution',
            name: 'Distribution',
            component: Distribution
        },
        {
            path: 'distribution/distribution-detail/:id',
            name: 'DistributionDetail',
            component: DistributionDetail
        },
        {
            path: 'choose',
            name: 'Choose',
            component: Choose
        },
        {
            path: 'choose/choose-detail/:id',
            name: 'ChooseDetail',
            component: ChooseDetail
        },
        {
            path: 'complete',
            name: 'Complete',
            component: Complete
        },
        {
            path: 'complete/complete-detail/:id',
            name: 'CompleteDetail',
            component: CompleteDetail
        },
        {
            path: 'payed',
            name: 'Payed',
            component: Payed
        },
        {
            path: 'payed',
            name: 'PayedDetail',
            component: PayedDetail
        },
        {
            path: 'responded',
            name: 'Responded',
            component: Responded
        },
         {
            path: 'responded/responded-detail/:id',
            name: 'RespondedDetail',
            component: RespondedDetail
        }
    ]
}