<template>
    <div id="alert-component" v-show="rootShow">   
       <div ref="alertDialog" class="alert-dialog" :class="{
           'active': alertShow
       }">
        <div class="alert-head">
            <h2 class="alert-title">{{title || '提示信息'}}</h2>
        </div>
        <div class="alert-body">
            <p>{{text || '这是内容'}}</p>
        </div>
        <div class="alert-foot" @click.prevent="clickBtnTag">
            <button v-for="(button, index) in alertButtons" :data-btn-tag="index" class="btn" :class="button.class">
                {{button.title}}
            </button>
        </div>
       </div>
    </div>
</template>
<script>

let buttons = [
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
                class: ['btn-oval', 'btn-default'],
                eventCb  (ev) {
                    ev.hide();
                    console.log('取消');
                }
            }
        ];
export default {
    created () {

    },
    mounted () {
       this.transitionendFn();
    },
    updated () {

    },
    data () {
        return {
            rootShow: false,
            alertShow: false || this.show,
            alertButtons: this.buttons || buttons
        }
    },
    methods: {
        clickBtnTag (ev) {
            let dataset = ev.target.dataset,
            tag = dataset.btnTag;
            this.prevent = false;
            if(ev.target.nodeName.toLowerCase() === 'button'){
               let lock = this.alertButtons[tag].eventCb(this);
            }
        },
        transitionendFn () {
            let alertDialog = this.$refs.alertDialog;

            alertDialog.addEventListener('transitionend', () => {
                this.transitionendCb();
            });
            alertDialog.addEventListener('WebkitTransitionend', () => {
                 this.transitionendCb();
            });
        },
        transitionendCb () {
           this.alertShow ? this.rootShow : this.rootShow = false;
        },
        hide () {
            this.alertShow = false;
        }
    },
    watch: {
        show (n, o) {
            setTimeout(() => {
                this.alertShow = true;
            }, 10)
            this.rootShow = true;
        },
        buttons (n, o) {
            this.alertButtons = n;
        }
    },
    props: ['title', 'text', 'buttons', 'show']
}
</script>
<style>
    #alert-component {
        top: 0;
        left: 0;
        position: fixed;
        z-index: 1000;
        width: 100%;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7); 
        text-align: center;
    }
    .alert-dialog {
        background-color: #fff;
        display: inline-block;
        padding: 10px;
        min-width: 300px;
        transition: transform .2s ease-in-out;
        transform: translate3d(0, -100%, 0);
    }
    .alert-dialog.active {
         transform: translate3d(0, 20px, 0);
    }
    .alert-head {
        border-bottom: 2px solid #ddd;
        margin-bottom: 10px;
    }
    .alert-title {
        margin: 0;
        font-size: 18px;
    }
    .alert-body {
        margin-bottom: 10px;
    }
    .alert-foot {
        font-size: 0; 
    }
    .alert-foot .btn {
        font-size: 14px;
        height: 28px;
        width: 70px;
        margin: 10px;
        margin-bottom: 0;
    }
</style>