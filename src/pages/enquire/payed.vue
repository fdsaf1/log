<template>
    <div id="complete-page">
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
        <div class="seciton-table" @click.prevent="clickItems($event)">
            <table-ui 
                :theads="theads"
                :tbodys="tbodys"
                :url="'PayedDetail'"
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
        <modal title="更新司机信息" :state="modalSate" ref="modal">
            <div>
                <div class="modal-inner">
                     <div class="inner-body">
                        <form @submit.prevent="submitDriver">
                            <div class="form-controller">
                                <label class="label-controller">
                                    司机姓名
                                </label>
                                <input class="input-controller" type="text"
                                    name="charging"
                                    v-model="driver.driverName"
                                    @input="$v.driver.driverName.$touch()"
                                    :class="{
                                        'error': !$v.driver.driverName.required && $v.driver.driverName.$dirty
                                    }"
                                >
                            </div>
                            <div class="form-controller">
                                <label class="label-controller">
                                    联系电话
                                </label>
                                <input class="input-controller" type="text"
                                    name="charging"
                                    v-model="driver.driverPhone"
                                    @input="$v.driver.driverPhone.$touch()"
                                     :class="{
                                            'error': !$v.driver.driverPhone.phoneChecked && $v.driver.driverPhone.$dirty
                                    }"
                                >
                            </div>
                            <div class="form-controller">
                                <label class="label-controller">
                                    车牌号码
                                </label>
                                <input class="input-controller" type="text"
                                    name="charging"
                                    v-model="driver.carNo"
                                    @input="$v.driver.carNo.$touch()"
                                    :class="{
                                        'error': !$v.driver.carNo.required && $v.driver.carNo.$dirty
                                    }"
                                >
                            </div>
                            <div style="text-align: center;">
                                <button  :disabled="$v.driver.$invalid" type="submit" class="btn btn-ova btn-light">保存</button>
                            </div>
                        </form>
                     </div>
                </div>
            </div>
        </modal>
        <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import Page from '../../components/Page';
import TableUi from '../../components/TableUi';
import Modal from '../../components/modal';
import Datepicker from 'vuejs-datepicker';
import Alert from '../../components/Alert';
import { OrderQuery } from './enquire.class';
import { mapGetters } from 'Vuex';
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators';

class Driver {
    driverName = '';
    driverPhone = '';
    carNo = '';
    orderId = '';
}

export default {
    created () {
        if(this.payedPage){
            this.page =this.payedPage;
        }
        this.findList();
    },
    mounted () {

    },
    data () {
        return {
            driver: new Driver(),
            modalSate: false,
            query: new OrderQuery(),
            pages: 0,
            total: 0,
             alertShow: false,
            alertText: '',
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
                        {key:'报价金额', value: 'freight'},
                        {key:'备注', value: 'goodsRemark'},
                        // {key:'运单状态', value: 'handleStateString'},
                        {key:'运单日期', value: 'updatedDate'}
                      ],
            tbodys: []
        };
    },
    computed: {
        ...mapGetters(['payedPage'])
    },
    methods: {
         alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        submitDriver () {
            if(!this.$v.driver.driverPhone.phoneChecked){
                this. this.alert('手机号码格式错误');
                return;
            }
            this.$store.dispatch('updateLogistDriver', this.driver).then(res => {
                this.alert('保存成功');
                this.$refs.modal.closeModal();
                this.findList();
            }).catch(err => {
                this.alert('保存失败');
            });
        },
        confirmPrice () {
            this.modalSate = !this.modalSate;
        },
        clickItems (ev) {
            let tag = ev.target, orderId, arr, data;
            
            for(let i = 0; i < ev.path.length; i ++){
                let item = ev.path[i];
                if(item != window && item.nodeName.toLowerCase() === 'tr'){
                    orderId = item.dataset.orderId
                    break;
                }
            }

            console.log(orderId);

            arr = this.tbodys.filter(item => item.id === orderId);

            data = arr && arr[0];

            let { driverName, driverPhone, licenseNumber } = data;
            
            if(tag && tag.nodeType === 1 && orderId){
                this.confirmPrice();
                this.driver = {
                    driverName, 
                    driverPhone, 
                    carNo: licenseNumber,
                    orderId
                }
            }
        },
        findList () {
           return this.$store.dispatch('getpayedList', {
                pageRequest: this.page,
                query: this.query
            }).then(data => {
                this.tbodys = data.list;
                this.page.pageNum = data.pageNum;
                this.page.pageSize = data.pageSize;
                this.pages = data.pages;
                this.total = data.total;

                console.log('这是返回的列表数据', data);
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
    validations: {
        driver: {
            driverName: {
                required
            },
            carNo: {
                required
            },
            driverPhone: {
                phoneChecked (value) {
                    if (value === '') return true;
                    return /^1[345789][\d]{9}$/ig.test(value);
                }
            }
        }
    },
    components: {
        Page,
        TableUi,
        Datepicker,
        Modal,
        Alert
    }
}
</script>
<style scoped>
    #complete-page {

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
    .enty .btn {
        margin-right: 20px;
        width: 134px;
    }
    .page-wrap {
        padding-top: 130px;
    }
    .inner-body {
        padding: 20px;
    }
    .inner-body .form-controller {
        display: block;
    }
</style>