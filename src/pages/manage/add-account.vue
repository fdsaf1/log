<template>
    <div id="add-account-page">
        <div class="operation-nav" v-show="isEdit && !isChangePassword">
            <button class="btn btn-oval btn-light" @click="toChangePassword">更改密码</button>
        </div>
        <div class="section-form">
            <template  v-if="isChangePassword">
                <form @submit.prevent="accountSubmit" novalidate>
                    <div class="form-controller">
                            <label for="" class="label-controller">旧密码</label>
                            <input 
                                type="password" 
                                class="input-controller"
                                name="oldPassword"
                                minlength="6"
                                maxlength="20"
                                placeholder="该项必填"
                                @input="$v.account.oldPassword.$touch()"
                                :class="{
                                    'error': (!$v.account.oldPassword.minLength || !$v.account.oldPassword.maxLength || !$v.account.oldPassword.required) && $v.account.oldPassword.$dirty
                                }"
                                v-model="account.oldPassword"
                                >
                        </div>
                        <div class="form-controller">
                            <label for="" class="label-controller">新密码</label>
                            <input 
                                type="password" 
                                class="input-controller"
                                name="newPassword"
                                minlength="6"
                                maxlength="20"
                                placeholder="该项必填"
                                @input="$v.account.newPassword.$touch()"
                                :class="{
                                    'error': (!$v.account.newPassword.minLength || !$v.account.newPassword.maxLength || !$v.account.newPassword.required) && $v.account.newPassword.$dirty
                                }"
                                v-model="account.newPassword"
                                >
                        </div>
                        <div class="form-controller">
                            <label for="" class="label-controller">确认新密码</label>
                            <input 
                                type="password" 
                                class="input-controller"
                                name="resureNewPassword"
                                minlength="6"
                                maxlength="20"
                                placeholder="该项必填"
                                @input="$v.account.resureNewPassword.$touch()"
                                :class="{
                                    'error': (!$v.account.resureNewPassword.required || !$v.account.resureNewPassword.sameAsPassword) && $v.account.resureNewPassword.$dirty
                                }"
                                v-model="account.resureNewPassword"
                                >
                        </div>
                        <div style="text-align: center; margin-top: 60px;">
                            <button 
                                type="submit"
                                class="btn btn-oval btn-light" 
                                :disabled="$v.account.$invalid">
                                确认
                            </button>
                        </div>
                </form>
            </template>
            <tempalte v-else>
                <form @submit.prevent="accountSubmit" novalidate>
                    <div class="form-controller">
                        <label class="label-controller">用户编码</label>
                        <input
                            type="text" 
                            class="input-controller"
                            name="userCode"
                            v-model="user.userCode"
                            readonly
                            placeholder="系统自动生成"
                            >
                    </div>
                    <div class="form-controller">
                        <label for="" class="label-controller">用户名</label>
                        <input 
                            type="text" 
                            class="input-controller"
                            name="account"
                            placeholder="该项必填"
                            @input="$v.user.account.$touch()"
                            :class="{
                                'error': !$v.user.account.required && $v.user.account.$dirty
                            }"
                            v-model="user.account"
                            >
                    </div>
                    <template v-if="!isEdit">
                        <div class="form-controller">
                            <label for="" class="label-controller">密码</label>
                            <input 
                                type="password" 
                                class="input-controller"
                                name="password"
                                minlength="6"
                                maxlength="20"
                                placeholder="该项必填"
                                @input="$v.user.password.$touch()"
                                :class="{
                                    'error': (!$v.user.password.minLength || !$v.user.password.maxLength || !$v.user.password.required) && $v.user.password.$dirty
                                }"
                                v-model="user.password"
                                >
                        </div>
                        <div class="form-controller">
                            <label for="" class="label-controller">确认密码</label>
                            <input 
                                type="password" 
                                class="input-controller"
                                name="resuredPassword"
                                minlength="6"
                                maxlength="20"
                                placeholder="该项必填"
                                @input="$v.user.resuredPassword.$touch()"
                                :class="{
                                    'error': (!$v.user.resuredPassword.required || !$v.user.resuredPassword.sameAsPassword) && $v.user.resuredPassword.$dirty
                                }"
                                v-model="user.resuredPassword"
                                >
                        </div>
                    </template>
                    <div class="form-controller">
                        <label for="" class="label-controller">电话号码</label>
                        <input 
                            type="text" 
                            class="input-controller"
                            name="phone"
                            maxlength="11"
                            minlength="11"
                            @input="$v.user.phone.$touch()"
                            :class="{
                                'error': !$v.user.phone.phoneChecked && $v.user.phone.$dirty
                            }"
                            v-model="user.phone"
                            >
                    </div>
                    <div class="form-controller">
                        <label for="" class="label-controller">选择角色</label>
                        <select 
                            type="text" 
                            class="select-controller"
                            name="phone"
                            @input="$v.user.roleId.$touch()"
                            :class="{
                                'error': !$v.user.roleId.required && $v.user.roleId.$dirty
                            }"
                            v-model="user.roleId"
                            >
                                <option value="">请选择该用户角色</option>
                                <option :value="role.id" v-for="role in roles">
                                    {{ role.name }}
                                </option>
                        </select>
                    </div>
                    <div class="form-controller">
                        <label class="label-controller">是否启动</label>
                        <span>  
                            <label class="radio-controller-wrap">
                                <span class="radio-controller" :class="{activated: user.disabled == false}">
                                    <input type="radio" name="disabled" :value="false" v-model="user.disabled">
                                </span>
                                <em class="radio-text">启用</em>
                            </label>
                            <label class="radio-controller-wrap">
                                <span class="radio-controller" :class="{activated: user.disabled == true}">
                                    <input type="radio" name="disabled" :value="true" v-model="user.disabled">
                                </span>
                                <em class="radio-text">禁止</em>
                            </label>
                        </span>
                    </div>
                    <div style="text-align: center; margin-top: 60px;">
                    <template v-if="isEdit">
                        <button 
                            class="btn btn-oval btn-light" 
                            :disabled="$v.editValids.$invalid">
                            保存
                        </button>
                    </template>
                    <tempplate v-else>
                        <button 
                            class="btn btn-oval btn-light" 
                            :disabled="$v.user.$invalid">
                        新增
                        </button>
                    </tempplate>
                    </div>
                </form>
            </tempalte>
        </div>
        <alert :show="alertShow" :text="alertText" :buttons="buttons"></alert>
    </div>
</template>
<script>
import HeaderBar from '../../components/HeaderBar';
import Alert from '../../components/Alert';
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators';

class User {
    userCode = null;
    account = null;
    password = null;
    resuredPassword = null;
    phone = null;
    disabled = false;
    roleId = '';
};
class Account {
    oldPassword = null;
    newPassword = null;
    resureNewPassword = null;
};   
export default {
    data() {
        return {
            isChangePassword: false,
            alertShow: false,
            alertText: '',
            isEdit: false,
            account: new Account(),
            user: new User(),
            userId: null,
            roles: [],
            buttons: [
                 {
                    title: '确定',
                    class: ['btn-oval','btn-light'],
                    eventCb  (ev) {
                        ev.hide();
                        console.log('确认');
                    }
                }
            ]
        }
    },
    created () {
        
        let id = this.$route.query.id;
        if(id){
            this.userId = id;
            this.isEdit = true;
            this.$store.dispatch('getUserDetail', id).then(data => {
                console.log('getUserDetail', data);
                this.user = data;
            });
        }

        this.$store.dispatch('getUserRoles').then(data => {
            console.log('getUserRoles', data);
            this.roles = data;
        })
    },
    mounted () {
        
    },
    computed: {
        currentRoles () {
            let roles = [];

            this.roles.forEach(({id, name}) => {
                roles.push({id, name});
            });
            return roles;
        }
    },
    validations: {
        user: {
            account: {
                required
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            resuredPassword: {
                required,
                sameAsPassword: sameAs('password')
            },
            phone: {
                phoneChecked (value) {
                    if (value === '') return true;
                    return /^1[345789][\d]{9}$/ig.test(value);
                }
            },
             roleId: {
                required
            }
        },
        account: {
            oldPassword: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            newPassword: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            resureNewPassword: {
                required,
                sameAsPassword: sameAs('newPassword')
            }
        },
        editValids: ['user.account', 'user.phone'],
    },
    methods: {
        toChangePassword() {
            this.isChangePassword = true;
        },
        alert(text, okCb) {
            this.alertText = text;
            this.buttons[0].eventCb = okCb;
            this.alertShow = !this.alertShow;
        },
        saveUser () {
            this.$delete(this.user, 'lastLoginTime');
            this.$store.dispatch('editUser', {user: this.user, id: this.userId}).then(data => {
                this.alert('保存成功', (ev) => {
                    ev.hide();
                });
            }).catch(err => {
                    this.alert('保存失败:'+ err.message, (ev) => {
                    ev.hide();
                });
            });
        },
        addUser () {
            this.$store.dispatch('addUser', this.user).then(data => {
                    this.user = new User();
                    this.alert('添加成功', (ev) => {
                        ev.hide();
                    });
            }).catch(err => {
                    this.alert('保存失败:'+ err.message, (ev) => {
                    ev.hide();
                });
            });
        },
        confirmChangePassword(){
            this.$store.dispatch('changeUserPassword', {user: this.account, id: this.userId}).then(data => {
                    this.account = new Account();
                    this.isChangePassword = false;
                    this.alert('修改成功', (ev) => {
                        ev.hide();
                    });
            }).catch(err => {
                    this.alert('修改失败:'+ err.message, (ev) => {
                    ev.hide();
                });
            });
        },
        accountSubmit () {
            if(this.isEdit){
                if(this.isChangePassword){
                    this.confirmChangePassword();
                }else {
                    this.saveUser();
                }
            }else {
                this.addUser();
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
    #add-account-page {
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
    .operation-nav {
        padding: 20px 50px;
    }
    .operation-nav .btn {
        font-size: 16px;
    }
</style>