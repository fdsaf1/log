<template>
    <div id="add-logistics-page">
        <div class="section-form">
            <form @submit.prevent="companyDataSubmit" novalidate>
                <div class="form-controller">
                    <label for="" class="label-controller">物流公司ID</label>
                    <input type="text" readonly class="input-controller" 
                        name="companyId" 
                        v-model="company.id"
                        placeholder="系统自动获取"
                        >
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">公司代号</label>
                    <input 
                        type="text"
                        class="input-controller" 
                        name="companyCode" 
                        v-model="company.companyCode"
                        :readonly="isEdit"
                         @input="$v.company.companyCode.$touch()"
                        :class="{
                            'error': !$v.company.companyCode.required && $v.company.companyCode.$dirty
                        }"
                        >
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">物流公司名</label>
                    <input 
                        type="text" 
                        class="input-controller"
                        name="companyName"
                        v-model="company.companyName"
                        @input="$v.company.companyName.$touch()"
                        :class="{
                            'error': !$v.company.companyName.required && $v.company.companyName.$dirty
                        }"
                        >
                </div>
                <div class="form-controller">
                    <label class="label-controller">是否启动</label>
                    <span>  
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: company.enable == 'yes'}">
                                <input type="radio" name="useable" value="yes" v-model="company.enable">
                            </span>
                            <em class="radio-text">启用</em>
                        </label>
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: company.enable == 'no'}">
                                <input type="radio" name="useable" value="no" v-model="company.enable">
                            </span>
                            <em class="radio-text">禁止</em>
                        </label>
                    </span>
                </div>
                <div style="text-align: center; margin-top: 60px;">
                    <button  :disabled="$v.company.$invalid" type="submit" class="btn btn-oval btn-light">
                        {{isEdit? '保存':'新增'}}
                    </button>
                </div>
            </form>
        </div>
     <alert :show="alertShow" :text="alertText"></alert>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Alert from '../../components/Alert';
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators';

class Company {
    id = null;
    companyName = null;
    enable = 'yes';
    companyCode = null;
}

export default {
    data() {
        return {
            companyId: '',
            isEdit: false,
            alertShow: false,
            alertText: '',
            company: new Company()
        }
    },
    created () {
        let id = this.$route.query.id;
        if(id){
            this.companyId = id;
            this.isEdit = true;
            this.$store.dispatch('getCompanyDetail', id).then(data => {
                this.company = data;
            });
        }
    },
    methods: {
         alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        companyDataSubmit () {
            let {
                companyName,
                enable,
                companyCode
            } = this.company;

            if(this.isEdit){
                this.updateCompany({companyName, enable, companyCode})
            }else {
                 this.addCompany({companyName, enable, companyCode})
            }
        },
        addCompany (data) {
            this.$store.dispatch('addCompany', data).then(res => {
                if(res.code == 2){
                    this.alert('添加失败,该物流公司已存在');
                }else {
                    this.alert('添加成功');
                    this.company = new Company();
                }
            }).catch(err => {
                this.alert('添加失败');
            });
        },
        updateCompany(data){
            data.id = this.companyId;
            this.$store.dispatch('editCompany', data).then(res => {
                if(res.code == 2){
                    this.alert('保存失败,该物流公司已存在');
                }else {
                    this.alert('保存成功');
                }
            }).catch(err => {
                this.alert('保存失败');
            });
        },
    },
    validations: {
        company: {
            companyName: {
                required
            },
            companyCode: {
                required
            }
        }
    },
    components: {
        HeaderBar,
        Alert
    }
}
</script>
<style scoped>
    #add-logistics-page {
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
    .radio-controller-wrap  {
        vertical-align: middle;
        margin-right: 20px;
    }
</style>