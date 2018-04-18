<template>
    <div id="side-bar">
        <div class="side-bar-head">
            <img src="../../static/imgs/logo.png" alt="">
        </div>
        <div class="side-bar-body">
            <div class="side-bar-nav">
                <ul>
                    <li v-for="item in currentNavList" :class="{
                        activated: item.checked
                    }"
                    v-if="item.showed"
                    >
                        <a @click="selectItem(item)">
                           <span>
                                <i class="icon" :class="currentClass(item.icon)"></i>
                                <p class="text">{{item.title}}</p>
                           </span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="side-bar-subnav">
                <ul>
                    <router-link 
                        v-for="item in selectList" 
                        tag="li" :to="item.url">
                           <a> {{item.title}}</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sideBar',
    created () {
        
    },
    mounted () {
       
    },
    data () {
        return {
            selectNavList: []
        };
    },
    methods: {
        currentClass(name) {
          let classes = {};
          classes[name] = true;
          return classes;
        },
        selectItem (item) {
            this.$store.dispatch('selectNavBar', item);
        }   
    },
    computed: {
        selectList () {
            let list = this.navList;
            for(let i = 0; i < list.length; i++){
                if(list[i].checked){
                    return list[i].children;
                }
            }
        },
        currentNavList () {
            let authorize = this.authorize, navList = this.navList,
                value, name, key;
            if(authorize){
                navList.map(item => {
                    item.showed = false;
                     for(name in authorize){
                        value = authorize[name];
                        key = name.split('_')[0];
                        if(item.name === key){
                            item.showed = value;
                        }
                    }
                    return item;
                });
            }
            return navList;
        }
    },
    props: {
        navList: Array,
        authorize: Object
    }
}
</script>
<style scoped>
    #side-bar {
        background-color: #014f99;
        width: 386px;
        height: 100%;
    }
    .side-bar-head {
        padding-top: 40px;
        text-align: center;
    }
    .side-bar-body {
        padding-top: 32px;
        height: 100%;
        overflow: hidden;
    }
    .side-bar-nav,
    .side-bar-subnav {
        float: left;
        height: 100%;
    }
    .side-bar-nav {
        width: 150px;
    }
    .side-bar-nav span {
        display: inline-block;
        vertical-align: middle;
    }
    .side-bar-nav a {
        font-size: 0;
        display: block;
        text-align: center;
        height: 146px;
        line-height: 146px;
    }
    .side-bar-nav a:before {
        display: inline-block;
        content: '&nbsp;';
    }
    .side-bar-nav p {
        text-align: center;
        color: #379bf8;
        font-size: 18px;
    }
    .side-bar-subnav {
        overflow: hidden;
        width: 233px;
        margin-left: 2px;
        background-color: #195b99;
    }
    .icon {
        display: inline-block;
        background: url('../../static/imgs/icon.png') no-repeat;
    }
    .icon-enquire {
        background-position: 0 0;
        height: 53px;
        width: 53px;
    }
    .icon-activated-enquire {
        background-position: -58px 0;
    }
    .icon-query {
        background-position: 0 -55px;
        height: 53px;
        width: 53px;
    }
    .icon-activated-query {
        background-position: -58px -55px;
    }
    .icon-manage {
        background-position: 0 -113px;
        height: 53px;
        width: 53px;
    }
    .icon-activated-manage {
       background-position: -58px -113px;
    }
    .side-bar-nav .activated a {
       background-color: #195b99;
    }
    .side-bar-nav .activated p {
        color: #fff;
    }  
    .side-bar-nav .activated .icon-enquire {
         background-position: -58px 0;
    }
    .side-bar-nav .activated .icon-query {
         background-position: -58px -55px;
    }
    .side-bar-nav .activated .icon-manage {
        background-position: -58px -113px;
    }

    .side-bar-subnav li {
        text-align: center;
        line-height: 146px;
    }
    .side-bar-subnav a {
        display: block;
        font-size: 18px;
        color: #379bf8;
        transition: transform .2s;
        transform: translate3d(0, 0, 0);
    }
    .side-bar-subnav .activated {
        background-color: #fff;
    }
    .side-bar-subnav .activated a {
        color: #fff;
        background-color: #29649b;
        transform: translate3d(-10px, 0, 0);
    }
</style>