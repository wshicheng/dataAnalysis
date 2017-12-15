<template>
  <div>
    <div id="login_head">
      <h1>蜜蜂出行数据运营平台</h1>
    </div>
    <div id="login_form" :style="{backgroundImage: 'url(' +bg + ')'}">
      <Form class="form" ref="formInline" :model="formInline" >
          <h1>登录</h1>
          <FormItem prop="user">
              <Input type="text" autofocus v-on:on-change="handleCheck" v-model="formInline.user" placeholder="请输入用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-on:on-change="handleCheck"  v-model="formInline.password" placeholder="请输入密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
              </Input>
               <div class="ivu-form-item-error-tip" v-show="errorTextShow">{{errorText}}</div>
          </FormItem>
          <FormItem>
              <button type="button" @click="handleSubmit('formInline')" style="font-weight: bolder;">登录</button>
              <p class="forgotPwd"  @click="openForgetPwdModal">忘记密码</p> 
          </FormItem>  
      </Form>
    </div>
    <div id="login_footer">
      <h4>北京蜜蜂出行科技有限公司版权所有©2017</h4>
    </div>

        <!-- 忘记密码模态框 -->
        <Modal v-model="forgotPwdModal" :mask-closable='close' :closable='closeX' width="531" :styles="{top: '20%'}">
            <p slot="header">
                <span>忘记密码</span>
            </p>
            <div>
                <Form ref="forgotPassWord" :model="forgotPassWord" :rules="forgotPassWordRule" :label-width="80">
                    <FormItem label="手机号" prop="phoneNo" class="phone">
                        <Input v-model="forgotPassWord.phoneNo" placeholder="请输入新手机号" style="width: 323px"></Input>
                        <Button class="sendCode" 
                        @click="getVerCode(forgotPassWord.phoneNo)"
                        style="width: 92px;"
                        :plain="isPlain"
                        :disabled="isDisabled">发送验证码</Button>
                    </FormItem>
                    <FormItem label="验证码" prop="phoneCode" class="pc">
                        <Input v-model="forgotPassWord.phoneCode" placeholder="请输入手机收到的验证码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset2('forgotPassWord')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit2('forgotPassWord')">设置新密码</Button>
            </div>
        </Modal>

        <!-- 设置新密码模态框 -->
        <Modal v-model="setNewPassWordModel" :mask-closable='close' width="531" :styles="{top: '20%'}">
            <p slot="header">
                <span>设置新密码</span>
            </p>
            <div>
                <Form ref="setNewPassWord" :model="setNewPassWord" :rules="setNewPassWordRule" :label-width="80">
                    <FormItem label="新密码"  prop="newPassWord">
                        <Input v-model="setNewPassWord.newPassWord" type='password' placeholder="密码为6-20位字符，可包含数字、字母、下划线"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="confirmPassWord">
                        <Input v-model="setNewPassWord.confirmPassWord" type='password' placeholder="确认密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="cancelSetPassWord('setNewPassWord')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="confirmSetPassWord('setNewPassWord')">确认修改</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import {checkMobile, IsEmpty,setCookie} from '../../util/util.js'
import {mapActions,mapState,mapGetters} from 'vuex'
    export default {
        data () {
            var validateTel = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号码不能为空'))
                } else {
                    callback()
                    // setTimeout(() => {
                    // var res = checkMobile(value)
                    // if (res === true) {
                    //     this.axios.get('/beefly/user/api/v1/sendPhoneCode', {
                    //         params: {
                    //             accessToken: this.$store.state.token,
                    //             phoneNo: value
                    //         }
                    //     })
                    //     .then( (res) => {
                    //         if (res.data.resultCode === 1) {
                    //             this.phoneHaveBind = false
                    //             return callback()
                    //         } else {
                    //             this.phoneHaveBind = true
                    //             callback(new Error(res.data.message))
                    //         }
                    //     })
                    //     .catch( err => {
                    //         console.log(err)
                    //     })
                    // } else {
                    //     callback(new Error('手机格式格式不正确！！！'))
                    // }
                    // }, 1000)
                }
            }
            var validateTelForgot = (rule, value, callback) => {
                var reg = /^[1][3-9][0-9]{9}$/
                if (value === '') {
                    return callback(new Error('手机号码不能为空'))
                } else if (reg.test(value)) {
                    return callback()
                } else {
                    return callback(new Error('请输入正确的手机号码'))
                }
            }
            var validateVerCode = (rule,value,callback) => {
                if(!value) {
                    return callback(new Error('验证码不能为空'))
                } else {
                    callback()
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (this.setNewPassWord.confirmPassWord !== '') {
                        this.$refs.setNewPassWord.validateField('confirmPassWord')
                    }
                    callback()
                }
            }
            var validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.setNewPassWord.newPassWord) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                bg:require('../../assets/img/1.jpg'),
                errorText:'',
                errorTextShow:false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'changes' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'change' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'change' }
                    ]
                },
                forgotPwdModal: false,
                forgotPassWord: {
                    phoneNo: '',
                    phoneCode: '',
                },
                forgotPassWordRule: {
                    phoneNo: [
                        {
                            required: true, trigger: 'blur', validator: validateTelForgot
                        }
                    ],
                    phoneCode: [
                        {
                            required: true, message: '请输入验证码', validator: validateVerCode 
                        }
                    ]
                },
                // 修改密码字段与规则
                setNewPassWord: {
                    newPassWord: '',
                    confirmPassWord: '',
                    id: ''
                },
                setNewPassWordRule: {
                    newPassWord: [
                        // { required: true, validator: validatePass, trigger: 'blur' },
                        { required: true, min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'change' },
                        { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'blur' }
                    ],
                    confirmPassWord: [
                        { required: true, validator: validateCheckPass, trigger: 'blur' }
                    ]
                },
                isPlain:true,
                isDisabled:false,
                close: false,
                setNewPassWordModel: false,
                closeX: false,
                authList: []
            }
        },
       computed:{
           ...mapGetters(['isLoadRoutes','menuitems','userInfo'])
       },
        mounted () {
            document.title = '数据运营平台 - 登录'
           var _this = this;
           document.body.onkeydown=function(e){
               if(e.keyCode===13){
                   _this.handleSubmit('formInline')
               }
           }
        },
        methods: {
            handleCheck(){
                if(this.formInline.user.trim().length!=0){
                    this.errorTextShow = false
                }
                if(this.formInline.password.trim().length!=0){
                    this.errorTextShow = false
                }
                if(this.formInline.password.trim.length===0&&this.formInline.user.trim().length===0){
                    this.errorText = '请输入用户名和密码'
                    this.errorTextShow = true
                }
            },
            ...mapActions(['setToken','addMenu','loadRoutes','getUser']),
            handleSubmit(name) {
                var that = this
                if(this.formInline.user.trim().length===0&&this.formInline.password.trim().length>0){
                    this.errorText = '请输入用户名'
                    this.errorTextShow = true
                    return
                }
                if(this.formInline.password.trim().length===0&&this.formInline.user.trim().length>0){
                    this.errorText = '请输入密码'
                    this.errorTextShow = true
                    return
                }
                if(this.formInline.password.trim().length===0&&this.formInline.user.trim().length===0){
                    this.errorText = '请输入密码或者用户名'
                    this.errorTextShow = true
                    return
                }
                if(this.formInline.user.trim().length>0&&this.formInline.password.trim().length>0){
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.axios({
                                url:'/system/login',
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                params:{
                                    'userName': this.formInline.user,
                                    'passWord': this.formInline.password
                                }
                            })
                            .then((res) => {
                                    var resultCode = res.data.resultCode
                                var message = res.data.message

                                if(resultCode === 1){

                                    var resData = res.data.data

                                    resData.authList.map( (item) => {
                                        this.authList.push(item.menuCode)
                                    })

                                    
                                    this.setToken(res.data.data.token)
                                    // this.addMenu(res.data.data.token)
                                    this.addMenu(this.authList)
                                    if (!this.isLoadRoutes) {  
                                        this.$router.addRoutes(this.menuitems)
                                        this.loadRoutes()  
                                    }
                                    this.getUser(res.data.data)
                                    window.localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                                    window.localStorage.setItem('authList',this.authList)
                                    window.localStorage.setItem('headImg', res.data.data.adminUserIconUrl)
                                    window.localStorage.setItem('cityStr', res.data.data.cityStr)
                                    window.localStorage.setItem('cityList', JSON.stringify(res.data.data.cityList))
                                    // 后台将totalPage的值在这里用来表示单个/多个城市， 1:多个，0：单个
                                    window.localStorage.setItem('cityType', res.data.totalPage)
                                    // window.localStorage.setItem('authList', )
                                    // 登录相关操作
                                    if (this.menuitems.length === 0) {
                                        this.$router.push('/nofound')
                                    } else {
                                        this.$router.push(this.menuitems[0].children[0].path)
                                    }
                                }else{
                                    this.errorTextShow = true
                                    this.errorText = message
                                }
                            })
                            .catch( (err) => {
                                console.log(err)
                                //this.errorText = err
                            })
                        } else {
                            // this.$Message.error('表单验证失败!');
                        }
                    })
                }
            },
            openForgetPwdModal () {
                this.forgotPwdModal = true
            },
            handleReset2 (name) {
                this.forgotPwdModal = false
                this.$refs[name].resetFields();
            },
            handleSubmit2 (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.get('/system/validateCode', {
                            params: {
                                phoneNo: this.forgotPassWord.phoneNo,
                                phoneCode: this.forgotPassWord.phoneCode
                            }
                        })
                        .then( (res) => {
                            var message = res.data.message
                            if (res.data.resultCode === 1) {
                                this.$Message.success(message);
                                // 记录user的ID
                                this.setNewPassWord.id = res.data.data.id
                                this.$refs[name].resetFields()
                                this.forgotPwdModal = false
                                var that = this
                                setTimeout(function () {
                                    that.setNewPassWordModel = true
                                }, 300)
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        })
                    } else {
                        // this.$Message.error('表单验证失败!');
                    }
                })
            },
            cancelSetPassWord (name) {
                this.setNewPassWordModel = false
                this.$refs[name].resetFields();
            },
            confirmSetPassWord (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.get('/system/resetPassWord', {
                            params: {
                                id: this.setNewPassWord.id,
                                passWord: this.setNewPassWord.newPassWord
                            }
                        })
                        .then( (res) => {
                            if (res.data.resultCode === 1) {
                                this.$Message.success('新密码设置成功!');
                                this.$refs.setNewPassWord.resetFields()
                                this.setNewPassWordModel = false
                            } else {
                                this.$Message.error(res.data.message);
                            }
                        })
                    } else {
                        // this.$Message.error('表单验证失败!');
                    }
                })
            },
            getVerCode (val) {
                if (val === '') {
                    return
                } else {
                    this.axios.get('/system/sendCode', {
                        params: {
                            phoneNo: this.forgotPassWord.phoneNo
                        }
                    })
                    .then( (res) => {
                        if (res.data.resultCode === 1) {
                            var that = this
                            var $btn = $('button.sendCode')
                            var text = $btn.text()
                            this.initText = text
                            var initTime = 60
                            if(checkMobile(val)){
                                this.isDisabled = true
                                this.isPlain = false
                                var timer = setInterval(function(){
                                    initTime--
                                    if(initTime<=0){
                                        that.isDisabled = false
                                        that.isPlain = true
                                        $btn.text('')
                                        $btn.text('发送验证码')
                                        clearInterval(timer)
                                        return
                                    }else {
                                        $btn.text(initTime + 's')
                                    }
                                },1000)
                                setTimeout(function(){
                                    that.$Message.warning('已向您的手机发送验证码，请查收！！！')
                                },1000)
                            }
                        } else {
                            this.$Message.error(res.data.message)
                        }
                    })
                    .catch( (err) => {
                        console.log(err)
                    })
                }
            }
        }
    }
</script>
<style lang='scss' scoped type="text/css">
#login_head {
  width: 100%;
    height: 80px;
    line-height: 80px;
    text-indent: 40px;
    position: fixed;
    top: 0;
  h1 {
    color: #888;
    font-size: 30px;
  }
}

#login_form {

  width: 100%;
    height: calc(100% - 160px);
     background-repeat:  no-repeat;
    background-size: cover;
    position: fixed;
    bottom: 90px;
    top: 75px;
  form {
    padding: 40px 50px 10px 50px;
    background: #fff;
    border: 1px solid #444;
    border-radius: 4px;
    width: 420px;
    position: absolute;
    right: 30px;
    top: 50%;
    margin-top: -130px;
    h1 {
      color: #444;
      margin: -20px 0 10px 0;
    }
    button {
      width: 320px;
      height: 36px;
      border-radius: 4px;
      outline: none;
      border: none;
      background: rgba(241, 194, 52, 1);
      color: #fff !important;
      cursor: pointer;
    }
    .forgotPwd {
        position: relative;
        text-decoration: underline;
        font-size: 12px;
        margin-top: 10px;
        cursor: pointer;
    }
    button.sendCode {
        width: 92px;
        text-align: center;
        position: absolute;
        right: -95px;
        top: 1px;
    }
  }
}

#login_footer {
  width: 100%;
    overflow: hidden;
    height: 80px;
    line-height: 80px;
    text-align: center;
    position: fixed;
    bottom: 0;
  h4 {
    margin: 0 auto;
  }
}
</style>




