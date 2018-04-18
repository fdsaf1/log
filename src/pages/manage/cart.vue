<template>
    <div id="router-page">
        <div class="seciton-table">
            <div class="enty">
                <router-link to="cart/add-cart" tag="button" class="btn btn-oval btn-light">
                    添加
                </router-link>
                 <button class="btn btn-oval btn-light" @click="deleteCart">
                    删除
                </button>
            </div>
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                :url="'cart/add-cart'"
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
import Alert from '../../components/Alert';
import { mapGetters } from 'Vuex';
import Vue from 'vue';
export default {
    created () {
        if(this.cartPage){
            this.page = this.cartPage;
        }
        this.getList();
    },
    mounted () {
       
    },
    data () {
        return {
            ids: [],
            alertShow: false,
            alertText: '',
            total: 0,
            pages: 0,
            page: {
                pageNum: 1,
                pageSize: 10
            },
            theads: [
                {
                    key: '车辆ID',
                    value: 'id'
                },
                {
                    key: '车型',
                    value: 'carmodelsName'
                },
                {
                    key: '最后修改时间',
                    value: 'updatedDate'
                }
            ],
            tbodys: []
        };
    },
    computed: {
        ...mapGetters(['cartPage'])
    },
    methods: {
        getList () {
            let dataFormat = Vue.filter('dateFormat');
            this.$store.dispatch('getCartsList', this.page).then(data => {
               data.list.map(item => {
                    item.updatedDate = dataFormat(item.updatedDate, 'yyyy/MM/dd hh:mm');
                    return item;
               });
                this.tbodys = data.list;
                this.pages = data.pages;
                this.total = data.total;
            });
        },
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        deleteCart () {
            let len = this.tbodys.length;
            this.$store.dispatch('deleteCarts', this.tbodys).then(data => {
                this.alert('成功删除' + (len - data.length) + '项');
                 this.pageCb();
            }).catch(erro => {
                this.alert('删除失败');
            })
        },
        pageCb (num) {
            if (num) {
                this.page.pageNum = num;
            }
           this.getList();
        }
    },
    components: {
        HeaderBar,
        Page,
        TableUi,
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