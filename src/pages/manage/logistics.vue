<template>
    <div id="logistics-page">
        <form class="seciton-condition" @submit.prevent="companyQuerySubmit" novalidate>
            <div class="form-controller">
                <label class="label-controller" for="">物流公司名</label>
                <select class="select-controller" 
                    name="logisticsCompany"
                    v-model="query.companyName">
                    <option value="">请选择物流公司</option>
                    <option 
                        :value="logisticsCompany.companyName" 
                        v-for="logisticsCompany in logisticsCompanys">
                    {{logisticsCompany.companyName}}
                    </option>
                </select>
            </div>
            <!--<div class="form-controller">
                <label class="label-controller" for="">始发站</label>
                <input class="input-controller" type="text"
                    readonly
                    @click="showDrapDown('origin')"
                    v-model="query.originName"
                >
                <input type="hidden" name="originId" v-model="query.originId">
                <areas :open="isDrapOrigin" @selectDone="originDone"></areas>
            </div>
             <div class="form-controller">
                <label class="label-controller" for="">目的地</label>
                 <input class="input-controller" type="text"
                        name="destinationName" 
                        readonly
                        @click="showDrapDown('destination')"
                        v-model="query.destinationName">
                <input type="hidden" name="destinationId" v-model="query.destinationId">
                <areas :open="isDrapDestination" @selectDone="destinationDone"></areas>
            </div>-->
            <button type="submit" class="btn btn-oval btn-light">
                查询
            </button>
        </form>
        <div class="seciton-table">
            <div class="enty">
                <router-link to="/manage/logistics/add-logistics" tag="button" class="btn btn-oval btn-light">
                    添加
                </router-link>
                 <button class="btn btn-oval btn-light" @click.prevent="deleteCompanys">
                    删除
                </button>
            </div>
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                 :url="'logistics/add-logistics'"
                :paramskey="'id'"
                ></table-ui>
        </div>
        <div class="page-wrap clearfix">   
            <page class="fr"
                :total="total" 
                :number="page.pageNum"
                :pages="pages"
                @pageCb="pageCb"
            ></page>
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
export default {
    created () {
        this.$store.dispatch('getLogisticsCompanysInfo');
        this.page = this.companyPage || this.page;
        this.query = this.companyQuery || this.query ;
        this.getList();
    },
    mounted () {

    },
    data () {
        return {
            alertShow: false,
            alertText: '',
            isDrapOrigin: false,
            isDrapDestination: false,
            query: {
                originId: '',
                originName: '',
                destinationId: '',
                destinationName: '',
                companyName: ''
            },
            pages: 0,
            total: 0,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            theads: [
                {
                    key: '物流ID',
                    value: 'id'
                },
                {
                    key: '物流公司',
                    value: 'companyName'
                },
                {
                    key: '是否启用',
                    value: 'enableString'
                }
            ],
            tbodys: []
        };
    },
    computed: {
        ...mapGetters(['companyPage', 'companyQuery', 'logisticsCompanys'])
    },
    methods: {
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        deleteCompanys () {
            let len = this.tbodys.length;
            if(!len) return;
            this.$store.dispatch('deleteCompanyList', this.tbodys).then(list => {
                this.getList();
                this.alert('成功删除'+ (len - list.length) +'项');
            }).catch(err => {
                this.alert('删除失败');
            });
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

             let query = Object.assign({}, this.query);
              query[key + 'Name']  = '';

            if(!data || !data.length) {

                 query[key + 'Id']= null;
            }else {
                data.forEach(item => {
                    query[key + 'Name'] += item.name;
                });
                query[key + 'Id']= data[data.length - 1].id;
            }
           
            this.query = query;
        },
        companyQuerySubmit (){
            this.getList(1);
        },
        findList(page, originId = null, destinationId = null, companyName = null){
            return this.$store.dispatch('getCompanyList', {
                page,
                originId,
                destinationId,
                companyName
            }).then(data => {
                this.tbodys = data.list;

                let list = data.list;

                list.map(item => {
                    if(item.enable.toLowerCase() == 'yes'){
                        item.enableString = '是';
                    }else {
                        item.enableString = '否';
                    }
                })

                this.pages = data.pages;
                this.total = data.total;
                this.$store.dispatch('setHistoryCompanyPage', {
                    page: this.page,
                    query: this.query
                });
            });
        },
        getList(num) {
            let {
                originId,
                destinationId,
                companyName
            } = this.query;

            this.page.PageNum = num;
            this.findList(this.page, originId, destinationId, companyName);
        },
        pageCb (num) {
            console.log('num', num);
            this.getList(num);
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
    #logistics-page {

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