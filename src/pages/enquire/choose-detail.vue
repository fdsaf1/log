<template>
    <div id="choose-detail-page">
        <div class="section-nav">
            <span class="nav-title">
                运单详情
            </span>
            <button class="btn btn-oval btn-light" @click="confirmPrice">
                    选择报价
            </button>
             <button class="btn btn-oval btn-light" :disabled="lock" @click="feedbacToCustomer">
                回复客户
            </button>
        </div>
        <div class="section-inner">
            <div class="inner-heading">
                <span>物流公司信息 </span>
                <span class="inner-heading-form" v-if="!this.isCustomOffer">
                    <div class="form-controller">
                        <input ref="dynamicPrice" type="text" maxlength="8" @keyup="checkNum" class="input-controller">
                    </div>
                    (价格调整，单位：元)
                </span>
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
                                v-model="logisticsOrder.logistics.charging"
                            >
                        </div>
                        <div class="form-controller">
                            <label class="label-controller">
                                直送费
                            </label>
                            <input class="input-controller" type="text"
                                name="sendFee"
                                readonly
                                v-model="logisticsOrder.logistics.sendFee"
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
                <button @click.prevent="saveLogistics" :disabled="lock" style="margin: 140px 0 20px" class="btn btn-oval btn-light">
                    保存
                </button>
             </div>
        </div>
        <modal title="选择物流" :state="modalSate" ref="modal">
           <div>
                 <div class="modal-inner">
                        <div>
                            <div class="inner-heading">
                                <div class="fr">
                                    <button class="btn btn-oval btn-light btn-clear" @click="selectOrder">
                                        自定义
                                    </button>
                               </div>
                            </div>
                            <div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        物流公司
                                    </label>
                                    <select class="select-controller" style="font-size: 16px;" v-model="selector.logisticsCompany">
                                        <option value="">请选着物流公司</option>
                                        <option :value="logisticsCompany" v-for="logisticsCompany in logisticsCompanys">
                                            {{logisticsCompany.companyName}}
                                        </option>
                                    </select>
                                </div>
                                <br>
                                <template v-if="logisticsOrder.orderType === 'BREAKBULK'">
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            单价
                                        </label>
                                        <div class="input-select-controller">
                                            <input class="input-controller" type="text"
                                                name="unitPrice"
                                                v-model="selector.unitPrice"
                                            >
                                            <select class="select-controller" name="unit" v-model="selector.unit">
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
                                            v-model="selector.charging"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            直送费
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="sendFee"
                                            v-model="selector.sendFee"
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
                                            v-model="selector.insuranceRates"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            毛利
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="grossProfit"
                                            v-model="selector.grossProfit"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            送货费
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="deliveryCharges"
                                            v-model="selector.deliveryCharges"
                                        >
                                    </div>
                                </template>
                                
                                <br />
                                <div class="form-controller">
                                    <label class="label-controller">
                                        保额
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="declaredValue"
                                        v-model="selector.declaredValue"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        运费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="freight"
                                        v-model="selector.freight"
                                    >
                                </div>
                                <br>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        提货
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="pickupFee"
                                        v-model="selector.pickupFee"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        保费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="premium"
                                        readonly
                                        v-model="currentPremium"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        其他费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="otherFee"
                                        v-model="selector.otherFee"
                                    >
                                </div>
                                <!--<div class="form-controller">
                                    <label class="label-controller">
                                        付款方式
                                    </label>
                                    <select class="select-controller"
                                        name="payWay"
                                        v-model="selector.payWay"
                                    >
                                        <option value="现付">现付</option>
                                    </select>
                                </div>-->
                                <div class="form-controller">
                                    <label class="label-controller">
                                        中转费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="transferCharge"
                                        v-model="selector.transferCharge"
                                    >
                                </div>

                                <br>

                                <div class="form-controller">
                                    <label class="label-controller">
                                        包装费
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="packingCharges"
                                        v-model="selector.packingCharges"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        总运费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="totalFreight"
                                        readonly
                                        v-model="currentPrice"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        毛利率
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="profitRate"
                                        v-model="selector.profitRate"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        收益
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="earnings"
                                        v-model="selector.earnings"
                                    >
                                </div>

                                <br>

                                  <div class="form-controller">
                                    <label class="label-controller">
                                        司机姓名
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="driverName"
                                        v-model="selector.driverName"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        司机电话
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="driverPhone"
                                        v-model="selector.driverPhone"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        车型型号
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="licenseNumber"
                                        v-model="selector.licenseNumber"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        车型号码
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="vehicleModel"
                                        v-model="selector.vehicleModel"
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-for="logisticsOffer in logisticsOfferList">
                            <div class="inner-heading">
                                <div class="fr">
                                    <button class="btn btn-oval btn-light btn-clear" @click="selectOffer(logisticsOffer)">
                                        选择报价
                                    </button>
                               </div>
                            </div>
                            <div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        物流公司
                                    </label>
                                    <input class="input-controller" type="text"
                                            name="charging"
                                            readonly
                                            v-model="logisticsOffer.logisticsCompanyName"
                                      >
                                </div>
                                <br>
                                <template v-if="logisticsOrder.orderType === 'BREAKBULK'">
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            单价
                                        </label>
                                        <div class="input-select-controller">
                                            <input class="input-controller" type="text"
                                                name="unitPrice"
                                                readonly
                                                v-model="logisticsOffer.unitPrice"
                                            >
                                            <select class="select-controller" 
                                                disabled
                                                name="unit"
                                                v-model="logisticsOffer.unit">
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
                                            v-model="logisticsOffer.charging"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            直送费
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="sendFee"
                                            readonly
                                            v-model="logisticsOffer.sendFee"
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
                                            v-model="logisticsOffer.insuranceRates"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            毛利
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="grossProfit"
                                            readonly
                                            v-model="logisticsOffer.grossProfit"
                                        >
                                    </div>
                                    <div class="form-controller">
                                        <label class="label-controller">
                                            送货费
                                        </label>
                                        <input class="input-controller" type="text"
                                            name="deliveryCharges"
                                            readonly
                                            v-model="logisticsOffer.deliveryCharges"
                                        >
                                    </div>
                                </template>
                                
                                <br />
                                <div class="form-controller">
                                    <label class="label-controller">
                                        保额
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="declaredValue"
                                        readonly
                                        v-model="logisticsOffer.declaredValue"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        运费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="freight"
                                        readonly
                                        v-model="logisticsOffer.freight"
                                    >
                                </div>
                                <br>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        提货
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="pickupFee"
                                        readonly
                                        v-model="logisticsOffer.pickupFee"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        保费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="premium"
                                        readonly
                                        v-model="logisticsOffer.premium"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        其他费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="otherFee"
                                        readonly
                                        v-model="logisticsOffer.otherFee"
                                    >
                                </div>
                                <!--<div class="form-controller">
                                    <label class="label-controller">
                                        付款方式
                                    </label>
                                    <select class="select-controller"
                                        name="payWay"
                                        v-model="logisticsOffer.payWay"
                                    >
                                        <option value="现付">现付</option>
                                    </select>
                                </div>-->
                                <div class="form-controller">
                                    <label class="label-controller">
                                        中转费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="transferCharge"
                                        readonly
                                        v-model="logisticsOffer.transferCharge"
                                    >
                                </div>

                                <br>

                                <div class="form-controller">
                                    <label class="label-controller">
                                        包装费
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="packingCharges"
                                         readonly
                                        v-model="logisticsOffer.packingCharges"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        总运费
                                    </label>
                                    <input class="input-controller" type="text"
                                        name="totalFreight"
                                        readonly
                                        v-model="logisticsOffer.totalFreight"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        毛利率
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="profitRate"
                                         readonly
                                        v-model="logisticsOffer.profitRate"
                                    >
                                </div>
                                <div class="form-controller">
                                    <label class="label-controller">
                                        收益
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="earnings"
                                         readonly
                                        v-model="logisticsOffer.earnings"
                                    >
                                </div>

                                <br>

                                  <div class="form-controller">
                                    <label class="label-controller">
                                        司机姓名
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="driverName"
                                         readonly
                                        v-model="logisticsOffer.driverName"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        司机电话
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="driverPhone"
                                         readonly
                                        v-model="logisticsOffer.driverPhone"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        车型型号
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="licenseNumber"
                                         readonly
                                        v-model="logisticsOffer.licenseNumber"
                                    >
                                </div>
                                 <div class="form-controller">
                                    <label class="label-controller">
                                        车型号码
                                    </label>
                                    <input class="input-controller" type="text"
                                         name="vehicleModel"
                                         readonly
                                        v-model="logisticsOffer.vehicleModel"
                                    >
                                </div>
                            </div>
                        </div>
                 </div>
           </div>
        </modal>
        <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import drapDown from '../../components/DrapDown';
import Modal from '../../components/modal';
import Alert from '../../components/Alert';
import { mapGetters } from 'Vuex';
import { Selector, LogisticsOrder } from './enquire.class';

export default {
    created () {
        let id = this.$route.params.id;
        this.orderId = id;
        this.getOrderDetail();
        this.getLogisticOffers();
        this.$store.dispatch('getLogisticsCompanysInfo');
        
        this.$store.dispatch('getOfferLogisticList', {
            page: null,
            id: id
        }).then(data => {
           this.logisticsOfferList = data;
        })
    },
    mounted () {

    },
    data () {
        return {
            lock: false,
            offerId: '',
            orderId: '',
            isCustomOffer: false,
            isSelectOffer: false,
            alertShow: false,
            alertText: '',
            selector: new Selector(), //保存自定义物流报价
            logisticsSelector: new Selector(), //保存选中的物流报价
            logisticsOrder: new LogisticsOrder(), //保存物流订单，
            logisticsOfferList: [],
            selectCacheOfferOrder:  new Selector(),
            dynamicPrice: '',
            isDrap: false,
            modalSate: false,
            isChange: false,
            otherLogistics: [],
            list: [
                    {title: '林安物流', checked: false},
                    {title: '货拉拉', checked: false},
                    {title: '云鸟', checked: false},
                ]
        }
    },
    computed: {
         ...mapGetters(['logisticsCompanys']),
         currentPrice() {
             let {
                   unitPrice,
                   freight,
                   pickupFee,
                   sendFee,
                   premium,
                   otherFee,
                   transferCharge,
                   packingCharges,
                   totalFreight
               } = this.selector;

            //    totalFreight = this.logisticsSelector.totalFreight;

                totalFreight = 0;

                let arr = [unitPrice, freight, pickupFee, sendFee, otherFee, transferCharge, packingCharges, premium];
             // 计算总价
                arr.forEach(value => {
                    value = filterOutputNum(value);
                    totalFreight =  value ? Number(+value) + Number(+totalFreight) : Number(+totalFreight);
                });     
                let selector = this.selector;
                selector.totalFreight = (+totalFreight).toFixed(2);
                return totalFreight.toFixed(2);
         },
         currentPremium () {
            let {
                   premium,
                   charging,
                   declaredValue,
               } = this.selector;
            // 计算数值
            premium = filterOutputNum((+[charging] * +[declaredValue]).toFixed(2));
            let selector = this.selector;
            selector.premium = (premium);
            return premium;
         }
    },
    methods: {
        feedbacToCustomer () {
            if(!this.orderId || !this.offerId || this.lock) {
                this.alert('请保存后，再试试');
            };
            this.lock = true;
            this.$store.dispatch('feedbacToCustomer', {
                orderId: this.orderId,
                offerId: this.offerId
            }).then(res => {
                this.alert('回复成功');
                this.lock = false;
            }).catch(err => {
                this.alert('回复失败');
                this.lock = false;
            });
        },
        getOrderDetail () {
            this.$store.dispatch('getDistributionDetail', this.orderId).then(data => {
                // console.log('getDistributionDetail', data);
                this.logisticsOrder = Object.assign({}, this.logisticsOrder, data);
                if(data.offerId){
                    this.$store.dispatch('getOfferByOrder', {offerId: data.offerId}).then(res => {
                        console.log(res);
                        this.logisticsOrder.logistics = res.data;
                    });
                }
            });
        },
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        saveLogistics () {
            if(this.lock) return;
            this.lock = true;
            if(this.isCustomOffer){
                this.customOffer().then(data => {
                    //  this.logisticsOrder.logistics.id = data.id;
                    //  let result = Object.assign({}, this.logisticsOrder.logistics);
                    //  result.orderId = this.logisticsOrder.id;
                    //  delete result.logisticsCompany;
                      console.log(data);
                     return this.$store.dispatch('modifyLogisticPrice', data);
                }).then(res => {
                    setTimeout(_ => {
                        this.alert('保存成功');
                    }, 200)
                    this.lock = false;
                }).catch(err => {
                    console.error(err);
                    setTimeout(_ => {
                       this.alert('保存失败');
                    }, 200)
                    this.lock = false;
                });
            }else {
                this.setOfferOrder().then(data => {
                    let result = Object.assign({}, this.logisticsOrder.logistics);
                    result.orderId = this.logisticsOrder.id;
                    delete result.logisticsCompany;
                    console.log(result);
                    return this.$store.dispatch('modifyLogisticPrice', result);
                }).then(res => {
                     setTimeout(_ => {
                        this.alert('保存成功');
                    }, 200)
                    this.lock = false;
                }).catch(err => {
                     console.error(err);
                    setTimeout(_ => {
                       this.alert('保存失败');
                    }, 200)
                    this.lock = false;
                });
            }
           
        },
        selectOffer (item) {
            this.logisticsOrder.logistics =  Object.assign({}, item);
            this.selectCacheOfferOrder =  Object.assign({}, item);
            this.logisticsSelector = Object.assign({}, item);
            this.isSelectOffer = true;
            this.isCustomOffer = false;
            this.closeModal();
        },
        selectOrder(ev) {
            if(!this.selector.logisticsCompany.companyName){
                this.alert('请选择一个物流公司');
                return;
            }
            this.logisticsOrder.logistics = Object.assign({}, this.selector);
            this.logisticsOrder.logistics.logisticsCompanyName = this.selector.logisticsCompany.companyName;
            this.logisticsOrder.logistics.logisticsCompanyId = this.selector.logisticsCompany.id;
            this.logisticsSelector = Object.assign({}, this.selector);
            this.isCustomOffer = true;
            this.closeModal();
        },
        setOfferOrder () {
            return this.$store.dispatch('setSelectOfferOrder', {
                orderId: this.orderId,
                offerId: this.selectCacheOfferOrder.id
            }).then(data => {
                 setTimeout(() => {
                    this.alert('选择报价成功');
                }, 0);
                this.offerId = this.selectCacheOfferOrder.id
                this.isSelectOffer = false;
                this.lock = false;
                return data;
            }).catch(err => {
                setTimeout(() => {
                    this.alert('选择报价失败，请稍后再试');
                }, 0);
                this.isSelectOffer = false;
                this.lock = false;   
                throw new Error('发生错误啦');
            })
        },
        customOffer () {
            // this.logisticsOrder.logistics = Object.assign({}, this.selector);
            //    this.logisticsSelector = Object.assign({}, this.selector);
            //    this.$refs.dynamicPrice.value = null;
           return this.$store.dispatch('addCustomOffer', {
               selector: this.selector,
               id: this.orderId,
           }).then(res => {
               setTimeout(() => {
                    this.alert('自定定义报价成功');
               }, 0);
                // this.logisticsSelector = Object.assign({}, this.selector);
                this.offerId = res.offer.id
                this.isCustomOffer = false;
                this.lock = false;
                return res.offer;
           }).catch(res => {
               this.isCustomOffer = false;
               this.lock = false;
               this.alert('自定定义报价失败，请重新填写物流信息');
            //    this.logisticsOrder.logistics = new Selector();
               this.logisticsOrder.logistics = Object.assign({}, this.logisticsSelector);
               throw new Error('发生错误啦');
           });
        },
        getLogisticOffers(){
            this.$store.dispatch('findLogisticOfferList', this.orderId).then(data => {
                // this.otherLogistics = res.list;
                // console.log('findLogisticOfferList', data);
                if(!data.length) return;
                let result = data[0];
                this.offerId = result.id;
                // this.selector = Object.assign({}, this.selector, result); 
                this.$set(this.selector, 'logisticsCompany', {
                    id: result.logisticsCompanyId,
                    companyName: result.logisticsCompanyName
                });
                this.logisticsSelector = Object.assign({}, this.selector, result);
                this.logisticsOrder.logistics = Object.assign({}, this.logisticsOrder.logistics, result);
            });
        },
        closeModal(){
            this.$refs.modal.closeModal();
            // this.getLogisticOffers();
        },
        checkNum (ev) {
            let el = ev.target,
            value = filterOutputNum(el.value);
            el.value = value;
            this.dynamicPrice = value;
        },
        showDrapDown () {
            this.isDrap = !this.isDrap;
            
        },
         hideDrapDown (data) {
            this.isDrap = false;
            console.log(data);
        },
        confirmPrice () {
            this.modalSate = !this.modalSate;
        }
    },
    watch: {
        dynamicPrice (n, o) {
            let totalFreight = this.logisticsSelector.totalFreight || '0',
                unitPrice = this.logisticsSelector.unitPrice || '0';
                
            this.$set(this.logisticsOrder.logistics, 'totalFreight', Number(+[totalFreight]) + Number(+n));
            this.$set(this.logisticsOrder.logistics, 'unitPrice', Number(+[unitPrice]) + Number(+n));
        }
    },
    components: {
        drapDown,
        Modal,
        Alert
    }
}

function filterOutputNum (val) {
    let value = val;
    if(Object.prototype.toString.call(val) === '[object String]' || Object.prototype.toString.call(val) === '[object Number]'){
        value = (''+val).replace(/[^\.|\d]/ig, '');
        let i = value.indexOf('.'),
        lastI = value.lastIndexOf('.');

        if(i == 0){
            value = '0' + value;
        }else if ( i !== lastI) {
            value = value.slice(0, lastI);
        }
    }
    
    return value;
}
</script>
<style scoped>
    #choose-detail-page {

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
    .modal-inner {
        padding: 20px 30px;
    }
    .modal-inner .form-controller {
        margin-right: 30px;
        margin-bottom: 20px;
    }
    .modal-inner .label-controller {
        font-size: 16px;
        width: 80px;
        line-height: 32px;
    }
    .modal-inner .input-controller[type="text"],
    .modal-inner .input-controller[type="password"]{
        width: 120px;
        height: 30px;
    }
    .modal-inner .select-controller {
        width: 140px;
        height: 30px;
    }
     .modal-inner .input-select-controller .input-controller[type="text"],
     .modal-inner .input-select-controller .input-controller[type="password"] {
          width: 60px;
     }
    .modal-inner .input-select-controller .select-controller {
        width: 100px;
        height: 30px;
    }
    .modal-inner .radio-controller-wrap {
        margin-left: 20px;
    }
    .section-inner-mark .input-controller.mark[type="text"] {
        width: 100%;
    }
    .inner-heading-form .form-controller .input-controller[type="text"] {
        border-color: transparent;
        border-bottom-color: #ddd;
        width: 90px;
    }
    .inner-heading-form .form-controller .input-controller[type="text"]:focus {
        outline: none;
    }
</style>