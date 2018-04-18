<template>
    <div id="complete-detail-page">
        <div class="section-nav">
            <span class="nav-title">
                运单详情
            </span>
        </div>
        <div class="section-inner">
            <div class="inner-heading">
                <span>物流公司信息 </span>
            </div>
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
                <!--
                <div class="section-inner-mark">
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
                -->
            </div>
            <div class="card">
                <div class="card-head">
                    <span class="head-title">{{logisticsOrder.logistics.logisticsCompanyName || '某某物流'}}</span>
                </div>
                 <div class="card-body">
                      <template v-if="logisticsOrder.orderType === 'BREAKBULK'">
                        <div class="form-controller">
                            <label class="label-controller">
                                单价
                            </label>
                            <div class="input-select-controller">
                                <input class="input-controller" type="text"
                                    name="unitPrice"
                                    readonly
                                    v-model="logisticsOrder.logistics.unitPrice"
                                >
                                <select class="select-controller" name="unit" disabled v-model="logisticsOrder.logistics.unit">
                                    <option value="KILOGRAM">元/千克</option>
                                    <option value="CUBE">元/立方</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-controller">
                            <label class="label-controller">
                                计算数值
                            </label>
                            <input class="input-controller" type="text"
                                name="charging"
                                readonly
                                v-model="ogisticsOrder.logistics.charging"
                            >
                        </div>
                        <div class="form-controller">
                            <label class="label-controller">
                                直送费
                            </label>
                            <input class="input-controller" type="text"
                                name="sendFee"
                                readonly
                                v-model="ogisticsOrder.logistics.sendFee"
                            >
                        </div>
                    </template>
                    <template v-else-if="logisticsOrder.orderType === 'CARLOAD'">
                        <div class="form-controller">
                            <label class="label-controller">
                                保险费率
                            </label>
                            <input class="input-controller" type="text"
                                name="insuranceRates"
                                readonly
                                v-model="logisticsOrder.logistics.insuranceRates"
                            >
                        </div>
                        <div class="form-controller">
                            <label class="label-controller">
                                毛利
                            </label>
                            <input class="input-controller" type="text"
                                name="grossProfit"
                                readonly
                                v-model="logisticsOrder.logistics.grossProfit"
                            >
                        </div>
                        <div class="form-controller">
                            <label class="label-controller">
                                送货费
                            </label>
                            <input class="input-controller" type="text"
                                name="deliveryCharges"
                                readonly
                                v-model="logisticsOrder.logistics.deliveryCharges"
                            >
                        </div>
                    </template>
                    <div class="form-controller">
                        <label class="label-controller">毛利率</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="profitRate"
                            v-model="logisticsOrder.logistics.profitRate"
                            >
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">运费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="freight"
                            v-model="logisticsOrder.logistics.freight"
                        >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">提货</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="pickupFee"
                            v-model="logisticsOrder.logistics.pickupFee">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">保费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="premium"
                            v-model="logisticsOrder.logistics.premium">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">包装费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="packingCharges"
                            v-model="logisticsOrder.logistics.packingCharges">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">其他费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="otherFee"
                            v-model="logisticsOrder.logistics.otherFee">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">中转费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="transferCharge"
                            v-model="logisticsOrder.logistics.transferCharge">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">总运费</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="totalFreight"
                            v-model="logisticsOrder.logistics.totalFreight">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">收益</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="earnings"
                            v-model="logisticsOrder.logistics.earnings">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">司机姓名</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="driverName"
                            v-model="logisticsOrder.logistics.driverName">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">司机电话</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="driverPhone"
                            v-model="logisticsOrder.logistics.driverPhone">
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">车牌号码</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="licenseNumber"
                            v-model="logisticsOrder.logistics.licenseNumber">
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">车辆型号</label>
                        <input type="text" class="input-controller" placeholder="默认"
                            readonly
                            name="vehicleModel"
                            v-model="logisticsOrder.logistics.vehicleModel">
                    </div>
                </div>
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
                 <div class="form-controller" style="display: table; width: 100%;">
                        <label class="label-controller" style="display: table-cell">
                            备注
                        </label>
                        <input class="input-controller" type="text"
                            name="remarks"
                             style="width: 100%;"
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
                        v-model="logisticsOrder.declaredValue"
                    >
                </div>
                <!--
                <div class="form-controller" v-if="logisticsOrder.cageNum">
                    <label class="label-controller">
                        笼子数量
                    </label>
                    <input class="input-controller" type="text"
                        readonly
                        name="cageNum"
                        v-model="logisticsOrder.cageNum"
                    >
                </div>
                 <div class="form-controller" v-if="logisticsOrder.carNum">
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
                </div> -->
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
                        <input class="input-controller" type="text"
                            readonly
                            name="senderName"
                            v-model="logisticsOrder.senderName"
                        >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            公司
                        </label>
                        <input class="input-controller" type="text"
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
                            v-model="logisticsOrder.senderPhone"
                        >
                    </div>
                    <div class="form-controller address">
                        <label class="label-controller">
                            地址
                        </label>
                        <input class="input-controller" type="text"
                            readonly
                            name="senderAddress"
                            v-model="logisticsOrder.senderAddress"
                        >
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
                            v-model="logisticsOrder.receiverName"
                        >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            公司
                        </label>
                        <input class="input-controller" type="text"
                            readonly
                            name="receiverCompany"
                            v-model="logisticsOrder.receiverCompany"
                        >
                    </div>
                     <div class="form-controller">
                        <label class="label-controller">
                            电话
                        </label>
                        <input class="input-controller" type="text"
                            readonly
                            name="receiverPhone"
                            v-model="logisticsOrder.receiverPhone"
                        >
                    </div>
                    <div class="form-controller address">
                        <label class="label-controller">
                            地址
                        </label>
                        <input class="input-controller" type="text"
                            readonly
                            name="receiverAddress"
                            v-model="logisticsOrder.receiverAddress"
                        >
                    </div>
                </div>
             </div>
             <div style="text-align: center">
                <button @click.prevent="saveLogistics" style="margin: 140px 0 20px" class="btn btn-oval btn-light">
                    返回
                </button>
             </div>
        </div>
    </div>
</template>
<script>
import drapDown from '../../components/DrapDown';
import { Selector, LogisticsOrder } from './enquire.class';

export default {
    name: 'complete-detail',
    created () {
        let id = this.$route.params.id;
        this.orderId = id;
        this.getOrderDetail();
        this.getLogisticOffers();
    },
    mounted () {
        
    },
    data () {
        return {
            offerId: '',
            orderId: '',
            alertShow: false,
            alertText: '',
            selector: new Selector(), //保存自定义物流报价
            logisticsSelector: new Selector(), //保存选中的物流报价
            logisticsOrder: new LogisticsOrder(), //保存物流订单
            dynamicPrice: '',
            isDrap: false,
            modalSate: false,
            isChange: false,
            otherLogistics: []
        }
    },
    methods: {
        getOrderDetail () {
            this.$store.dispatch('getDistributionDetail', this.orderId).then(data => {
                this.logisticsOrder = Object.assign({}, this.logisticsOrder, data);
            });
        },
        showDrapDown () {
            this.isDrap = !this.isDrap;
        },
         hideDrapDown (data) {
            this.isDrap = false;
            console.log(data);
        },
        saveLogistics(){
           this.$router.back();
        },
        getLogisticOffers(){
            this.$store.dispatch('findLogisticOfferList', this.orderId).then(data => {
                // this.otherLogistics = res.list;
                console.log('findLogisticOfferList', data);
                if(!data.length) return;
                this.selector = Object.assign({}, this.selector, data[0]);
                this.logisticsSelector = Object.assign({}, this.selector, data[0]);
                this.logisticsOrder.logistics = Object.assign({}, this.logisticsOrder.logistics, data[0]);
            });
        },
    },
    components: {
        drapDown
    }
}
</script>
<style scoped>
    #complete-detail-page {

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
         width: 134px;
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
    .person .address .input-controller[type="password"] {
        width: 75%;
    }
</style>