<template>
    <div id="account-page">
        <div class="seciton-table">
            <div class="enty" @click.prevent="operationBtn">
                <router-link to="/manage/account/add-account" tag="button" class="btn btn-oval btn-light">
                    添加
                </router-link>
                <button data-target-btn="delete" class="btn btn-oval btn-light">
                    删除
                </button>
                <button data-target-btn="offUse" class="btn btn-oval btn-light">
                    停用
                </button>
                <button data-target-btn="onUse" class="btn btn-oval btn-light">
                    启用
                </button>
                 <button data-target-btn="reset" class="btn btn-oval btn-light">
                    重置密码
                </button>
            </div>
            <table-ui 
                :theads="theads" 
                :tbodys="tbodys"
                :url="'account/add-account'"
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
        <alert :show="alertShow" :text="alertText" :buttons="buttons"></alert>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Page from '../../components/Page';
import TableUi from '../../components/TableUi';
import Alert from '../../components/Alert';
import { mapGetters } from 'Vuex';
export default {
    created () {
        if(this.accountPage){
            console.log(this.accountPage);
             this.page = this.accountPage;
        }
        this.getList();
    },
    mounted () {

    },
    data () {
        return {
            alertShow: false,
            alertText: '',
            pages: 0,
            total: 10,
            page: {
                pageSize: 10,
                pageNum: 1
            },
            theads: [
                {
                    key: '用户编号',
                    value: 'userCode'
                },
                {
                    key: '用户名',
                    value: 'account'
                },
                {
                    key: '电话号码',
                    value: 'phone'
                },
                {
                    key: '是否启用',
                    value: 'disabledString'
                },
                {
                    key: '最后登录时间',
                    value: 'lastLoginTime'
                }
            ],
            tbodys: [],
            buttons: [
                 {
                    title: '确定',
                    class: ['btn-oval','btn-light'],
                    eventCb  (ev) {
                        ev.hide();
                        console.log('确认');
                    }
                },
                {
                    title: '取消',
                    class: ['btn-oval','btn-default'],
                    eventCb  (ev) {
                        ev.hide();
                        console.log('取消');
                    }
                }
            ]
        };
    },
    computed: {
        ...mapGetters(['accountPage'])
    },
    methods: {
        alert(text, okCb) {
            this.alertText = text;
            this.buttons[0].eventCb = okCb;
            this.alertShow = !this.alertShow;
        },
        operationBtn (ev) {
            let target = ev.target.dataset.targetBtn;
            let index = ['delete', 'revise', 'offUse', 'onUse', 'reset'].indexOf(target);
            if(index === -1) return;
            let operationFn = this.operation()[target];
            operationFn();
        },
        operation () {
            let that = this;
            return {
                delete () {
                   that.handleOperation('删除', 'deleteUsers');
                },
                revise () {
                   
                },
                offUse () {
                    that.handleOperation('停用', 'disableUsers');
                },
                onUse () {
                    that.handleOperation('启用', 'enableUsers');
                },
                reset () {
                     that.handleOperation('重置密码', 'resetPasswords');
                }
            }
        },
        handleOperation (name, Operation) {
            let len = this.tbodys.length, that = this;
            if(!len) return;
            this.alert('确定要'+name+'这些用户？', function (ev) {
                ev.hide();
                return that.$store.dispatch(Operation, that.tbodys).then(data => {
                    that.getList();
                    that.alert('成功'+ name + (len - data.length) + '项', ev => ev.hide());
                    return data;
                }).catch(err => {
                    that.alert(name + '失败', ev => ev.hide());
                    throw err;
                })
            });
        },
        getList (num) {
            if(num){
                 this.page.pageNum = num;
            }
            this.$store.dispatch('getUserList', this.page).then(data => {
                console.log('getUserList', data);
                this.pages = data.pages;
                this.total = data.total;      
                this.tbodys = data.list;  
            });
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
        Alert
    }
}
</script>
<style scoped>
    #account-page {

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