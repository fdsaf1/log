<template>
    <div id="page" @click="clickBtn">   
        <button class="btn btn-light" data-tag="gotoIndex">
            首页
        </button>
        <button class="btn btn-white" data-tag="gotoPro">
            上一页
        </button>
         <button class="btn btn-white"  data-tag="gotoNext">
            下一页
        </button>
        <button class="btn btn-white" data-tag="gotoLast">
            尾页
        </button>
        <span class="page-help-text"> 
            共{{total}}条记录 {{number}}/{{pages}}页
        </span>
        <input class="input-controller" type="text" v-model="toPageNum">
        <button class="btn btn-white" data-tag="gotoPage">
            GO
        </button>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex';
export default {
    name: 'page',
    created () {
        
    },
    mounted () {

    },
    data () {
        return {
            toPageNum: '',
            pageNum: 1
        }
    },
    computed: {
        
    },
    watch: {
        number (n) {
            this.pageNum = n;
        }
    },
    methods: {
        clickBtn (ev) {
            let data = ev.target.dataset['tag'];
            if(data){
                this[data](ev);
            }
        },  
        gotoIndex (ev) {
            console.info('index');
            let num = this.pageNum = 1;
            this.pageEmitEvent(num);
        },
        gotoPro (ev) {
            if( -- this.pageNum < 1){
                this.pageNum = 1;
            }
            console.info('pro');
            let num = this.pageNum;
            this.pageEmitEvent(num);
        },
        gotoNext (ev) {
            if(++ this.pageNum > this.pages){
                this.pageNum = this.pages;
            }
            console.info('next');
            let num = this.pageNum;
            this.pageEmitEvent(num);
        },
        gotoLast (ev) {
            console.info('last');
            let num = this.pages;
            this.pageEmitEvent(num);
        },
        gotoPage (ev) {
            console.info('goto');
            let num = this.toPageNum;
            if(/^[\d]+$/ig.test(num) && num <= this.pages && num >= 1){
                this.pageEmitEvent(num);
            }
        },
        pageEmitEvent (number) {
            this.$emit('pageCb', number);
        }
    },
    props: {
        pages: {
            default () {
                return 1;
            }
        },
        total: {
             default () {
                 return 0;
             }
        },
        number: {
            default () {
                return 1;
            }
        },
        size: {
            default () {
                return 20;
            }
        }
    }
}
</script>
<style scoped>
    #page {
        font-size: 0;
        margin-bottom: 20px;
    }
    .btn {
        width: 75px;
        height: 32px;
        font-size: 14px;
        margin-right: 10px;
    }
    .btn-white {
        color: #808080;
    }
    .input-controller[type="text"],
    .input-controller[type="password"] {
        width: 60px;
        height: 30px;
        margin-right: 10px;
        vertical-align: bottom;
    }
    .page-help-text {
        margin-right: 10px;
        line-height: 32px;
    }
</style>