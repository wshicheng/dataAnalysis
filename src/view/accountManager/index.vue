<template>
    <Row class="accountManager">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>账号管理</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
            <Col span="7">
            <span class="lable">关键字：</span>
            <Input v-model="userName" @on-change="handleQuery" placeholder="姓名\用户名" style="width: 160px"></Input>
            </Col>
            <Col span="7">
            <span class="lable">关键字：</span>
            <Input v-model="phone" @on-change="handleQuery" placeholder="手机号\邮箱" style="width: 160px"></Input>
            </Col>
            <Button class="search" @click="query">查询</Button>

        </Row>
        <Row class="tableGrid">
            <Col class="opeartor">
            <Button type="warning" @click="handleAdd">添加账号</Button>
            </Col>
            <Table :columns="columns" :data="data"></Table>
            <Page :total="totalListNum" class="tableGrid_page" placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </Row>
        <!-- 模态框区域 编辑数据 -->
        <Modal v-model="editModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" style="color: #404040;">
                <span>编辑账号</span>
            </p>
            <div class="editModal_content">
                 <Form ref="editValidate" :model="editValidate" :rules="editValidate" :label-width="100">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="editValidate.username" style="width:300px;" placeholder="不超过100个字符"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="editValidate.password" style="width:300px;" placeholder="6-20位字符，可包括字母和数字，区分大小写"></Input>
                    </FormItem>
                    <FormItem label="所属角色" prop="role">
                        <Select style="width:300px;" @on-change="handleSelect" v-model="editValidate.role" :value="editValidate.role" placeholder="请选择所属角色">
                            <Option value="角色1">角色1</Option>
                            <Option value="角色11">角色11</Option>
                            <Option value="角色1123">角色1123</Option>
                        </Select>
                       
                    </FormItem>
                    <FormItem label="可查看地区" prop="area">
                        <div>
                            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                        </div>
                        <CheckboxGroup v-model="editValidate.area" @on-change="checkAllGroupChange">
                            <Checkbox label="地区1"></Checkbox>
                            <Checkbox label="地区2"></Checkbox>
                            <Checkbox label="地区3"></Checkbox>
                            <Checkbox label="地区4"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="editValidate.name" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="tel">
                        <Input v-model="editValidate.tel" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="editValidate.email" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>

                    <FormItem label="备注" prop="desc">
                        <Input v-model="editValidate.desc" style="width:300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <!-- <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                </FormItem> -->
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset('editValidate')" style="margin-left: 8px">重置</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('editValidate')">提交</Button>

            </div>
        </Modal>
        <!-- 模态框区域 增加数据 -->
        <Modal v-model="addModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
            <p slot="header" class="editModal_head" style="color: #404040;">
                <span>添加账号</span>
            </p>
            <div class="editModal_content">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="用户名" prop="username">
                        <Input v-model="formValidate.username" style="width:300px;" placeholder="不超过100个字符"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="password">
                        <Input v-model="formValidate.password" style="width:300px;" placeholder="6-20位字符，可包括字母和数字，区分大小写"></Input>
                    </FormItem>
                    <FormItem label="所属角色" prop="role">
                        <Select style="width:300px;" v-model="formValidate.role"  placeholder="请选择所属角色">
                            <Option value="角色1">角色1</Option>
                            <Option value="角色11">角色11</Option>
                            <Option value="角色1123">角色1123</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="可查看地区" prop="area">
                        <div>
                            <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                        </div>
                        <CheckboxGroup v-model="formValidate.area" @on-change="checkAllGroupChange">
                            <Checkbox label="地区1"></Checkbox>
                            <Checkbox label="地区2"></Checkbox>
                            <Checkbox label="地区3"></Checkbox>
                            <Checkbox label="地区4"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="tel">
                        <Input v-model="formValidate.tel" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                        <Input v-model="formValidate.email" style="width:300px;" placeholder="不超过50个字符"></Input>
                    </FormItem>

                    <FormItem label="备注" prop="desc">
                        <Input v-model="formValidate.desc" style="width:300px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <!-- <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                </FormItem> -->
                </Form>
            </div>
            <div slot="footer">
                <Button class="cancel" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                <Button type="warning" class="confirm" @click="handleSubmit('formValidate')">提交</Button>
            </div>
        </Modal>
        <!-- 删除模态框 -->
        <Modal v-model="delModal" :styles="{width: '500px', top: '20%'}" class="editModal_form">
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

export default {
    data() {
        return {
            indeterminate: false,
            checkAll: false,
            editModal: false,
            addModal: false,
            delModal: false,
            myvalue:'',
            index: '',
            editValidate: {
                username: '',
                password: '',
                role: '',
                area: [],
                name: '',
                tel: '',
                email: '',
                desc: ''
            },
            editValidateRule: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                area: [
                    { required: false, type: 'array', min: 1, message: '至少选择一个地区', trigger: 'change' },
                   
                ],
                name: [
                    { required: false, message: '姓名不能为空', trigger: 'blur' }
                ],
                tel: [
                    { required: false, message: '手机号不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: false, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                desc: [
                    { required: false, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            },
            formValidate: {
                username: '',
                password: '',
                role: '',
                area: [],
                name: '',
                tel: '',
                email: '',
                desc: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                area: [
                    { required: false, type: 'array', min: 1, message: '至少选择一个地区', trigger: 'change' },
                   
                ],
                name: [
                    { required: false, message: '姓名不能为空', trigger: 'blur' }
                ],
                tel: [
                    { required: false, message: '手机号不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: false, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                desc: [
                    { required: false, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            },
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
                                cursor: 'pointer'
                            },
                            attrs: {
                                blank: '_blank',
                                href: '/#/index/accountManger/userName/' + params.row.userName
                            }
                        }, params.row.userName)
                    }
                },
                {
                    title: '手机号',
                    key: 'phoneNum'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '角色',
                    key: 'role'
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
                                background: 'rgb(44, 228, 119)',
                                cursor: 'pointer'
                            },
                            attrs: {
                                class: 'active'
                            },
                            on: {
                                click: (e) => {
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
                                }, '开'),
                                h('span', {
                                    style: {
                                        width: '50%',
                                        height: '24px',
                                        float: 'right',
                                        lineHeight: '24px',
                                        textAlign: 'center'
                                    }
                                }, '关'),
                                h('span', {
                                    style: {
                                        width: '22px',
                                        height: '22px',
                                        display: 'block',
                                        position: 'absolute',
                                        transition: 'all linear .2s',
                                        right: '1px',
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
                            h('Icon', {
                                props: {
                                    type: 'android-create'
                                },
                                style: {
                                    marginRight: '20px',
                                    display: 'blcok',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                nativeOn: {
                                    click: () => {
                                        this.show(params)
                                    }
                                }
                            }),
                            h('Icon', {
                                props: {
                                    type: 'close-round'
                                },
                                style: {
                                    display: 'blcok',
                                    fontSize: '18px',
                                    cursor: 'pointer'
                                },
                                nativeOn: {
                                    click: () => {
                                        this.handleDelete(params.index)
                                    }
                                }
                            })
                        ]);
                    }
                }

            ],
            data: this.mockTableDatas(),
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 20,
            currentPage: 1,
        }
    },
    methods: {
         handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.formValidate.area = ['地区1', '地区2', '地区3','地区4'];
                } else {
                    this.formValidate.area = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 4) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = false;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
        show(params) {
            /*显示弹窗*/
            this.editModal = true
            console.log(params)
            this.editValidate.username = params.row.userName
            this.editValidate.name = params.row.name
            this.editValidate.status = params.row.status
            this.editValidate.tel = params.row.phoneNum
            this.editValidate.role = params.row.role
            this.editValidate.password = params.row.password
            this.index = params.index
            $('span.ivu-select-selected-value').text(params.row.role)
        },
        handleSelect(value){
            $('span.ivu-select-selected-value').text(value)
        },
        handleSubmit(name) {
            console.log('aaa')
            if (name === 'formValidate') {
                // 增加数据
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        console.log(this.formValidate)

                        this.data.unshift({
                            userName: this.formValidate.username,
                            phoneNum: this.formValidate.tel,
                            name: this.formValidate.name,
                            role: this.formValidate.role,
                            status: 0
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }else{
                //修改数据
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('修改成功!');
                        console.log(this.editValidate)
                        this.data.splice(this.index,1,{
                            userName: this.editValidate.username,
                            phoneNum: this.editValidate.tel,
                            name: this.editValidate.name,
                            role: this.editValidate.role,
                            status: 0
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
           
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleDelete(index) {
            /*删除Row 数据 根据index 序列号*/
            this.index = index;
            this.delModal = true
            //this.data.splice(index,1)  
        },
        closeDelModal() {
            this.data.splice(this.index, 1)
            this.delModal = false
        },
        handleAdd() {
            /*增加数据*/
            this.addModal = true

            //this.data.unshift(this.editValidate)
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            // 页面编号发请求
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize
            // 页面size 变化 发请求
        },
        handleQuery(e) {
            var name = this.userName;
            var phone = this.phone
            // 发起查询请求 
            if (name.length === 0 && phone.length === 0) {
                console.log('查询条件为空，执行初始化查询')
            }

        },
        query() {
            var name = this.userName;
            var phone = this.phone
            // 发起查询请求
            console.log('发起查询请求')
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
        margin-right: -10px;
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
    button.search {
        outline: none; // border: 1px solid rgb(121, 121, 121);
        border: 1px solid #ff9900; // background: #797979;
        background: #ff9900;
        color: #fff;
    }
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
</style>
