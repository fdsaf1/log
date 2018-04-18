<template>
    <div id="add-logistics-page">
        <div class="section-form">
            <form @submit.prevent="cartDataSubmit" novalidate>
                <div class="form-controller">
                    <label for="" class="label-controller">车辆ID</label>
                    <input type="text" readonly class="input-controller" 
                        name="cartId" 
                        v-model="cart.id"
                        placeholder="系统自动获取"
                        >
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">车型</label>
                    <input 
                        type="text" 
                        class="input-controller"
                        name="carmodelsName"
                        v-model="cart.carmodelsName"
                        @input="$v.cart.carmodelsName.$touch()"
                        :class="{
                            'error': !$v.cart.carmodelsName.required && $v.cart.carmodelsName.$dirty
                        }"
                        >
                </div>
                <div class="form-controller">
                    <label for="" class="label-controller">高度</label>
                    <input 
                        type="text" 
                        class="input-controller"
                        name="carmodelsName"
                        v-model="cart.height"
                        @input="$v.cart.height.$touch()"
                        :class="{
                            'error': !$v.cart.height.required && $v.cart.height.$dirty
                        }"
                        >
                </div>
                 <div class="form-controller">
                    <label for="" class="label-controller">数量</label>
                    <input 
                        type="text" 
                        class="input-controller"
                        name="carmodelsName"
                        v-model="cart.num"
                        @input="$v.cart.num.$touch()"
                        :class="{
                            'error': !$v.cart.num.required && $v.cart.num.$dirty
                        }"
                        >
                </div>
               <!-- <div class="form-controller">
                    <label class="label-controller">是否启动</label>
                    <span>  
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: cart.enable == 'yes'}">
                                <input type="radio" name="useable" value="yes" v-model="cart.enable">
                            </span>
                            <em class="radio-text">启用</em>
                        </label>
                        <label class="radio-controller-wrap">
                            <span class="radio-controller" :class="{activated: cart.enable == 'no'}">
                                <input type="radio" name="useable" value="no" v-model="cart.enable">
                            </span>
                            <em class="radio-text">禁止</em>
                        </label>
                    </span>
                </div> -->
                <div style="text-align: center; margin-top: 60px;">
                    <button  :disabled="$v.cart.$invalid" type="submit" class="btn btn-oval btn-light">
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
    id = '';
    carmodelsName = '';
    height = '';
    num = '';
}

export default {
    data() {
        return {
            cartId: '',
            isEdit: false,
            alertShow: false,
            alertText: '',
            cart: new Cart()
        }
    },
    created () {
        let id = this.$route.query.id;
        if(id){
            this.cartId = id;
            this.isEdit = true;
            this.$store.dispatch('getCartDetail', id).then(data => {
                this.cart = Object.assign({}, this.cart, data);
            });
        }
    },
    methods: {
         alert(text) {
            this.alertText = text;
            this.alertShow = !this.alertShow;
        },
        cartDataSubmit () {
            let {
                carmodelsName,
                id
            } = this.cart;

            if(this.isEdit){
                this.updateCart({carmodelsName, id})
            }else {
                 this.addCart({
                     carmodelsName
                 })
            }
        },
        addCart (data) {
            this.$store.dispatch('addCart', data).then(res => {
                if(res.code == 2){
                    this.alert('添加失败,该车型已存在');
                }else {
                    this.alert('添加成功');
                    this.cart = new Cart();
                }
            }).catch(err => {
                this.alert('添加失败');
            });
        },
        updateCart(data){
            data.id = this.cartId;
            this.$store.dispatch('editCart', data).then(res => {
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
        cart: {
            carmodelsName: {
                required
            },
            height: {
                required
            },
            num: {
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