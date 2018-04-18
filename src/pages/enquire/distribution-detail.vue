<template>
    <div id="distribution-detail-page">
        <div class="section-nav">
            <span class="nav-title">
                运单详情
            </span>
            <!-- @click="showDrapDown" :class="{'btn-light-activated': isDrap}"-->
             <button class="btn btn-oval btn-light" @click="dispatchOrder">
                    分发
                   <!-- <transition name="slider-drap-down">
                         <drap-down class="drap-down" :width="422" @hide="hideDrapDown($event)" v-show="isDrap">
                             <ul class="option-list">
                                <li v-for="(item, index) in list">
                                    <label class="checkbox-controller" :class="{activated: item.checked}">
                                        <input type="checkbox" :name="item.title" v-model="item.checked">
                                    </label>
                                    <span>
                                        {{item.title}}
                                    </span>
                                </li>
                            </ul>
                           <div class="option-wrap">
                                <div class="option-divider">
                                    整车
                                </div>
                                <div>
                                    <span class="option-item" v-for="(item, index) in list">
                                        <label class="checkbox-controller" :class="{activated: item.checked}">
                                            <input type="checkbox" :name="item.title" v-model="item.checked">
                                        </label>
                                    <em>{{item.title}}</em>
                                    </span>
                                </div>
                           </div>
                         </drap-down>
                    </transition>-->
                </button>
        </div>
        <div class="section-inner">
            <div style="margin-bottom: 30px; margin-left: 14px;" class="clearfix">
                <div class="form-controller fl">
                    <label class="label-controller">
                        客服人员
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="handlerName"
                        v-model="logisticsOrder.handlerName"
                    >
                </div>
                <!--<div class="section-inner-mark">
                     <div class="form-controller">
                        <label class="label-controller">
                            备注
                        </label>
                        <input class="input-controller mark" type="text">
                    </div>
                </div>-->
            </div>
             <div class="inner-heading">
                订单信息
            </div>
            <div class="inner-controller">
                <div class="form-controller">
                    <label class="label-controller">
                        订单号
                    </label>
                    <input class="input-controller" type="text"
                            readonly
                            name="orderNo"
                            v-model="logisticsOrder.orderNo">
                </div>
                 <div class="form-controller">
                    <label class="label-controller">
                        订单类型
                    </label>
                    <input class="input-controller" type="text"
                            readonly
                            name="orderType"
                            v-model="logisticsOrder.orderTypeString">
                </div>
                 <div class="form-controller">
                    <label class="label-controller">
                        物流状态
                    </label>
                    <input placeholder="方案整合" class="input-controller" type="text"
                            readonly
                            name="handleState"
                            v-model="logisticsOrder.handleStateString">
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        车辆类型
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                            readonly
                            name="handleState"
                            v-model="logisticsOrder.carType">
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        车辆数量
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                            readonly
                            name="handleState"
                            v-model="logisticsOrder.carNum">
                </div>
                <div class="form-controller"  v-if="logisticsOrder.height">
                    <label class="label-controller">
                        装载高度
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="height"
                        v-model="logisticsOrder.height">
                </div>
                 <div class="form-controller"  v-if="logisticsOrder.weight">
                    <label class="label-controller">
                        重量
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="weight"
                        v-model="logisticsOrder.weight">
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        始发地
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="senderAddress"
                        v-model="logisticsOrder.senderAddress"
                    >
                </div>
                 <div class="form-controller">
                    <label class="label-controller">
                        目的地
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="receiverAddress"
                        v-model="logisticsOrder.receiverAddress"
                    >
                </div>
                 <div class="form-controller">
                    <label class="label-controller">
                        分发公司
                    </label>
                    <input placeholder="方案整合" class="input-controller" type="text"
                        readonly
                        name="destinationCompany"
                        v-model="logisticsOrder.destinationCompany"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        是否开发票
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                        readonly
                        name="needInvoice"
                        v-model="logisticsOrder.needInvoiceString"
                    >
                </div>
                <!--
                <div class="form-controller" v-if="logisticsOrder.logistics">
                    <label class="label-controller"
                        >付款方式</label>
                    <select type="text" class="select-controller" disabled placeholder="默认"
                        name="payWay"
                        v-model="logisticsOrder.logistics.payWay">
                            <option value="线上支付">线上支付</option>
                            <option value="全额支付">全额支付</option>
                    </select>
                </div>-->
                <div class="form-controller">
                    <label class="label-controller">
                        付款方式
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                        readonly
                        name="needInvoice"
                        value="全额支付"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        送货时间
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                        readonly
                        name="needInvoice"
                        v-model="logisticsOrder.sendDate"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        装货时间
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                        readonly
                        name="needInvoice"
                        v-model="logisticsOrder.loadDate"
                    >
                </div>
                <div class="form-controller">
                    <label class="label-controller">
                        寄件时间
                    </label>
                    <input placeholder="" class="input-controller" type="text"
                        readonly
                        name="needInvoice"
                        v-model="logisticsOrder.deliveryDate"
                    >
                </div>
                 <div class="form-controller">
                        <label class="label-controller">
                            备注
                        </label>
                        <input class="input-controller mark" type="text"
                            name="remarks"
                            v-model="logisticsOrder.remarks"
                        >
                    </div>
            </div>
            <div class="inner-heading">
                用户信息
            </div>
             <div class="inner-controller">
                <div class="form-controller">
                    <label class="label-controller">
                        保额
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="declaredValue"
                        v-model="logisticsOrder.declaredValue">
                </div>
               <!-- <div class="form-controller" v-if="logisticsOrder.cageNum">
                    <label class="label-controller">
                        笼子数量
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="cageNum"
                        v-model="logisticsOrder.cageNum">
                </div>
                <div class="form-controller"  v-if="logisticsOrder.carNum">
                    <label class="label-controller">
                        订车数量
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="carNum"
                        v-model="logisticsOrder.carNum">
                </div>
                 <div class="form-controller"  v-if="logisticsOrder.height">
                    <label class="label-controller">
                        装载高度
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="height"
                        v-model="logisticsOrder.height">
                </div>
                 <div class="form-controller"  v-if="logisticsOrder.weight">
                    <label class="label-controller">
                        重量
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="weight"
                        v-model="logisticsOrder.weight">
                </div>-->
             </div>
             <div class="card person">
                <div class="card-head">   
                    <span class="head-title">托运方</span>
                </div>
                <div class="card-body">   
                     <div class="form-controller">
                        <label class="label-controller">
                            姓名
                        </label>
                        <input 
                            class="input-controller" 
                            type="text"
                            readonly
                            name="senderName"
                            v-model="logisticsOrder.senderName"
                            >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            公司
                        </label>
                        <input 
                            class="input-controller" 
                            type="text"
                            readonly
                            name="senderCompany"
                            v-model="logisticsOrder.senderCompany"
                            >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            电话
                        </label>
                        <input class="input-controller" type="text"
                        readonly
                            name="senderPhone"
                            v-model="logisticsOrder.senderPhone">
                    </div>
                    <div class="form-controller address">
                        <label class="label-controller">
                            地址
                        </label>
                        <input class="input-controller" type="text"
                            readonly
                            name="senderAddress"
                            v-model="logisticsOrder.senderAddress">
                    </div>
                </div>
             </div>
             <div class="card person">
                <div class="card-head">   
                    <span class="head-title">收件方</span>
                </div>
                <div class="card-body">   
                     <div class="form-controller">
                        <label class="label-controller">
                            姓名
                        </label>
                        <input class="input-controller" type="text"
                        readonly
                            name="receiverName"
                            v-model="logisticsOrder.receiverName">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            公司
                        </label>
                        <input class="input-controller" type="text"
                        readonly
                            name="receiverCompany"
                            v-model="logisticsOrder.receiverCompany">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            电话
                        </label>
                        <input class="input-controller" type="text"
                        readonly
                            name="receiverPhone"
                            v-model="logisticsOrder.receiverPhone">
                    </div>
                    <div class="form-controller address">
                        <label class="label-controller">
                            地址
                        </label>
                        <input class="input-controller" type="text"
                        readonly
                            name="receiverAddress"
                            v-model="logisticsOrder.receiverAddress">
                    </div>
                </div>
             </div>
        </div>
        <div style="text-align: center">
            <button @click.prevent="backPage" style="margin: 140px 0 20px" class="btn btn-oval btn-light">
                返回
            </button>
        </div>
         <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import drapDown from '../../components/DrapDown';
import Alert from '../../components/Alert';
import { LogisticsOrder } from './enquire.class';

export default {
    created () {
        let id = this.$route.params.id;
        this.findDetail(id);
        this.orderId = id;
    },
    mounted () {
        
    },
    data () {
        return {
            lock: false,
            alertShow: false,
            alertText: '',
            orderId: '',
            dispatchCompanyId: '',
            logisticsOrder: new LogisticsOrder(),
            isDrap: false,
            list: [
                    {title: '林安物流', checked: false},
                ]
        }
    },
    methods: {
        backPage () {
            this.$router.back();
        },
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        showDrapDown () {
            this.isDrap = !this.isDrap;
        },
         hideDrapDown (data) {
            this.isDrap = false;
            this.dispatchOrder();
        },
        findDetail(id){
            this.$store.dispatch('getDistributionDetail', id).then(data => {
                console.log('getDistributionDetail',data);
               this.logisticsOrder = Object.assign({}, this.logisticsOrder, data);
            });
        },
        dispatchOrder () {
            if(this.lock) return;
            this.lock = true;
            this.$store.dispatch('dispatchDistributionOne', {
                id: this.orderId,
                companyId: this.dispatchCompanyId
            }).then(data => {
                this.alert('分发成功');
                this.lock = false;
            }).catch(err => {
                this.alert('分发失败');
                this.lock = false;
            });
        }
    },
    components: {
        drapDown,
        Alert
    }
}
</script>
<style scoped>
    #distribution-detail-page {

    }
    .section-nav {
        padding: 20px 50px;
        border-bottom: 2px solid #ddd;
        font-size: 0;
    }
    .nav-title {
        font-size: 24px;
        color: #379bf8;
        line-height: 39px;
    }
     .section-nav .btn {
         margin-left: 50px;
     }
     .section-inner {
         padding: 38px 50px 0 50px;
         border-bottom: 2px solid #ddd;
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
    .inner-heading {
        padding-left: 10px;
        border-left: 4px solid #379bf8;
        line-height: 22px;
        margin-bottom: 20px;
    }
    .section-inner-mark {
        overflow: hidden;
        padding: 0 32px;
    }
    .section-inner-mark .form-controller {
        width: 100%;
        display: table;
    }
    .section-inner-mark .form-controller .label-controller  {
         display: table-cell;
    }
    .label-controller {
        color: #666;
    }
    .input-controller.mark[type="text"] {
        width: 100%;
        display: table-cell;
    }

    .card {
        margin-left: 14px;
        border: 1px solid #ddd;
        margin-bottom: 30px;
    }
    .card-head {
        background-color: #f1f1f1;
        padding: 0 18px;
        border-bottom: 1px solid #ddd;
    }
    .head-title {
        font-size: 18px;
        line-height: 38px;
    }
    .card-body {
        padding: 20px 22px;
    }
    .card .input-select-controller .input-controller[type="text"],
    .card .input-select-controller .input-controller[type="password"] {
        width: 60px;
    }
    .card .input-controller[type="text"],
    .card .input-controller[type="password"]{
        width: 120px;
    }
    .card .select-controller {
        width: 140px;
    }
    .card .form-controller {
        margin-right: 48px;
        margin-bottom: 20px;
    }
    .inner-controller {
        margin-left: 14px;
    }
    .inner-controller .form-controller {
        margin: 0 20px 20px 0;
    }

    .person .label-controller {
        width: 55px;
    }
    .person .input-controller[type="text"],
    .person .input-controller[type="password"] {
        width: 220px;
    }
    .person .address {
       width: 100%;
    }
    .person .address .input-controller[type="text"],
    .person .address .input-controller[type="password"]{
        width: 75%;
    }
</style>