<template>
    <div id="choose-page">
        <div class="seciton-condition">
             <form @submit.prevent="submit" novalidate>
                <div class="form-controller">
                    <label class="label-controller" for="">运单号</label>
                    <input class="input-controller" type="text"
                        name="orderNo"
                        v-model="query.orderNo"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller" for="">始发站</label>
                    <input class="input-controller" type="text"
                        name="senderAddress"
                        v-model="query.senderAddress"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller" for="">目的地</label>
                    <input class="input-controller" type="text"
                        name="receiverAddress"
                        v-model="query.receiverAddress"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller" for="">托运人姓名</label>
                    <input class="input-controller" type="text"
                        name="senderName"
                        v-model="query.senderName"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller" for="">收件人姓名</label>
                    <input class="input-controller" type="text"
                        name="receiverName"
                        v-model="query.receiverName"
                    >
                </div>
                <!--<div class="form-controller">
                    <label class="label-controller" for="">运单状态</label>
                    <select class="select-controller" type="text"
                        name="processState"
                        v-model="query.processState"
                    >
                        <option value="">全部</option>
                    </select>
                </div>-->
                  <div class="form-controller">
                    <label class="label-controller" for="">运单日期</label>
                    <!--<input class="input-controller" type="text">-->
                    <datepicker :clear-button="true" v-model="query.createdDateStart"  language="zh" :format="'yyyy-MM-dd'" class="input-controller"></datepicker>
                    <em class="cut">-</em>
                    <!--<input class="input-controller" type="text">-->
                    <datepicker :clear-button="true"  v-model="query.createdDateEnd" language="zh" :format="'yyyy-MM-dd'" class="input-controller"></datepicker>
                </div>
                <button type="submit" class="btn btn-oval btn-light">
                    查询
                </button>
            </form>
        </div>
        <div class="seciton-table">
            <!--<div class="enty">
                 <button class="btn btn-oval btn-light">
                    回复客户
                </button>
            </div>-->
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                :url="'ChooseDetail'"
                :paramskey="'id'"
                :isParams="true"
                ></table-ui>
        </div>
        <div class="page-wrap clearfix">   
            <page class="fr"
                :total="total" 
                :number="page.pageNum"
                :pages="pages"
                @pageCb="pageCb"></page>
        </div>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Page from '../../components/Page';
import TableUi from '../../components/TableUi';
import Datepicker from 'vuejs-datepicker';
import { OrderQuery } from './enquire.class';
import { mapGetters } from 'Vuex';

export default {
    created () {
        if(this.choosePage){
            this.page = this.choosePage;
        }
        this.findList();
    },
    mounted () {

    },
    data () {
        return {
            query: new OrderQuery(),
            pages: 0,
            total: 0,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            theads: [
                        {key:'运单号', value: 'orderNo'},
                        {key:'订单类型', value: 'orderTypeString'},
                        {key:'始发地', value: 'senderAddress'},
                        {key:'目的地', value: 'receiverAddress'},
                        {key:'分发公司', value: 'logisticsCompanyName'},
                        {key:'托运人姓名', value: 'senderName'},
                        {key:'收件人姓名', value: 'receiverName'},
                        {key:'备注', value: 'goodsRemark'},
                        // {key:'运单状态', value: 'handleStateString'},
                        {key:'运单日期', value: 'updatedDate'}
                      ],
            tbodys: []
        };
    },

    computed: {
        ...mapGetters(['choosePage'])
    },
    methods: {
         findList(){
           return this.$store.dispatch('getPenddingOrderList', {
                pageRequest: this.page,
                query: this.query
            }).then(data => {
                this.tbodys = data.list;
                this.page.pageNum = data.pageNum;
                this.page.pageSize = data.pageSize;
                this.pages = data.pages;
                this.total = data.total;
                console.log('这是返回的列表数据', data);
                this.$store.dispatch('setChoosePage', this.page);
            });
        },
        pageCb (num) {
            if(num){
                this.page.pageNum = num;
            }
            this.findList();
        },
        submit () {
             this.findList();
        }
    },
    components: {
        Page,
        TableUi,
        Datepicker
    }
}
</script>
<style scoped>
    #choose-page {

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
        padding: 20px 0 0 50px;
    }
    .cut {
        padding: 0 10px;
    }
    .enty {
        font-size: 0;
        margin-bottom: 20px;
    }
    .enty .btn {
        margin-right: 20px;
        width: 134px;
    }
    .page-wrap {
        padding-top: 130px;
    }
</style>