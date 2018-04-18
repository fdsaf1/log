<template>
    <div id="add-router-page">
        <div class="section-form">
            <form @submit.prevent="routerSubmit">
                <div class="form-controller">
                    <label for="" class="label-controller">物流公司ID</label>
                    <select class="select-controller" 
                        name="logisticsCompany"
                        :disabled="isEdit"
                        v-model="logisticsCompany">
                        <option :value="{}">请选择物流公司</option>
                        <option 
                            :value="company" 
                            v-for="company in logisticsCompanys">
                        {{company.companyName + '-' + company.id}}
                        </option>
                    </select>
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">物流公司名</label>
                    <input 
                        type="text" 
                        class="input-controller"  
                        name="logisticsCompanyName" 
                        readonly
                        v-model="logisticsCompany.companyName">
                    <!-- <input type="hidden" name="logisticsCompanyId" v-model="router.logisticsCompany.logisticsCompanyId">-->
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">始发地</label>
                    <input type="text" 
                        class="input-controller"
                        name="originName"
                        readonly
                         @click="showDrapDown('origin')"
                        v-model="router.originName"
                        >
                    <input type="hidden" name="originId" v-model="router.originId">
                   <areas :open="isDrapOrigin" @selectDone="originDone"></areas>
                </div>
                 <div class="form-controller">
                    <label for="" class="label-controller">目的地</label>
                    <input type="text" 
                           class="input-controller"
                           name="destinationName"
                           readonly
                           @click="showDrapDown('destination')"
                           v-model="router.destinationName"
                    >
                    <input type="hidden" name="destinationId" v-model="router.destinationId">
                    <areas :open="isDrapDestination" @selectDone="destinationDone"></areas>
                </div>
                <div class="form-controller">
                    <label class="label-controller">是否启动</label>
                    <span>  
                        <label class="radio-controller-wrap">
                           
                            <span class="radio-controller" :class="{activated: router.enable == 'yes'}">
                                <input type="radio" name="useable" value="yes" v-model="router.enable">
                            </span>
                            <em class="radio-text">启用</em>
                        </label>
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: router.enable == 'no'}">
                                <input type="radio" name="useable" value="no" v-model="router.enable">
                            </span>
                            <em class="radio-text">禁止</em>
                        </label>
                    </span>
                </div>
                <div style="text-align: center; margin-top: 60px;">
                    <button type="submit" class="btn btn-oval btn-light" 
                        :disabled="this.$v.router.$invalid"
                        >
                       {{isEdit?'保存':'新增'}} 
                    </button>
                </div>
            </form>
        </div>
        <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Areas from '../../components/Area';
import Alert from '../../components/Alert';
import { required, minLength, between } from 'vuelidate/lib/validators';
import { mapGetters } from 'Vuex';

class Router {
    logisticsCompanyId = '';
    logisticsCompanyName = '';
    originId = '';
    originName = '';
    destinationId = '';
    destinationName = '';
    enable = 'yes';
};

export default {
    data() {
        return {
            logisticsCompany: {},
            alertShow: false,
            isDrapOrigin: false,
            isDrapDestination: false,
            isEdit: false,
            alertText: '',
            router: new Router()
        }
    },
    created () {
       this.$store.dispatch('getLogisticsCompanysInfo')
       
       let id = this.$route.query.id;

       if(id){
            this.$store.dispatch('setRouterId', id);
       }
    },
    mounted () {
       
    },
    components: {
        HeaderBar,
        Areas,
        Alert
    },
    computed: {
        ...mapGetters(['logisticsCompanys', 'addRouterState', 'areas', 'cecheRouter'])
    },
    validations: {
        logisticsCompany: {
            required
        },
        router: {
            originName: {
                required
            },
            destinationName: {
                required
            }
        }
    },
    watch: {
        areas (n, o) {
            
        },
        cecheRouter: {
            handler (n, o) {
                let {
                    destinationId,
                    destinationName,
                    enable,
                    logisticsCompanyId,
                    logisticsCompanyName,
                    originId,
                    originName
                } = n,
                route = Object.assign({}, this.router, {
                    destinationId,
                    destinationName,
                    enable,
                    logisticsCompanyId,
                    logisticsCompanyName,
                    originId,
                    originName
                });
                this.$set(this.logisticsCompany, 'companyName', logisticsCompanyName);
                this.$set(this.logisticsCompany, 'id', logisticsCompanyId);

                this.router = route;
                
                if(n){
                    this.isEdit = true;
                }
            },
            deep: true
        }
    },
    methods: {
        routerSubmit () {
        //    let logisticsCompanyFullNames = this.router.logisticsCompanyFullName.split('$$');
          this.router.logisticsCompanyId = this.logisticsCompany.id;
          this.router.logisticsCompanyName = this.logisticsCompany.companyName;

          this.isEdit ? this.editRouter() : this.addRouter();
        },
        addRouter() {
           this.$store.dispatch('pushRouer', this.router).then(() => {
               this.clearRouter();
               this.alert('添加成功');
           }).catch(() => {
                this.alert('添加失败');
           });
        },
        editRouter () {
            this.$store.dispatch('editRouter', this.router).then(() => {
               this.alert('保存成功');
           }).catch(() => {
                this.alert('保存失败');
           });
        },
        clearRouter () {
            this.router = new Router();
            this.logisticsCompany = {};
        },
        currentClass (validate) {
            return {
                'error': validate
            }
        },
        showDrapDown (key) {
           if(key === 'origin'){
                this.isDrapOrigin = !this.isDrapOrigin;
           }else {
               this.isDrapDestination = !this.isDrapDestination;
           }
        },
        originDone (data) {
           this.handleData('origin',  data);
        },
        destinationDone (data) {
            this.handleData('destination',  data);
        },
        handleData(key, data) {
            if(!data || !data.length) return;
            let router = Object.assign({}, this.router);
            router[key + 'Name']  = '';
            data.forEach(item => {
                  router[key + 'Name'] += item.name;
            });
            router[key + 'Id']= data[data.length - 1].id;
            this.router = router;
        },
        alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        }
    }
}
</script>
<style scoped>
    #add-router-page {
        min-height: 923px;
        background-color: #f2f2f2;
    }
    .section-form {
        padding: 40px 0 0 50px;
    }
    .form-controller {
        display: block;
        margin-bottom: 20px;
    }
    .label-controller {
        color: #666;
    }
    .input-controller[type="text"],
    .input-controller[type="password"] {
        width: 466px;
    }
    .select-controller {
        width: 486px;
    }
    .radio-controller-wrap  {
        vertical-align: middle;
        margin-right: 20px;
    }
</style>