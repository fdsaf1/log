<template>
    <div id="login-page" :style="currentStyle">
        <div class="login-content">
            <img class="login-logo" src="../../static/imgs/login-logo.png" alt="">
            <h1 class="login-title">物流信息系统</h1>
            <div class="login-form">
                <form @submit.prevent="subimt">
                    <div class="form-controller inset-form-controller">
                        <label class="label-controller">
                            <i class="icon icon-person"></i>
                        </label>
                        <input 
                            class="input-controller" 
                            placeholder="请输入你的用户名" 
                            type="text"
                            name="username"
                            v-model="member.username"
                            >
                    </div>
                     <div class="form-controller inset-form-controller">
                        <label class="label-controller">
                            <i class="icon icon-lock"></i>
                        </label>
                        <input class="input-controller" 
                        placeholder="请输入你的密码" 
                        name="password"
                        v-model="member.password"
                        type="text">
                    </div>
                    <div class="form-controller inset-form-controller input-validate">
                        <input class="input-controller" 
                            placeholder="请输入验证码" 
                            type="text"
                            v-model="member.jcaptchaCode"
                            name="jcaptchaCode"
                            >
                        <img class="validate-img" @click="replaceImg" :src="imgUrl" alt="验证码图片">
                    </div>
                    <div class="clearfix help-operate">
                       <label class="login-checkbox">
                            <input type="checkbox" value="true" name="rememberMe" v-model="member.rememberMe">
                            <em>记住密码</em>
                       </label>
                       <a href="" class="login-foreget-link fr">忘记密码</a>
                    </div>
                    <div class="login-subimt-wrap">
                        <button class="btn login-subimt-btn">
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { HOST } from '../config/index';

export default {
    created () {
        this.$store.dispatch('navBarHide');
    },
    mounted () {
        this.setStyle();
        this.winResize();
        console.log(HOST);
        // console.log(document.cookie);
    },
    destroyed () {
        this.$store.dispatch('navBarShow');
    },
    data() {
        return {
            currentStyle: {
                'height': '',
                'line-height': '' 
            },
            member: {},
            imgUrl: HOST.login + '/image/jcaptcha.jpg'
        }
    },
    methods: {
        winResize(){
            window.addEventListener('resize', () => {
                this.setStyle();
            }, false);
        },
        setStyle () {
            let w = window.innerHeight;
            if(w < 720){
                w = 720;
            }
            this.currentStyle.height = w + 'px';
            this.currentStyle['line-height'] = w + 'px';
        },
        login () {
            this.$store.dispatch('userLogin', {})
        },
        replaceImg () {
            this.imgUrl = this.imgUrl+'?fumao_'+ Date.now();
        },
        subimt () {
            var formData = new FormData();
            var member = this.member;

            for(var attr in member){
                var value = member[attr];
                if(value){
                    formData.append(attr, value);
                }
            };

            this.$store.dispatch('userlogin', formData);
        }
    },
    components: {
        
    }
}
</script>
<style scoped>
    #login-page {
        margin-left: -386px;
        text-align: center;
        font-size: 0;
        background-image: -webkit-radial-gradient(circle at center, #00aad5, #00539d, #0c3259); 
        background-image: radial-gradient(circle at center, #00aad5, #00539d, #0c3259);
    }
    #login-page:after {
        display: inline-block;
        content: '&nbsp;';
    }
    .login-content {
        line-height: 1.5;
        width: 383px;
        display: inline-block;
        text-align: left;
        color: #fff;
        font-size: 18px;
        vertical-align: middle;
    }
    .login-logo {
        width: 152px;
        height: 174px;
        display: block;
        margin: 0 auto;
        margin-bottom: 40px;
    }
    .login-title {
        text-align: center;
        color: #fff;
        font-size: 36px;
        margin-bottom: 70px;
    }
    .login-form {
        font-size: 0;
    }
    .inset-form-controller {
        background-color: #fff;
        border-radius: 3px;
        overflow: hidden;
        width: 383px;
        margin-bottom: 30px;
    }
    .inset-form-controller .label-controller {
        width: 24px;
        height: 24px;
        padding: 14px 10px 14px 24px;
        line-height: 0;
        vertical-align: top;
    }
    .inset-form-controller .input-controller[type="text"],
    .inset-form-controller .input-controller[type="password"] {
        border: none 0;
        height: 52px;
        width: 305px;
    }
    .inset-form-controller .input-controller[type="text"]:focus,
    .inset-form-controller .input-controller[type="password"]:focus {
        outline: none;
    }
    .icon {
        width: 24px;
        height: 24px;
        display: inline-block;
    }
    .icon-person {
        background: url('../../static/imgs/person.png') no-repeat;
    }
    .icon-lock {
        background: url('../../static/imgs/lock.png') no-repeat;
    }
    .help-operate {
        color: #fff;
    }
    .login-checkbox {
        
    }
    .login-checkbox input {
        margin: 0;
        line-height: 24px;
        vertical-align: middle;
    }
    .login-checkbox em {
        color: #fff;
        font-size: 16px; 
       vertical-align: middle;
        user-select: none;
    }
    .login-foreget-link {
         color: #fff;
         text-decoration: underline;
        font-size: 16px; 
        vertical-align: top;
    }
    .login-subimt-wrap {
        height: 0;
        margin-left: 100%;
        margin-top: -252px;
    }
    .btn {
        width: 190px;
        height: 190px; 
        border-radius: 5px;
    }
    .login-subimt-btn {
        margin-left: 30px;
        font-size: 30px;
        border: none 0;
        color: #fff;
        background-image: -webkit-linear-gradient(45deg, #00346d, #0061b1);
        background-image: linear-gradient(45deg, #00346d, #0061b1);
        box-shadow: 0 0 5px #000;
    }
    .input-validate {
        
    }
    .input-validate .input-controller[type="text"],
    .input-validate .input-controller[type="password"]{
        width: 163px;
    }
    .validate-img {
        width: 200px;
        height: 52px;
        border: none 0;
        vertical-align: top;
        outline: none;
    }
</style>