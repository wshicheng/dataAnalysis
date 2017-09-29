<template>
    <div style="margin-right: 20px;">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>个人中心</BreadcrumbItem>
        </Breadcrumb>
        <div id="homepage_content">
            <div id="home_header">
                <h1>
                    <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048" 
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        action=""
                        style="display: inline-block;">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="cursor: pointer;" />
                        <i v-else  class="icon iconfont icon-touxiang" style="font-size: 180px;height: 200px;color: rgb(255, 255, 255); margin-left: 7px;position: relative;top: -34px; cursor: pointer;"></i>
                    </Upload>
                </h1>
                <div class="homepage_info">
                    <h2>{{name}}</h2>
                    <p>{{userName}}</p>
                </div>
            </div>
        </div>

        <div class="homepage_select">
            <h1><span>账户信息</span></h1>
            <ul>
                <li>
                    <span>
                        <i v-if="telBinded" class="iconfont right">&#xe616;</i>
                        <i v-else class="iconfont err">&#xe600;</i>
                    </span>
                    <span style="font-size: 16px;">手机验证</span>
                    <span>{{this.phoneNoBand === 0?'未绑定':'已绑定'}}</span>
                    <span v-if="this.phoneNoBand === 0">{{this.phoneNo === ''?'您尚未绑定手机号码，请尽快绑定手机号':'手机号码' + this.phoneNo + '未验证, 验证后可以使用手机号码进行登录'}}</span>
                    <span v-else>{{this.phoneNo === ''?'您尚未绑定手机号码，请尽快绑定手机号':'手机号码' + this.phoneNo + '已验证'}}</span>

                    <span v-show="bindShow">
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
                    <button @click="passWordModal = true">修改密码</button>
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
                        <Input v-model="bindPhone.passWord" type='password' placeholder="为保障账号安全，您需要填写当前登录账号与密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset('bindPhone')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('bindPhone')">立即绑定</Button>
            </div>
        </Modal>

        <!-- 修改模态框 -->
        <Modal v-model="editModal" width="431" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" class="editModal_head">
                <span>修改手机号码</span>
            </p>
            <div class="bindModal_body">
                <Form ref="editPhone" :model="editPhone" :rules="editPhoneRule" :label-width="80">
                    <FormItem label="手机号" prop="phoneNo" class="phone">
                        <Input v-model="editPhone.phoneNo" placeholder="请输入新手机号"></Input>
                        <Button class="sendCode" 
                        @click="editGetVerCode(editPhone.phoneNo)"
                        :plain="isPlain"
                        :disabled="isDisabled">发送验证码</Button>
                    </FormItem>
                    <FormItem label="验证码" prop="phoneCode" class="pc">
                        <Input v-model="editPhone.phoneCode" placeholder="请输入手机收到的验证码"></Input>
                    </FormItem>
                    <FormItem label="账户密码" prop="passWord" class="pwd">
                        <Input v-model="editPhone.passWord" type='password' placeholder="为保障账号安全，您需要填写当前登录账号与密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset2('editPhone')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit2('editPhone')">立即绑定</Button>
            </div>
        </Modal>

        <!-- 修改密码模态框 -->
        <Modal v-model="passWordModal" width="431" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" class="editModal_head">
                <span>修改密码</span>
            </p>
            <div>
                <Form ref="editPassWord" :model="editPassWord" :rules="editPassWordRule" :label-width="80">
                    <FormItem label="原始密码" prop="oldPassWord">
                        <Input v-model="editPassWord.oldPassWord" type='password' placeholder="请输入原始密码"></Input>
                    </FormItem>
                    <FormItem label="新密码"  prop="newPassWord">
                        <Input v-model="editPassWord.newPassWord" type='password' placeholder="密码为6-20位字符，可包含数字、字母、下划线"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="confirmPassWord">
                        <Input v-model="editPassWord.confirmPassWord" type='password' placeholder="确认密码"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="cancelEditPassWord('editPassWord')" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="confirmEditPassWord('editPassWord')">立即修改</Button>
            </div>
        </Modal>
    </div>
</template>

<style lang='scss' scoped type="text/css">
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
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
        margin-top: 10px;
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
        font-size: 17px;
        width: 100%;
        height: 48px;
        position: relative;
        span {
            position: absolute;
            left: 0;
        }
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
import qs from 'qs'
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.editPassWord.confirmPassWord !== '') {
                    this.$refs.editPassWord.validateField('confirmPassWord')
                }
                callback()
            }
        }
        var validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.editPassWord.newPassWord) {
                callback(new Error('两次输入密码不一致!'))
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
            phoneNoBand: '',
            imageUrl: '',
            editShow: false,
            bindShow: false,
            // 绑定手机号字段与规则
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
            // 修改手机号码字段与规则
			editPhone: {
                phoneNo: '',
                phoneCode: '',
                passWord: ''
            },
            editPhoneRule: {
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
            // 修改密码字段与规则
            editPassWord: {
                oldPassWord: '',
                newPassWord: '',
                confirmPassWord: ''
            },
            editPassWordRule: {
                oldPassWord: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'change' },
                    { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'blur' }
                ],
                newPassWord: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'change' },
                    { min: 6, max: 20, message: '密码长度应该在6-20位之间', trigger: 'blur' }
                ],
                confirmPassWord: [
                    { required: true, validator: validateCheckPass, trigger: 'blur' }
                ]
            },
            editModal: false,
            bindModal: false,
            passWordModal: false,
            isPlain:true,
            isDisabled:false,
            initText: ''
		}
    },
    mounted () {
        this.loadData ()
        this.$store.dispatch('menuActiveName', '/index/memberCenter')
    },
    methods: {
        getVerCode (val) {
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
                        that.bindPhone.verificationCode = JSON.parse(res.text).data
                    }
                })
            }
        },
        editGetVerCode (val) {
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

                this.axios.get('/beefly/user/api/v1/sendPhoneCode', {
                    params: {
                        accessToken: this.$store.state.token,
                        phoneNo: this.editPhone.phoneNo
                    }
                })
                .then( (res) => {
                    this.checkLogin(res)
                })
                .catch( (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        that.editPhone.verificationCode = JSON.parse(res.text).data
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
                this.bindPhone.phoneNo = res.data.data.phoneNo 

                this.phoneNoBand = res.data.data.phoneNoBand 
                if (res.data.data.phoneNoBand === 0) {
                    this.editShow = false
                    this.bindShow = true
                    this.telBinded = false
                } else {
                    this.editShow = true
                    this.bindShow = false
                    this.telBinded = true
                }

                if (res.data.data.adminUserIconUrl != null) {
                    this.imageUrl = res.data.data.adminUserIconUrl
                }

                console.log(this.imageUrl)
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
                            this.bindModal = false
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
        },
        openEditModal () {
            this.editModal = true
        },
        handleReset2 (name) {
            this.editModal = false
            this.$refs[name].resetFields();
        },
        handleSubmit2 (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios.get('/beefly/user/api/v1/phoneBinding', {
                        params: {
                            accessToken: this.$store.state.token,
                            phoneNo: this.editPhone.phoneNo,
                            phoneCode: this.editPhone.phoneCode,
                            passWord: this.editPhone.passWord
                        }
                    })
                    .then( (res) => {
                        this.checkLogin(res)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('手机号码修改成功!');
                            this.loadData()
                            this.$refs.editPhone.resetFields()
                            this.editModal = false
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    })
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })
        },
        confirmEditPassWord (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios.get('/beefly/user/api/v1/changePassWord', {
                        params: {
                            accessToken: this.$store.state.token,
                            oldPassWord: this.editPassWord.oldPassWord,
                            newPassWord: this.editPassWord.newPassWord
                        }
                    })
                    .then( (res) => {
                        this.checkLogin(res)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('密码修改成功!');
                            this.loadData()
                            this.$refs.editPassWord.resetFields()
                            this.passWordModal = false
                        } else {
                            this.$Message.error(res.data.message);
                        }
                    })
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })
        },
        cancelEditPassWord (name) {
            this.passWordModal = false
            this.$refs.editPassWord.resetFields();
        },
        handleBeforeUpload (file) {
            const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png')
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                this.$Message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!')
                return isJPG
            }
            if (!isLt2M) {
                this.$Message.error('上传头像图片大小不能超过 2MB!')
                return isLt2M
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            var data; 
            var that = this
            reader.onload = function(e){   
                data = this.result
                that.imageUrl = data
                that.axios.post('/beefly/user/api/v1/saveImage', qs.stringify({
                        accessToken: that.$store.state.token,
                        imageStr: data
                    })
                )
                .then( (res) => {
                    console.log(res)
                    if (res.data.resultCode === 1) {
                        that.$Message.success('头像保存成功！')
                        that.imageUrl = res.data.data.adminUserIconUrl
                        that.$store.dispatch('setHeadImg', that.imageUrl)
                        window.sessionStorage.setItem('headImg', that.imageUrl)
                        that.loadData()
                    } else {
                        that.$Message.success(res.data.message)
                    }
                })
                .catch( (err) => {
                    that.$Message.error('网络请求错误')
                    console.log(err)
                })
            }
            return false
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        }
    }
}
</script>


