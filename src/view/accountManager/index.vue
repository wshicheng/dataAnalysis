<template>
    <Row class="accountManager">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>账号管理</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
            <!-- <Col span="7"> -->
            <span class="lable">关键字：</span>
            <Input v-model="userName" @on-change="handleQuery" placeholder="姓名\用户名" style="width: 160px"></Input>
            <!-- </Col> -->
            <!-- <Col span="7"> -->
            <span class="lable" style="margin-left: 30px;">联系方式：</span>
            <Input v-model="phone" @on-change="handleQuery" placeholder="手机号\邮箱" style="width: 160px"></Input>
            <!-- </Col> -->
            <button class="DIY_button" @click="query(1)" style="margin-left: 30px;position: relative;top: 1px;">查询</button>

        </Row>
        <Row class="tableGrid" style="position:relative">
            <Spin fix size="large" v-if="spinShow" class="spin">
                <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                <div style="color: #ccc; text-indent: 5px;"> loading...</div>
            </Spin>
            <Col class="opeartor">
            <Button type="warning" @click="handleAdd">添加账号</Button>
            </Col>
            <div style="position:relative;">
                <Table :no-data-text='noDataText' :columns="columns" :data="data"></Table>
            </div>
            <Page v-show="pageShow" :total="totalListNum" class="tableGrid_page" placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts' show-elevator></Page>
        </Row>
        <!-- 模态框区域 编辑数据 -->
        <Modal v-model="editModal" width="800px" :mask-closable="close" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" style="color: #404040;">
                <span>编辑账号</span>
            </p>
            <div class="editModal_content">
                <Form ref="editValidate" :model="editValidate" :rules="editValidate" :label-width="100">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="editValidate.userName" style="width:300px;" placeholder="不超过100个字符"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="editValidate.passWord" type="password" style="width:300px;" placeholder="6-20位字符，可包括字母和数字，区分大小写"></Input>
                    </FormItem>
                    <FormItem label="所属角色" prop="roleName">
                        <!-- <Select style="width:300px;" @on-change="handleSelect" v-model="editValidate.roleName" :value="editValidate.roleName" placeholder="请选择所属角色">
                            <Option value="角色1">角色1</Option>
                            <Option value="角色11">角色11</Option>
                            <Option value="角色1123">角色1123</Option>
                        </Select> -->
                         <Select style="width:300px;" @on-change="handleRole" v-model="editValidate.roleName" placeholder="请选择所属角色">
                            <Option :value="role.roleName" :key="role.id" v-for="role of allRole">{{role.roleName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="可查看地区" prop="area">
                        <!-- <div>
                            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                        </div>
                        <CheckboxGroup v-model="editValidate.cityList" @on-change="checkAllGroupChange">
                            <Checkbox label="地区1"></Checkbox>
                            <Checkbox label="地区2"></Checkbox>
                            <Checkbox label="地区3"></Checkbox>
                            <Checkbox label="地区4"></Checkbox>
                        </CheckboxGroup> -->
                         <div>
                            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
                                全部地区
                            </Checkbox>
                        </div>
                        <CheckboxGroup v-model="editValidate.cityList" @on-change="checkAllGroupChange">
                            <Checkbox :label="list.name" :key="list + '_1_' + Math.random()" v-for="list of allCity"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="editValidate.name" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phoneNo">
                        <Input v-model="editValidate.phoneNo" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="editValidate.email" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>

                    <FormItem label="备注" prop="desc">
                        <Input v-model="editValidate.description" style="width:300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <!-- <FormItem>
                                        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                    </FormItem> -->
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="closeEditModel" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('editValidate')">确定</Button>

            </div>
        </Modal>
        <!-- 模态框区域 增加数据 -->
        <Modal v-model="addModal" width="800px" :styles="{top: '20%'}" :mask-closable="close" class="addModal_form">
            <p slot="header" class="editModal_head" style="color: #404040;">
                <span>添加账号</span>
            </p>
            <div class="editModal_content">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="用户名" prop="userName">
                        <Input v-model="formValidate.userName" style="width:300px;" placeholder="不超过100个字符"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="passWord">
                        <Input v-model="formValidate.passWord" type="password" style="width:300px;" placeholder="6-20位字符，可包括字母和数字，区分大小写"></Input>
                    </FormItem>
                    <FormItem label="所属角色" prop="roleName">
                        <Select style="width:300px;" v-model="formValidate.roleName" @on-change="handleRole" placeholder="请选择所属角色">
                            <Option :value="role.roleName" :key="role.id" v-for="role of allRole">{{role.roleName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="可查看地区" prop="area">
                        <div>
                            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
                                全部地区
                            </Checkbox>
                        </div>
                        <CheckboxGroup v-model="formValidate.cityList" @on-change="checkAllGroupChange">
                            <Checkbox :label="list.name" :key="list + '-' + Math.random()" v-for="list of allCity"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" style="width:300px;" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="phoneNo">
                        <Input v-model="formValidate.phoneNo" style="width:300px;" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="formValidate.email" style="width:300px;" placeholder="请输入邮箱"></Input>
                    </FormItem>

                    <FormItem label="备注" prop="description">
                        <Input v-model="formValidate.description" style="width:300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <!-- <FormItem>
                                        <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                    </FormItem> -->
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="closeAddModel" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('formValidate')">确定</Button>
            </div>
        </Modal>
        <!-- 删除模态框 -->
        <Modal v-model="delModal" :styles="{width: '500px', top: '20%'}" :mask-closable="close" class="editModal_form">
            <p slot="header" class="editModal_head">
                <span>Warning</span>
            </p>
            <p style="color: #444; font-weight: bold; font-size: 16px; text-align:left;text-indent:55px; height: 50px; line-height: 50px;">确认删除吗？</p>
            <div slot="footer">
                <Button class="cancel" @click="delModal = false" style="margin-left: 8px">取消</Button>
                <Button type="warning" class="confirm" @click="closeDelModal">确认</Button>
            </div>
        </Modal>
    </Row>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            close:false,
            initStatu:'',
            allCity: [],
            allCityCode: [],
            allRole: [],
            roleId: '',
            id: '',
            spinShow: true,
            tableShow: true,
            pageShow: false,
            indeterminate: false,
            checkAll: false,
            editModal: false,
            addModal: false,
            delModal: false,
            myvalue: '',
            index: '',
            editValidate: {

            },
            editValidateRule: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                roleName: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                cityList: [
                    { required: false, type: 'array', min: 1, message: '至少选择一个地区', trigger: 'change' },

                ],
                name: [
                    { required: false, message: '姓名不能为空', trigger: 'blur' }
                ],
                phoneNo: [
                    { required: false, message: '手机号不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: false, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                description: [
                    { required: false, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', max: 200, message: '不能超过200个字符', trigger: 'blur' }
                ]
            },
            formValidate: {
                userName: '',
                passWord: '',
                roleName: '',
                cityList: [],
                name: '',
                phoneNo: '',
                email: '',
                description: ''
            },
            ruleValidate: {
                userName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                roleName: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                cityList: [
                    { required: false, type: 'array', min: 1, message: '至少选择一个地区', trigger: 'change' }
                ],
                name: [
                    { required: false, message: '姓名不能为空', trigger: 'blur' }
                ],
                phoneNo: [
                    { required: false, message: '手机号不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: false, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                description: [
                    { required: false, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', max: 200, message: '介绍不能超过200个字符', trigger: 'blur' }
                ]
            },
            recodeCityList:[],
            initRowData: {},
            userName: '',
            phone: '',
            columns: [
                {
                    title: '用户名',
                    key: 'userName',
                    render: (h, params) => {
                        return h('a', {
                            style: {
                                color: '#2d8cf0',
                                cursor: 'initial'
                            },
                            // attrs: {
                            //     blank: '_blank',
                            //     href: '/#/index/accountManger/userName/' + params.row.userName
                            // }
                        }, params.row.userName)
                    }
                },
                {
                    title: '手机号',
                    key: 'phoneNo'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '角色',
                    key: 'roleName'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        return h('div', {
                            style: {
                                position: 'relative',
                                width: '60px',
                                borderRadius: '24px',
                                height: '24px',
                                color: '#fff',
                                background: params.row.status === 1 ? 'rgb(44, 228, 119)' : 'rgb(217, 221, 228)',
                                cursor: 'pointer'
                            },
                            attrs: {
                                class: params.row.status === 1 ? 'active' : ''
                            },
                            on: {
                                click: (e) => {
                                    this.changeState(params.index, params.row.id, params.row.status === 1 ? 0 : 1)
                                    return;
                                    if (e.currentTarget.getAttribute('class')) {
                                        e.currentTarget.setAttribute('class', '')
                                        e.currentTarget.style.backgroundColor = "rgb(217, 221, 228)"
                                        e.currentTarget.children[1].style.display = 'block'
                                        e.currentTarget.children[0].style.display = 'none'
                                        e.currentTarget.children[2].style.right = '36px'
                                    } else {
                                        e.currentTarget.setAttribute('class', 'active')
                                        e.currentTarget.style.backgroundColor = "rgb(44, 228, 119)"
                                        e.currentTarget.children[2].style.right = '1px'
                                        e.currentTarget.children[1].style.display = 'none'
                                        e.currentTarget.children[0].style.display = 'block'
                                    }

                                }
                            }
                        }, [
                                h('span', {
                                    style: {
                                        width: '50%',
                                        height: '24px',
                                        float: 'left',
                                        lineHeight: '24px',
                                        textAlign: 'center',
                                        visible: 'hidden'
                                    }
                                }, '启用'),
                                h('span', {
                                    style: {
                                        width: '50%',
                                        height: '24px',
                                        float: 'right',
                                        lineHeight: '24px',
                                        textAlign: 'center'
                                    }
                                }, '冻结'),
                                h('span', {
                                    style: {
                                        width: '26px',
                                        height: '22px',
                                        display: 'block',
                                        position: 'absolute',
                                        transition: 'all linear .2s',
                                        right: params.row.status === 1 ? '1px' : '33px',
                                        top: '1px',
                                        background: '#fff',
                                        borderRadius: '24px'
                                    }
                                })
                            ])
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('i', {
                                attrs: {
                                    class: 'iconfont icon-52'
                                },
                                style: {
                                    marginRight: '20px',
                                    display: 'blcok',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.show(params)
                                    }
                                }
                            }),
                            h('i', {
                                attrs: {
                                    class: 'iconfont icon-close-fat'
                                },
                                style: {
                                    display: 'blcok',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.index, params.row.id)
                                    }
                                }
                            })
                        ]);
                    }
                }

            ],
            data: [],
            noDataText: '',
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            timer: null
        }
    },
    computed: {
        ...mapGetters(['accessToken'])
    },
    methods: {
        handleCheckAll() {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.formValidate.cityList = this.allCity.map((item) => { return item.name });
                this.editValidate.cityList = this.allCity.map((item) => { return item.name });
                this.allCityCode = this.allCity.map((item)=>{return item.code})
            } else {
                this.formValidate.cityList = [];
                this.editValidate.cityList = [];
                this.allCityCode = []
            }
            
        },
        checkAllGroupChange(data) {
          
            if (data.length === this.allCity.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
            this.allCityCode = []
            data.map((item)=>{
                for(var i=0;i<this.allCity.length;i++){
                    if(this.allCity[i].name===item){
                       this.allCityCode.push(this.allCity[i].code)
                    }
                }
                
            })
        },
        show(params) {
            /*显示弹窗*/
            var that = this
            this.editModal = true
            this.editValidate = params.row
            this.editValidate.passWord='********'
            this.index = params.index
            this.recodeCityList = params.row.cityList.map((item)=>{return item.name})
            this.editValidate.cityList = this.recodeCityList
            //$('span.ivu-select-selected-value').text(params.row.role)
        },
        handleSubmit(name) {
            if (name === 'formValidate') {
                // 增加数据
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addAccount()
                        this.handleReset(name)
                    } else {
                        this.$Message.error('表单验证失败!');
                        this.handleReset(name)
                    }
                })
            } else {
                //修改数据
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.modifyAccount()
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }

        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        closeEditModel () {
            // this.$refs.editValidate.resetFields()
            this.query()
            this.editModal = false
        },
        closeAddModel () {
            this.$refs.formValidate.resetFields()
            this.checkAll = false
            this.formValidate.cityList = []
            this.addModal = false
        },
        handleDelete(index, id) {
            /*删除Row 数据 根据index 序列号*/
            this.delModal = true
            this.id = id
            this.index = index
        },
        closeDelModal() {
            //
            this.delete(this.id)
            //this.data.splice(this.index, 1)
            //this.delModal = false
        },
        handleAdd() {
            /*增加数据*/
            this.addModal = true
            this.checkAll = false;
            //this.data.unshift(this.editValidate)
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            // 页码变化发请求
            this.query(currentPage)
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize
            // 页面size 变化 发请求
            this.query(this.currentPage)
        },
        handleQuery(e) {
            var name = this.userName;
            var phone = this.phone
            // 发起查询请求 
            if (name.length === 0 && phone.length === 0) {
                this.query(1)
            }
        },
        query(pageNo) {
            // 点击查询按钮 实际执行函数
            var keyword = this.userName
            var tel = this.phone
            var pageSize = this.pageSize
            var accessToken = this.accessToken
            this.throttle(this.queryData, null, 500, { keyword, tel, pageNo:pageNo, pageSize, accessToken })

        },
        delete(index) {
            this.axios.get('/beefly/user/api/v1/delete', {
                params: { id: index, accessToken: this.accessToken }
            }).then((res) => {
                if (res.data.resultCode === 1) {
                    this.data.splice(this.index, 1)
                    this.delModal = false
                } else if (res.data.resultCode === 0) {
                    this.$router.push('/login')
                }
            })
        },
        modifyAccount(){
            this.initStatu = this.editValidate.status
            delete this.editValidate.cityList;
            delete this.editValidate._index;
            delete this.editValidate._rowKey;
            delete this.editValidate.token;
            delete this.editValidate.adminUserIconUrl;
            delete this.editValidate.createTime;
            delete this.editValidate.roleName;
            delete this.editValidate.status;
            delete this.editValidate.updateDate;
           this.axios.get('/beefly/user/api/v1/update', {
                params: Object.assign({},this.editValidate,{accessToken:this.accessToken},{roleId:this.roleId},{cityStr:this.allCityCode.join(',')})
            }).then((res) => {
                if (res.data.resultCode === 1) {
                      this.$Message.success('修改成功!');
                      this.editModal = false
                      this.data.splice(this.index, 1,Object.assign({},this.editValidate,{status:this.initStatu}))
                      this.query(this.currentPage)
                } else if (res.data.resultCode === 0) {
                    this.$router.push('/login')
                }
            }) 
        },
        addAccount(){
            delete this.formValidate.cityList;
           this.axios.get('/beefly/user/api/v1/add', {
                params: Object.assign({},this.formValidate,{accessToken:this.accessToken},{roleId:this.roleId},{cityStr:this.allCityCode.join(',')})
            }).then((res) => {
                 var message = res.data.message
                if (res.data.resultCode === 1) {
                     this.$Message.success(message);
                   this.data.unshift(Object.assign({},this.formValidate,{status:1}))
                    this.addModal = false
                     this.checkAll = false;
                     this.formValidate = {}
                     this.query(this.currentPage)
                } else{
                     this.checkAll = false;
                    this.$Message.error(message);
                }
            }) 
        },
        changeState(index, id, status) {
            this.axios.get('/beefly/user/api/v1/status', {
                params: { id: id, status: status, accessToken: this.accessToken }
            }).then((res) => {
                var message = res.data.message
                if (res.data.resultCode === 1) {
                    this.$Message.success(message);
                    var res = Object.assign({}, this.data[index], { status: this.data[index].status === 1 ? 0 : 1 })
                    this.data.splice(index, 1, res)
                } else if (res.data.resultCode === 0) {
                    this.$router.push('/login')
                }
            })
        },
        queryData(text) {
            // 调用后台接口 发请求
            this.spinShow = true
            const { keyword, tel, pageNo, pageSize, accessToken } = text
            this.axios.get('/beefly/user/api/v1/page', {
                params: { keyword, tel, pageNo, pageSize, accessToken }
            }).then((res) => {
                this.spinShow = false
                console.log(res.data.data)
                if (res.data.data.length > 0) {
                    this.pageShow = true
                }
                if (res.data.data.length === 0) {
                    this.pageShow = false
                    this.noDataText = '暂无数据'
                }
                var message = res.data.message
                this.totalListNum = res.data.totalItems
                this.data = res.data.data
                if (message === '用户登录超时') {
                    this.$router.push('/login')
                }
            }).catch((error) => {
                console.log(error)
                this.noDataText = '暂无数据'
                this.spinShow = false
            })

        },
        queryCity() {
            // 调用后台接口 发请求 调取city
            this.axios.get('/beefly/user/api/v1/allCity', {
                params: { accessToken: this.accessToken }
            }).then((res) => {
                this.allCity = res.data.data
                // this.formValidate.cityList = res.data.data.map((item)=>{return item.name})
                var message = res.data.message
                if (message === '用户登录超时') {
                    this.$router.push('/login')
                }
            })

        },
        queryRole() {
            // 调用后台接口 发请求 调取role
            this.axios.get('/beefly/role/api/v1/allRole', {
                params: { accessToken: this.accessToken }
            }).then((res) => {
                this.allRole = res.data.data
                var message = res.data.message
                if (message === '用户登录超时') {
                    this.$router.push('/login')
                }
            })

        },
        handleRole(value) {
            var res = this.allRole.filter((item) => { return item.roleName === value })
            if(res.length>0){
                 this.roleId = res[0].id
            }
        },
        throttle(fn, context, delay, text) {
            // 节流函数
            clearTimeout(fn.timeoutId)
            fn.timeoutId = setTimeout(function() {
                fn.call(context, text)
            }, delay)
        },
        mockTableDatas() {
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arr.push({
                    userName: 'jack' + i,
                    phoneNum: '18812341234',
                    name: 'zhouyu',
                    role: '角色1',
                    status: 0
                })
            }
            return arr;
        }
    },
    mounted() {
        document.title = '数据运营平台 - 账号管理'
        this.$store.dispatch('menuActiveName', '/index/accountManager')
        this.query(1)
        this.queryCity()
        this.queryRole()
    },
    watch:{
        'editValidate.cityList':{
            handler:function(val,OldVal){
                this.allCityCode = []
               val.map((item)=>{
                   for(var i=0;i<this.allCity.length;i++){
                       if(this.allCity[i].name===item){
                           this.allCityCode.push(this.allCity[i].code)
                       }
                   }
               })
            },
            deep:true
        }
    }
}
</script>
<style lang="scss" type="text/css" scoped>
$ivu-breadcrumb-margin:10px;
$tableGridMargin:20px;
$tableGridMarginBottom:20px;
.ivu-breadcrumb {
    margin-bottom: $ivu-breadcrumb-margin
}

div.tableGrid {
    margin-top: $tableGridMargin;
    margin-bottom: $tableGridMarginBottom;
    padding: 20px 10px 20px 10px;
    background: #fff;
    .tableGrid_page {
        margin-top: 20px;
        // margin-right: -10px;
    }
    .spin {
        position: absolute;
        display: inline-block; // background-color: rgba(253, 248, 248,0.0); 
        background-color: rgba(255, 255, 255, 0.8);
    }
}

.datePick_zone {
    background: #fff;
    margin-top: -10px;
    border: 1px solid #eee;
    padding: 20px 10px 20px 10px;
    font-size: 14px;
    -moz-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    -webkit-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
}

ul.ivu-page {
    float: right;
}

div.accountManager {
    background: #ececec;
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
}

div.opeartor {
    margin-bottom: 16px;
}

.editModal_form {
    p.editModal_head {
        text-align: left;
        color: #f60;
    }
    .cancel:hover {
        border: 1px solid orange;
        color: orange
    }

    div.editModal_content {
        .city_select {
            width: 201px;
        }
        .big_select {
            display: inline-block;
            width: 180px;
        }
        .small_select {
            display: inline-block;
            width: 180px;
            position: relative;
            left: 190px;
            top: -33px;
        }
        .price {
            margin-top: -30px;
            width: 280px;
        }
        .number {
            width: 280px;
        }
    }
}

div.demo-spin-col {
    width: 100%;
    min-height: 200px;
    position: relative;
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>
