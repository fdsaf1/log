<template>
     <div id="table-ui">
        <table>
            <thead>
                <tr>
                    <th class="th-checkbox">
                        <label class="checkbox-controller" :class="{activated: allChecked}">
                            <input type="checkbox" name="allChecked" v-model="allChecked">
                        </label>
                    </th>
                    <th v-for="(item, index) in theads" class="">{{item.key}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in currentList" :data-order-id="item.id">
                    <td  data-target="checkbox">
                        <label class="checkbox-controller" :class="{activated: item.checked}">
                            <input type="checkbox" name="checkItem" v-model="item.checked">
                        </label>
                    </td>
                    <router-link :to="currentUrl(item)" tag="td"  v-for="thead in theads">
                        <p class="">{{item[thead.value]}}</p>
                        <i>&nbsp;</i>
                    </router-link>
                </tr>
            </tbody>
        </table>
        <div class="empty-table" v-if="isEmpty">
            <h2>{{loading ? '暂无数据' : '加载数据中'}}
                 <svg v-if="!loading" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="circle" class="g-circles g-circles--v1">
                        <circle id="12" transform="translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) " cx="35" cy="16.6987298" r="10"></circle>
                        <circle id="11" transform="translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) " cx="16.6987298" cy="35" r="10"></circle>
                        <circle id="10" transform="translate(10, 60) rotate(-90) translate(-10, -60) " cx="10" cy="60" r="10"></circle>
                        <circle id="9" transform="translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) " cx="16.6987298" cy="85" r="10"></circle>
                        <circle id="8" transform="translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) " cx="35" cy="103.30127" r="10"></circle>
                        <circle id="7" cx="60" cy="110" r="10"></circle>
                        <circle id="6" transform="translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) " cx="85" cy="103.30127" r="10"></circle>
                        <circle id="5" transform="translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) " cx="103.30127" cy="85" r="10"></circle>
                        <circle id="4" transform="translate(110, 60) rotate(-90) translate(-110, -60) " cx="110" cy="60" r="10"></circle>
                        <circle id="3" transform="translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) " cx="103.30127" cy="35" r="10"></circle>
                        <circle id="2" transform="translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) " cx="85" cy="16.6987298" r="10"></circle>
                        <circle id="1" cx="60" cy="10" r="10"></circle>
                    </g>
                    <use xlink:href="#circle" class="use"/>
                </svg>
            </h2>
        </div>
    </div>
</template>
<script>
export default {
    name: 'table-ui',
    created () {

    },
    mounted () {

       let timer, nullTimer;

        timer = setTimeout(() => {
            this.isEmpty = true;
        }, 200);

       this.tbodysUnwatch = this.$watch('tbodys', (n, o) => {
           if(n.length){
              clearTimeout(timer);
              clearTimeout(nullTimer);
              this.isEmpty = false;
              this.loading = false;
              this.allChecked = n.every(item => item.checked);
           } else {
              clearTimeout(nullTimer);
              nullTimer = setTimeout(() => {
                    this.loading = true;
              }, 2000);
           }
       },{deep: true});
    },
    destroyed () {
        this.tbodysUnwatch();
    },
    data () {
        return {
             isEmpty: false,
             loading: false,
             allChecked: false,
             tbodysUnwatch: null
        };
    },
    methods: {
        selectedCheckbox (ev) {
            let checkbox = ev.target.dataset.target;
            if(checkbox !== 'checkbox') return;
            ev.preventDefault();
        },
        currentUrl (item) {

            let value = item[this.paramskey];

            let obj = {
                query: {},
                params: {}
            }
            if(this.isParams){
                this.$set(obj.params, this.paramskey, value);
                this.$set(obj, 'name', this.url);
            }else {
                this.$set(obj.query, this.paramskey, value);
                this.$set(obj, 'path', this.url);
            }

            return obj;
        }
    },
    watch:  {
        allChecked (n, o) {
            this.tbodys.map(item => {
                this.$set(item, 'checked', n);
                return item;
            });
        }
    },
    computed: {
        currentList () {
            let tbodys = [].concat(this.tbodys);

            tbodys.map(item => {
                this.$set(item, 'checked', false);
                return item;
            });
            
            return tbodys;
        }
    },
    props: ['theads', 'tbodys', 'url', 'paramskey', 'isParams']
}
</script>
<style>
    #table-ui {
        
    }
    table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
    }
    thead {
        background-color: #e9e9e9;
    }
    .th-checkbox {
        width: 50px;
    }
    th {
        width: 134px;
        font-size: 14px;
    }
    th, 
    tr {
        font-weight: normal;
        line-height: 60px;
        
    }
    th + th {
        border-left: 1px solid #cdcbcb;
    }
    tr {
        border-bottom: 1px solid #ddd;
        cursor: pointer;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    td + td {
        border-left: 1px solid #cdcbcb;
    }
    td {
        font-size: 0;
    }
    td p {
        line-height: 1.5;
        word-break: break-all;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
    }
    td i {
        display: inline-block;
        font-size: 0;
        line-height: inherit;
    }
    .empty-table {
        text-align: center;
        margin: 50px 0;
    }
    .empty-table h2 {
        margin: 0px;
        line-height: 1;
        font-size: 36px;
    }
    .l-wrapper {
        position: absolute;
        width: 480px;
        height: 300px;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        text-align: center;
    }
    svg {
        margin-left: .1rem;
        height: 36px;
        width: 36px;
        line-height: 36px;
        vertical-align: top;
        overflow: visible;
        /*   border: 1px solid red; */
    }
    .g-circles {
        -webkit-transform: scale(0.9) translate(7px, 7px);
        -ms-transform: scale(0.9) translate(7px, 7px);
        transform: scale(0.9) translate(7px, 7px);
    }
    circle {
        fill: dodgerblue;
        fill-opacity: 0;
        -webkit-animation: opacity 1.2s linear infinite;
        animation: opacity 1.2s linear infinite;
    }
    circle:nth-child(12n + 1) {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }
    circle:nth-child(12n + 2) {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }
    circle:nth-child(12n + 3) {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }
    circle:nth-child(12n + 4) {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }
    circle:nth-child(12n + 5) {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
    }
    circle:nth-child(12n + 6) {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }
    circle:nth-child(12n + 7) {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }
    circle:nth-child(12n + 8) {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    circle:nth-child(12n + 9) {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    circle:nth-child(12n + 10) {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }
    circle:nth-child(12n + 11) {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    circle:nth-child(12n + 12) {
        -webkit-animation-delay: -1.2s;
        animation-delay: -1.2s;
    }
    @-webkit-keyframes opacity {
        3% {
            fill-opacity: 1;
        }

        75% {
            fill-opacity: 0;
        }
    }
    @keyframes opacity {
        3% {
            fill-opacity: 1;
        }

        75% {
            fill-opacity: 0;
        }
    }
</style>