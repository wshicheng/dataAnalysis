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
                    <span>手机验证</span>
                    <span>{{this.phone === ''?'未绑定':'已绑定'}}</span>
                    <span>{{this.phone === '' || null?'您的手机号码' + this.phone === null?'':this.phone + '尚未绑定，请尽快绑定手机号':'手机号码' + this.phone + '已验证'}}</span>

                    <span>
                        <!-- <button disabled='isBinded' @click='$router.push({path:"/index/memberCenter/bindTel"})'>绑定手机号</button> -->
                        <button :class="{disabled:isBinded}" :disabled="isBinded" @click='$router.push({path:"/index/memberCenter/bindTel"})'>绑定手机号</button>
                    </span>

                    <span>
                        <button @click='$router.push({path:"/index/memberCenter/updateTel"})'>修改手机号</button>
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
                    <span>登录密码</span>
                    <span>建议使用6-20个字符，包含字母、数字、下划线</span>
                    <button @click='$router.push({path:"/index/memberCenter/amendPassword"})'>修改密码</button>
                </li>
            </ul>
        </div>

        <router-view id="member_router"></router-view>
    </div>
</template>

<style scoped>
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
</style>

<script>
export default {
	name: 'HomePage',
	data: function (){
		return {
			updateEmail: '',
			name: '姓名',
			userName: '用户名',
			phone: '',
			email: '',
			telBinded: false,
			emailBinded: false,
			isBinded: false,
			imageUrl: ''
			
		}
    },
}
</script>


