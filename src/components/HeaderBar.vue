<template>
    <div id="header-bar">
       <div class="header-operation-wrap">
            <div class="header-operation">
                <div class="btn-group-wrap">
                    <button class="btn btn-oval btn-default" 
                        :disabled="!currentDisabled" 
                        @click="toggleOnline"
                        :class="{
                            'btn-on-line': currentDisabled
                        }"
                        >签到</button>
                    <button class="btn btn-oval btn-default" 
                        :disabled="currentDisabled" 
                        @click="toggleOnline"
                        :class="{
                            'btn-off-line': !currentDisabled
                        }"
                        >下线</button>
                </div>
                <div class="member-info-wrap">
                    <a class="header-avatar" href="">
                        <img class="header-avatar-img" src="../../static/imgs/avatar.jpg" alt="">
                    </a>
                    <span class="header-username">{{member.name || '无名氏'}}</span>
                    <a class="header-operation-target" @click="logout">退出</a>
                </div>
            </div>
       </div>
       <h1 class="header-heading">
            国萃物流信息系统
       </h1>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex';
export default {
    name: 'headerBar',
    created () {
        
    },
    mounted () {

    },
    data () {
        return {

        }
    },
    computed: {
        ...mapGetters(['member']),
         currentDisabled () {
            if(this.member.isOnline === 'YES'){
                return false;
            }
            return true
        }
    },
    methods: {
        logout () {
            this.$store.dispatch('userlogout');
        },
        toggleOnline () {
            
            let isOnline = this.member.isOnline;

            this.member.isOnline = (isOnline === 'NO') ? 'YES' : 'NO';
            
            this.$store.dispatch('changeOnlineState');
        }
    }
}
</script>
<style scoped>
    #header-bar {
        height: 152px;
        overflow: hidden;
        border-bottom: 2px solid #ddd;
        background-color: #fff;
    }
    .header-heading {
        font-size: 32px;
        overflow: hidden;
        line-height: 152px;
        margin: 0;
        padding-left: 70px;
    }
    .header-operation-wrap {
        float: right;
        font-size: 0;
        width: 450px;
        padding-right: 50px;
    }
    .header-operation-wrap:before {
        content: '&nbsp;';
        display: inline-block;
        line-height: 152px;
    }
    .header-operation {
        display: inline-block;
        vertical-align: middle;
    }
    .btn-group-wrap {
        display: inline-block;
        font-size: 0;
    }
    .btn-group-wrap .btn {
        margin-right: 20px;
    }
    .btn.btn-on-line {
        background-color: #f51c3b;
    }
    .btn.btn-off-line {
        background-color: #379bf8;
    }
    .member-info-wrap {
        width: 190px;
        display: inline-block;
        padding-left: 18px;
    }
    .header-avatar {
        font-size: 0;
    }
    .header-avatar-img {
        margin-top: -16px;
        overflow: hidden;
         border-radius: 50%;
        height: 44px;
        width: 44px;
        vertical-align: middle;
    }
    .header-username {
        font-size: 18px;
    }
    .header-operation-target {
        font-size: 18px;
        color: #379bf8;
        border-left: 1px solid #379bf8;
        padding-left: 10px;
        margin-left: 10px;
    }
</style>