<template>
    <div id="router-page">
        <form @submit.prevent="searchRouterList">
            <div class="seciton-condition">
                <div class="form-controller">
                    <label class="label-controller">物流公司名</label>
                     <select class="select-controller" 
                        name="logisticsCompany"
                        v-model="queryRouter.companyName">
                        <option value="">请选择物流公司</option>
                        <option 
                            :value="logisticsCompany.companyName" 
                            v-for="logisticsCompany in logisticsCompanys">
                        {{logisticsCompany.companyName}}
                        </option>
                    </select>
                </div>
                <br/>
                <div class="form-controller">
                    <label class="label-controller">始发站</label>
                    <input class="input-controller" type="text"
                        name="originName" 
                        readonly
                        @click="showDrapDown('origin')"
                        v-model="queryRouter.originName">
                    <input type="hidden" name="originId" v-model="queryRouter.originId">
                    <areas :open="isDrapOrigin" @selectDone="originDone"></areas>
                </div>
                <div class="form-controller">
                    <label class="label-controller">目的地</label>
                     <input class="input-controller" type="text"
                        name="destinationName" 
                        readonly
                        @click="showDrapDown('destination')"
                        v-model="queryRouter.destinationName">
                    <input type="hidden" name="destinationId" v-model="queryRouter.destinationId">
                    <areas :open="isDrapDestination" @selectDone="destinationDone"></areas>
                </div>
                <button type="submit" class="btn btn-oval btn-light">
                    查询
                </button>
            </div>
        </form>
        <div class="seciton-table">
            <div class="enty">
                <router-link to="router/add-router" tag="button" class="btn btn-oval btn-light">
                    添加
                </router-link>
                 <button class="btn btn-oval btn-light" @click="deleteRouter">
                    删除
                </button>
            </div>
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                :url="'router/add-router'"
                :paramskey="'id'"
            ></table-ui>
        </div>
        <div class="page-wrap clearfix">   
            <page class="fr" 
                :total="total" 
                :number="page.pageNum"
                :pages="pages"
                @pageCb="pageCb"></page>
        </div>
        <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Page from '../../components/Page';
import TableUi from '../../components/TableUi';
import Areas from '../../components/Area';
import Alert from '../../components/Alert';
import { mapGetters } from 'Vuex';
import Vue from 'vue';
export default {
    created () {
        this.$store.dispatch('getLogisticsCompanysInfo');
        if(this.routerPage){
             this.page = this.routerPage;
        }
        this.findQueryList(null, null, null, this.page).then(data => {
            this.$store.dispatch('setRouterPage', this.page);
        });
    },
    mounted () {
       
    },
    data () {
        return {
            ids: [],
            alertShow: false,
            alertText: '',
            isDrapOrigin: false,
            isDrapDestination:  false,
            queryRouter: {
                companyName: null,
                originName: null,
                originId: null,
                destinationName: null,
                destinationId: null
            },
            total: 0,
            pages: 0,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            theads: [
                {
                    key: '路线ID',
                    value: 'id'
                },
                {
                    key: '物流公司',
                    value: 'logisticsCompanyName'
                },
                {
                    key: '出发地',
                    value: 'originName'
                },
                {
                    key: '目的地',
                    value: 'destinationName'
                },
                {
                    key: '最后登录时间',
                    value: 'updatedDate'
                }
            ],
            tbodys: []
        };
    },
    computed: {
        ...mapGetters(['logisticsCompanys', 'routerPage'])
    },
    methods: {
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        deleteRouter () {
            let len = this.tbodys.length;
            this.$store.dispatch('deleteRouter', this.tbodys).then(data => {
                this.alert('成功删除' + (len - data.length) + '项');
                 this.pageCb();
            }).catch(erro => {
                this.alert('删除失败');
            })
        },
        searchRouterList () {
            // console.log(11111);
           this.pageCb(1);
        },
        findQueryList (companyName = null, originId = null,  destinationId = null, page = this.page) {
            let dataFormat = Vue.filter('dateFormat');

           return this.$store.dispatch('findRouterList', { companyName, originId,  destinationId, page })
           .then(data => {
               data.list.map(item => {
                    item.updatedDate = dataFormat(item.updatedDate, 'yyyy/MM/dd hh:mm');
                    return item;
               });
               this.tbodys = data.list;
               this.pages = data.pages;
               this.total = data.total;
           })
        },
        showDrapDown (key) {
           if(key === 'origin'){
                this.isDrapOrigin = !this.isDrapOrigin;
           }else {
               this.isDrapDestination = !this.isDrapDestination;
           }
        },
        originDone (data) {
           this.handleData('origin',  data);
        },
        destinationDone (data) {
            this.handleData('destination',  data);
        },
        handleData(key, data) {

             let queryRouter = Object.assign({}, this.queryRouter);
              queryRouter[key + 'Name']  = '';

            if(!data || !data.length) {

                 queryRouter[key + 'Id']= null;
            }else {
                data.forEach(item => {
                    queryRouter[key + 'Name'] += item.name;
                });
                queryRouter[key + 'Id']= data[data.length - 1].id;
            }
           
            this.queryRouter = queryRouter;
        },
        pageCb (num) {
            if (num) {
                this.page.pageNum = num;
            }
           let { companyName, originId,  destinationId } = this.queryRouter;
           this.findQueryList(companyName, originId,  destinationId, this.page);
        }
    },
    components: {
        HeaderBar,
        Page,
        TableUi,
        Areas,
        Alert
    }
}
</script>
<style scoped>
    #router-page {
        height: 1136px;
    }
    .seciton-condition {
        padding-left: 50px;
        padding-top: 20px;
        background-color: #f2f2f2;
        border-bottom: 2px solid #ddd;
    }
    .form-controller {
        margin-right: 34px;
        margin-bottom: 20px;
    }
    .seciton-table {
        padding: 40px 0 0 50px;
    }
    .cut {
        padding: 0 10px;
    }
    .enty {
        font-size: 0;
        margin-bottom: 40px;
    }
    .enty .btn {
        margin-right: 20px;
        width: auto;
        padding: 0 30px;
    }
    .page-wrap {
        padding-top: 130px;
    }
</style>