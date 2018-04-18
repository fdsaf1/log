<template>
    <div id="add-logistics-page">
        <div class="section-form">
            <form @submit.prevent="addressDataSubmit" novalidate>
                <div class="form-controller">
                    <label for="" class="label-controller">车辆ID</label>
                    <input type="text" readonly class="input-controller" 
                        name="addressId" 
                        v-model="address.id"
                        placeholder="系统自动获取"
                        >
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">车型</label>
                    <input 
                        type="text" 
                        class="input-controller"
                        name="carmodelsName"
                        v-model="address.carmodelsName"
                        @input="$v.address.carmodelsName.$touch()"
                        :class="{
                            'error': !$v.address.carmodelsName.required && $v.address.carmodelsName.$dirty
                        }"
                        >
                </div>
               <!-- <div class="form-controller">
                    <label class="label-controller">是否启动</label>
                    <span>  
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: address.enable == 'yes'}">
                                <input type="radio" name="useable" value="yes" v-model="address.enable">
                            </span>
                            <em class="radio-text">启用</em>
                        </label>
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: address.enable == 'no'}">
                                <input type="radio" name="useable" value="no" v-model="address.enable">
                            </span>
                            <em class="radio-text">禁止</em>
                        </label>
                    </span>
                </div> -->
                <div style="text-align: center; margin-top: 60px;">
                    <button  :disabled="$v.address.$invalid" type="submit" class="btn btn-oval btn-light">
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

class Cart {
    id = null;
    carmodelsName = null;
}

export default {
    data() {
        return {
            addressId: '',
            isEdit: false,
            alertShow: false,
            alertText: '',
            address: new Cart()
        }
    },
    created () {
        let id = this.$route.query.id;
        if(id){
            this.addressId = id;
            this.isEdit = true;
            this.$store.dispatch('getAddressDetail', id).then(data => {
                this.address = data;
            });
        }
    },
    methods: {
         alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        addressDataSubmit () {
            let {
                carmodelsName,
                id
            } = this.address;

            if(this.isEdit){
                this.updateCart({carmodelsName, id})
            }else {
                 this.addCart({
                     carmodelsName
                 })
            }
        },
        addCart (data) {
            this.$store.dispatch('addAddress', data).then(res => {
                if(res.code == 2){
                    this.alert('添加失败,该车型已存在');
                }else {
                    this.alert('添加成功');
                    this.address = new Cart();
                }
            }).catch(err => {
                this.alert('添加失败');
            });
        },
        updateCart(data){
            data.id = this.addressId;
            this.$store.dispatch('editAddress', data).then(res => {
                if(res.code == 2){
                    this.alert('保存失败,该车型已存在');
                }else {
                    this.alert('保存成功');
                }
            }).catch(err => {
                this.alert('保存失败');
            });
        },
    },
    validations: {
        address: {
            carmodelsName: {
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