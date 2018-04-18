/**
 * 订单查询条件
 */
export class OrderQuery {
    orderNo; //订单编号
    processState; //处理状态
    senderName; //发件人
    receiverName; // 收件人
    createdDateStart; // 开始时间
    createdDateEnd; // 结束时间
    senderAddress; //寄件地
    receiverAddress; //收件地
    processState; //运单状态
}

/**
 *  物流报价信息
 */
export class Selector {
    id = ''; //报价 Id
    orderId = ''; //订单ID
    logisticsCompany = '';
    logisticsCompanyId = ''; //物流公司ID
    logisticsCompanyName = ''; //物流公司名称
    vehicleModel = ''; // 车辆型号
    licenseNumber = ''; // 车牌号，
    driverPhone = ''; // 司机电话，
    driverName = ''; // 司机名称，
    earnings = ''; // 收益，
    profitRate = ''; // 毛利率，
    totalFreight = ''; //总运费，
    packingCharges = ''; // 包装费，
    transferCharge = ''; // 中转费，
    payWay = '线上支付'; //付款方式，
    otherFee = ''; //其他费，
    premium = ''; //保费，
    sendFee = ''; //直送费，
    pickupFee = ''; //提货
    freight = ''; //运费，
    declaredValue = ''; //保额，
    charging = ''; //计费数值
    unitPrice = ''; //单价
    unit = 'KILOGRAM'; //单位

    insuranceRates = ''; // 保险费率
    grossProfit = ''; // 毛利
    deliveryCharges = ''; // 送货费
};

/**
 * 订单
 */
export class Order {
    constructor(originName, destinationName, destinationCompany) {
        this.originName = originName;
        this.destinationName = destinationName;
        this.destinationCompany = destinationCompany
    }
};

/**
 * 物流订单
 */
export class LogisticsOrder {

    handlerName = ''; //客服
    remarks = ''; //备注

    logistics = new Selector(); //物流报价信息

    // order = new Order(); //订单信息

    orderNo = ''; // 运单号
    orderType = ''; //订单类型
    handleState = ''; //物流状态
    needInvoice = ''; //是否开发票

    declaredValue = ''; //保额
    cageNum = ''; //笼子数量
    carNum = ''; //用车数量

    carType = ''; // 车辆类型

    sendDate = ''; // 发车时间
    deliveryDate = ''; // 收货时间
    loadDate = ''; // 寄件时间

    //委托人
    senderName = '';
    senderPhone = '';
    senderAddress = '';
    senderCompany = '';

    //收件人
    receiverName = '';
    receiverPhone = '';
    receiverAddress = '';
    receiverCompany = '';

    height = '';
    weight = '';


    // entrustOpposite = new person(); //委托人
    // receiveOpposite = new person(); //收件人
};