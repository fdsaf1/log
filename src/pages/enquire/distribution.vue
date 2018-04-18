<template>
    <div id="distribution-page">
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
                    <datepicker :clear-button="true"  v-model="query.createdDateStart"  language="zh" :format="'yyyy-MM-dd'" class="input-controller"></datepicker>
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
            <div class="enty">
                <!--
                @click.prevent="dispatchOrderForLogistic"
                -->
                <button class="btn btn-oval btn-light" @click.prevent="showDrapDown" :class="{'btn-light-activated': isDrap}" >
                    分发
                <transition name="slider-drap-down">
                        <drap-down class="drap-down" :width="422" @hide="hideDrapDown($event)" v-show="isDrap">
                            <!--<ul class="option-list">
                                <li v-for="(item, index) in list">
                                    <label class="checkbox-controller" :class="{activated: item.checked}">
                                        <input type="checkbox" :name="item.companyName" v-model="item.checked">
                                    </label>
                                    <span>
                                        {{item.companyName}}
                                    </span>
                                </li>
                            </ul>-->
                           <div class="option-wrap">
                                <div class="option-divider">
                                    整车
                                </div>
                                <div>
                                    <span class="option-item" v-for="(item, index) in list">
                                        <label class="checkbox-controller" :class="{activated: item.checked}">
                                            <input type="checkbox" :name="item.companyName" v-model="item.checked">
                                        </label>
                                    <em> {{item.companyName}}</em>
                                    </span>
                                </div>
                           </div>
                         </drap-down>
                    </transition>
                </button>
            </div>
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                :url="'DistributionDetail'"
                :paramskey="'id'"
                :isParams="true"
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
import drapDown from '../../components/DrapDown';
import Page from '../../components/Page';
import TableUi from '../../components/TableUi';
import Datepicker from 'vuejs-datepicker';
import Alert from '../../components/Alert';
import { OrderQuery } from './enquire.class';
import { mapGetters } from 'Vuex';

export default {
    created(){
        if(this.distributionPage){
            this.page = this.distributionPage;
        }
       this.findList();

       this.$store.dispatch('getDistributionCompanyList').then(data => {
        // console.log(data);
        this.list = data;
       });
    },
    mounted () {
        
    },
    data () {
        return {
            lock: false,
            alertShow: false,
            alertText: '',
            selectedlogisticId: '',
            query: new OrderQuery(),
            pages: 0,
            total: 0,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            isDrap: false,
            allChecked: false,
            username: '',
            list: [
                    {companyName: '林安物流', checked: false},
                ],
           theads: [
                        {key:'运单号', value: 'orderNo'},
                        {key:'订单类型', value: 'orderTypeString'},
                        {key:'始发地', value: 'senderAddress'},
                        {key:'目的地', value: 'receiverAddress'},
                        {key:'分发公司', value: 'logisticsCompanyName'},
                        {key:'托运人姓名', value: 'senderName'},
                        {key:'收件人姓名', value: 'receiverName'},
                        {key:'报价金额', value: 'freight'},
                        {key:'备注', value: 'goodsRemark'},
                        // {key:'运单状态', value: 'handleStateString'},
                        {key:'运单日期', value: 'updatedDate'}
                      ],
            tbodys: [
                // {id: 11111, orderNo: 1111111, goodsRemark: 222222, senderAddress: 333333, receiverAddress: 4444444, senderCompany: 555555, senderName: 66666, receiverName: 77777, processState: 88888, handleState: 999999},
                // {id: 22222, orderNo: 1111111, goodsRemark: 222222, senderAddress: 333333, receiverAddress: 4444444, senderCompany: 555555, senderName: 66666, receiverName: 77777, processState: 88888, handleState: 999999},
            ]
        };
    },
    computed: {
        ...mapGetters(['distributionPage'])
    },
    components: {
         drapDown,
         Page,
         TableUi,
         Datepicker,
         Alert
    },
    methods: {
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
       findList(){
           return this.$store.dispatch('getDistributionList', {
                pageRequest: this.page,
                query: this.query
            }).then(data => {
                this.tbodys = data.list;
                this.page.pageNum = data.pageNum;
                this.page.pageSize = data.pageSize;
                this.pages = data.pages;
                this.total = data.total;
                 this.$store.dispatch('setDistributionPage', this.page);
            });
        },
        pageCb (num) {
            if(num){
                this.page.pageNum = num;
            }
            this.findList();
        },
        showDrapDown () {
            this.isDrap = !this.isDrap;
        },
        hideDrapDown (data) {
            this.isDrap = false;
            this.dispatchOrderForLogistic();
        },
        dispatchOrderForLogistic() {
            if(this.lock) return;
            this.lock = true;
            this.$store.dispatch('dispatchDistributionList', {
                list: this.tbodys,
                companyIds: this.list
            }).then(res => {
                this.alert('分发成功');
                this.lock = false;
                this.findList();
            }).catch(err => {
                this.alert('分发失败');
                this.lock = false;
            });
        },
        submit () {
            this.findList();
        }
    }
}
</script>
<style scoped>
    #distribution-page {
        
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
    .cut {
        padding: 0 10px;
    }
    .seciton-table {
        padding: 20px 0 0 50px;
    }
    .enty {
        margin-bottom: 20px;
    }
    .page-wrap {
        padding-top: 130px;
    }
    .option-wrap {
        padding: 30px 30px 0 30px;
    }
    .option-divider {
        padding-left: 10px;
        border-left: 4px solid #379bf8;
        line-height: 22px;
        margin-bottom: 20px;
    }
    .option-item {
        display: inline-block;
        line-height: 22px;
        margin-right: 30px;
    }
    .option-item em {
        vertical-align: middle;
        color: #666;
    }
    .option-list {
        padding: 30px 0 0 30px;
    }
    .option-list li {
        line-height: 25px;
        cursor: pointer;
        margin-bottom: 16px;
    }
    .option-list span {
        vertical-align: middle;
    }
    .slider-drap-down-active {
        transition: transform .2s, opacity .5s;
        opacity: 0;
    }
    .slider-drap-down-active-enter {
         opacity: 1;
    }
    .slider-drap-down-leave {

    }
    .slider-drap-down-leave-enter {
        
    }
</style>