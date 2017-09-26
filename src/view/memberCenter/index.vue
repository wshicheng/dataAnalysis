<template>
    <div style="margin-right: 20px;">
        <div id="homepage_content">
            <div id="home_header">
                <h1>
                    <!-- <img src="../../../assets/homepage/2.jpg"> -->
                    <!-- <el-upload
    						class="my_upload"
    						:show-file-list="true"
    						:with-credentials='true'
    						action=''
    						:http-request = 'uploadWay'
    						:on-success="handleAvatarSuccess"
    						:before-upload="beforeAvatarUpload">
    						<img v-if="imageUrl" :src="imageUrl" class="avatar">
    					  <i v-else  class="icon iconfont icon-touxiang" style="font-size: 180px;line-height: 196px; margin-left: 7px;"></i>
    						<h3>点击上传营业执照</h3>
    					</el-upload>  -->
                </h1>
                <div class="homepage_info">
                    <h2>{{name}}</h2>
                    <p>{{userName}}</p>
                </div>
            </div>
        </div>

        <div class="homepage_select">
            <h1>账户信息</h1>
            <ul>
                <li>
                    <span>
                        <i v-if="telBinded" class="iconfont right">&#xe616;</i>
                        <i v-else class="iconfont err">&#xe600;</i>
                    </span>
                    <span style="font-size: 16px;">手机验证</span>
                    <span>{{this.phoneNo === ''?'未绑定':'已绑定'}}</span>
                    <span>{{this.phoneNo === '' || null?'您的手机号码' + this.phoneNo === null?'':this.phoneNo + '尚未绑定，请尽快绑定手机号':'手机号码' + this.phoneNo + '已验证'}}</span>

                    <span>
                        <!-- <button disabled='isBinded' @click='$router.push({path:"/index/memberCenter/bindTel"})'>绑定手机号</button> -->
                        <button :class="{disabled:isBinded}" :disabled="isBinded" @click='openBindModel'>绑定手机号</button>
                    </span>

                    <span v-show="editShow">
                        <button @click='openEditModal'>修改手机号</button>
                    </span>
                </li>
                <!-- <li>
    					<span><i v-if="emailBinded" class="iconfont">&#xe616;</i><i v-else class="iconfont right">&#xe600;</i></span>
    					<span>邮箱验证</span>
    					<span>{{this.email === null?'未绑定':'已绑定'}}</span>
    					<span>{{this.email === null?'您尚未验证邮箱，请尽快登录邮箱进行验证':'邮箱' + this.email + '已验证'}}</span>
    					
    					<span>
    						<button @click='$router.push({path:"/index/memberCenter/bindEamil"})'>绑定邮箱</button>
    					</span>

    					<span>	
    						<button @click='$router.push({path:"/index/memberCenter/updateEmail"})'>修改邮箱</button>
    					</span>
    				</li> -->

                <li>
                    <span>
                        <i class="iconfont right">&#xe616;</i>
                    </span>
                    <span style="font-size: 16px;">登录密码</span>
                    <span style="color: #ccc;">建议使用6-20个字符，包含字母、数字、下划线</span>
                    <button @click='$router.push({path:"/index/memberCenter/amendPassword"})'>修改密码</button>
                </li>
            </ul>
        </div>

        <!-- 绑定模态框 -->
        <Modal v-model="bindModal" width="431" :styles="{top: '20%'}" class="bindModal_form">
            <p slot="header" class="bindModal_head">
                <span>绑定手机号码</span>
            </p>
            <div class="bindModal_body">
                <Form ref="bindPhone" :model="bindPhone" :rules="bindPhoneRule" :label-width="80">
                    <FormItem label="手机号" prop="phoneNo" class="phone">
                        <Input v-model="bindPhone.phoneNo" placeholder="请输入手机号"></Input>
                        <Button class="sendCode" 
                        @click="getVerCode(bindPhone.phoneNo)"
                        :plain="isPlain"
                        :disabled="isDisabled">发送验证码</Button>
                    </FormItem>
                    <FormItem label="验证码" prop="phoneCode" class="pc">
                        <Input v-model="bindPhone.phoneCode" placeholder="请输入手机收到的验证码"></Input>
                    </FormItem>
                    <FormItem label="账户密码" prop="passWord" class="pwd">
                        <Input v-model="bindPhone.passWord" placeholder="为保障账号安全，您需要填写当前登录账号与密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset('bindPhone')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('bindPhone')">立即绑定</Button>
            </div>
        </Modal>

        <!-- 编辑模态框 -->
        <Modal v-model="editModal" width="431" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" class="editModal_head">
                <span>绑定手机号码</span>
            </p>
            <div class="bindModal_body">
                <Form ref="editPhone" :model="editPhone" :rules="editPhoneRule" :label-width="80">
                    <FormItem label="手机号" prop="phoneNo" class="phone">
                        <Input v-model="editPhone.phoneNo" placeholder="请输入手机号"></Input>
                        <Button class="sendCode" 
                        @click="getVerCode(editPhone.phoneNo)"
                        :plain="isPlain"
                        :disabled="isDisabled">发送验证码</Button>
                    </FormItem>
                    <FormItem label="验证码" prop="phoneCode" class="pc">
                        <Input v-model="editPhone.phoneCode" placeholder="请输入手机收到的验证码"></Input>
                    </FormItem>
                    <FormItem label="账户密码" prop="passWord" class="pwd">
                        <Input v-model="editPhone.passWord" placeholder="为保障账号安全，您需要填写当前登录账号与密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset2('editPhone')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit2('editPhone')">立即绑定</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang='scss' scoped type="text/css">
    #member_router {
        width: 100%;
        height: 100%;
        background: rgba(68, 68, 68, 0.6);
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
    }

    #homepage_content {
        padding: 20px;
        background: #fff;
        margin-bottom: 20px;
        border: 1px solid #e7ecf1;
    }

    #home_header {
        height: 200px;
        width: 100%;
        background: #efcfa8;
    }

    #home_header div {
        width: 200px;
        float: left;
    }

    #home_header h1 {
        float: left;
        margin-left: 108px;
        border-radius: 50%;
        margin-top: 0;
    }

    #home_header h1 img {
        display: block;
        margin-top: 6px;
        width: 90%;
        height: 180px;
        border-radius: 50%;
        border: 3px solid #fff;
    }

    .homepage_info {
        margin-left: 60px;
        position: relative;
    }

    .homepage_info h2 {
        float: left;
        height: 30px;
        text-align: left;
        /* width: 80px; */
        font-size: 16px;
        line-height: 30px;
        margin-top: 25px;
    }

    .homepage_info p {
        float: left;
        height: 30px;
        text-align: left;
        width: 80px;
        line-height: 30px;
        margin-top: 25px;
        position: absolute;
        top: 30px;
    }

    .homepage_info h3 {
        position: absolute;
        color: #009900;
        padding: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        border: 1px solid #009900;
        left: 0;
        top: 100px;
    }

    .homepage_select {
        /*width: 100%;*/
        min-height: 681px;
        border: 1px solid #e7ecf1;
        padding: 2px 20px 0 20px;
        background: #fff;
        line-height: 60px;
    }

    .homepage_select h1 {
        border-bottom: 2px solid #444;
        text-align: left;
        text-indent: 20px;
        font-size: 22px;
        width: 100%;
        height: 60px;
    }

    .homepage_select i {
        margin-top: 10px;
        margin-left: 20px;
        font-size: 20px;
    }

    .homepage_select ul {
        list-style: none;
        overflow: hidden;
    }

    .homepage_select ul li {
        height: 40px;
        border-bottom: 1px solid #e7ecf1;
        line-height: 20px;
        margin: 20px 0px;
    }

    .homepage_select ul li span:nth-of-type(1) i {
        margin-right: 10px;
    }

    .homepage_select ul li button {
        width: 100px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        border: none;
        outline: none;
        font-size: 12px;
        color: green;
        /*background: rgba(66,66,66, 0.8);*/
        transition: all .2s linear 0s;
        background: #fff;
        text-align: left;
        text-decoration: underline;
    }

    .homepage_select ul li button.disabled {
        color: #ccc;
        text-decoration: none;
    }

    .homepage_select ul li button.disabled:hover {
        text-decoration: none;
    }

    .homepage_select ul li button:hover {
        /*background: rgba(66,66,66, 0.8);*/
        /*background: rgb(66,66,66);*/
        text-decoration: underline;
    }

    .homepage_select ul li:nth-of-type(1) span:nth-child(3) {
        margin-left: 20px;
    }

    .homepage_select ul li:nth-of-type(2) span:nth-child(3) {
        margin-left: 20px;
    }

    .homepage_select ul li:nth-of-type(1) span:nth-child(4) {
        margin-left: 40px;
        color: #ccc;
        font-size: 14px;
    }

    .homepage_select ul li:nth-of-type(1) button {
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }

    .homepage_select ul li:nth-of-type(2) span:nth-child(4) {
        margin-left: 40px;
        color: #ccc;
        font-size: 14px;
    }

    .homepage_select ul li:nth-of-type(2) button {
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }


    .homepage_select ul li:nth-of-type(3) span:nth-child(3) {
        margin-left: 110px;
        font-size: 14px;
    }

    .homepage_select ul li:nth-of-type(3) button {
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }

    .homepage_select ul li .right {
        color: green;
        font-size: 22px;
    }

    .homepage_select ul li .err {
        color: red;
    }

    p.bindModal_head {
        text-align: left;
        color: #404040;
    }

    .bindModal_body {
        overflow: hidden;
        .phone {
            width: 300px;
        }
        button.sendCode {
            width: 92px;
            text-align: center;
            position: absolute;
            right: -95px;
            top: 1px;
        }
        .pc,.pwd {
            width: 396px;
        }
    }
</style>

<script>
import {checkMobile, IsEmpty} from '../../util/util.js'
import $ from 'jquery'
export default {
	name: 'HomePage',
	data: function (){
        var validateTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'))
            }else {
                setTimeout(() => {
                var res = checkMobile(value)
                if (res === true) {
                    return callback()
                } else {
                    callback(new Error('手机格式格式不正确！！！'))
                }
                }, 1000)
            }
        }
        var validateVerCode = (rule,value,callback) => {
            if(!value) {
                return callback(new Error('验证码不能为空'))
            } else {
                callback()
            }
        }
		return {
			updateEmail: '',
			name: '姓名',
			userName: '用户名',
			phoneNo: '',
			email: '',
			telBinded: false,
			emailBinded: false,
			isBinded: false,
            imageUrl: '',
            editShow: false,
			bindPhone: {
                phoneNo: '',
                phoneCode: '',
                passWord: ''
            },
            bindPhoneRule: {
                phoneNo: [
                    {
                        required: true, trigger: 'blur', validator: validateTel
                    }
                ],
                phoneCode: [
                    {
                        required: true, message: '请输入验证码', validator: validateVerCode 
                    }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '请输入正确密码', trigger: 'blur' }
                ]
            },
            bindModal: false,  
            isPlain:true,
            isDisabled:false,
            initText: ''
		}
    },
    mounted () {
        this.loadData ()
    },
    methods: {
        getVerCode (val) {
            console.log(val)
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
                        $btn.text(that.initText)
                        clearInterval(timer)
                        return
                    }else {
                        $btn.text(initTime + 's')
                    }
                },1000)
                setTimeout(function(){
                    that.$Message.warning('已向您的手机发送验证码，请查收！！！')
                },1000)

                this.axios.get('/beefly/user/api/v1/sendPhoneCode', {
                    params: {
                        accessToken: this.$store.state.token,
                        phoneNo: this.bindPhone.phoneNo
                    }
                })
                .then( (res) => {
                    this.checkLogin(res)
                    console.log(res)
                })
                .catch( (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        that.ruleForm.verificationCode = JSON.parse(res.text).data
                    }
                })
            }
        },
        loadData () {
            this.axios.get('/beefly/user/api/v1/mycenter', {
                params: {
                    accessToken: this.$store.state.token
                }
            })
            .then( (res) => {
                this.checkLogin(res)
                console.log(res)

                // 填写用户信息
                this.name = res.data.data.name
                this.userName = res.data.data.userName
                this.phoneNo = res.data.data.phoneNo

                if (res.data.data.phoneNoBand === 0) {
                    this.editShow = false
                    this.telBinded = false
                } else {
                    this.editShow = true
                    this.telBinded = true
                }
            })
            .catch( (err) => {
                console.log(err)
            })
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios.get('/beefly/user/api/v1/phoneBinding', {
                        params: {
                            accessToken: this.$store.state.token,
                            phoneNo: this.bindPhone.phoneNo,
                            phoneCode: this.bindPhone.phoneCode,
                            passWord: this.bindPhone.passWord
                        }
                    })
                    .then( (res) => {
                        this.checkLogin(res)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('手机号码绑定成功!');
                            this.loadData()
                            this.$refs.bindPhone.resetFields()
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    })
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.bindModal = false
            this.$refs[name].resetFields();
        },
        openBindModel () {
            this.bindModal = true
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        }
    }
}
</script>


