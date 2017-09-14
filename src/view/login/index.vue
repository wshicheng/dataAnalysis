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
          </FormItem>
      </Form>
    </div>
    <div id="login_footer">
      <h4>北京蜜蜂出行科技有限公司版权所有©2017</h4>
    </div>
  </div>
</template>
<script>
import {mapActions,mapState,mapGetters} from 'vuex'
    export default {
        data () {
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
                }
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
                                    this.setToken(res.data.data.token)
                                    this.addMenu(res.data.data.token)
                                    if (!this.isLoadRoutes) {  
                                        this.$router.addRoutes(this.menuitems)
                                        this.loadRoutes()  
                                    }
                                    this.getUser(res.data.data)
                                    window.sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                                    this.$router.push({path:'/index/cityManagerAnalysis'})
                                }else{
                                    this.errorTextShow = true
                                     this.errorText = message
                                }
                            })
                            .then( (err) => {
                                console.log(err)
                                //this.errorText = err
                            })
                        } else {
                            // this.$Message.error('表单验证失败!');
                        }
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
    padding: 40px 50px 20px 50px;
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




