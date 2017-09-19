<template>
    <Row class="roleManager">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>角色管理</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
           <Col span="10">
             <span class="lable">角色名称：</span>
                <Input v-model="userName" @on-change="handleQuery" placeholder="姓名\用户名" style="width: 300px"></Input>
           </Col>
            
        </Row>
        <Row class="tableGrid">
            <Col class="opeartor">
                <Button type="warning" @click="handleAdd">添加角色</Button>
            </Col>
            <Table :columns="columns" :data="data"></Table>
            <Page :total="totalListNum" class="tableGrid_page" placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </Row>
           <!-- 模态框区域 编辑数据 -->
            <Modal v-model="editModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>编辑账号</span>
                </p>
                <div class="editModal_content">
                    <Form ref="editValidate" :model="editValidate" :rules="editValidateRule" :label-width="80">
                        <FormItem label="角色名称" prop="roleName">
                             <Input v-model="editValidate.roleName" @on-change="handleQuery" placeholder="姓名\用户名" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="备注" prop="role_remark">
                            <Input v-model="editValidate.role_remark" @on-change="handleQuery" placeholder="手机号\邮箱" style="width: 300px"></Input>
                        </FormItem>
                         <FormItem label="包含用户" prop="content_user">
                            <Input v-model="editValidate.content_user" @on-change="handleQuery" placeholder="姓名" style="width: 300px"></Input>
                        </FormItem>
                         <FormItem label="角色" prop="role">
                            <Input v-model="editValidate.role"  placeholder="角色" style="width: 300px"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" @click="handleReset" style="margin-left: 8px">重置</Button>
                    <Button type="warning" class="confirm" @click="handleSubmit">提交</Button>
                </div>
            </Modal>
             <!-- 模态框区域 增加数据 -->
            <Modal v-model="addModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>添加账号</span>
                </p>
                <div class="editModal_content">
                    <Form ref="addValidate" :model="addValidate" :rules="addValidateRule" :label-width="80">
                        <FormItem label="用户名" prop="userName">
                             <Input v-model="addValidate.userName" @on-change="handleQuery" placeholder="不超过100个字符" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="密码" prop="password">
                             <Input type="password" v-model="addValidate.password" @on-change="handleQuery" placeholder="6-20位字符，可包括字母和数字、区分大小写" style="width: 300px"></Input>
                        </FormItem>
                         <FormItem label="所属角色" prop="role">
                             <Input type="password" v-model="addValidate.role" @on-change="handleQuery" placeholder="请填写角色" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="可查看地区" prop="area">
                            <Input v-model="addValidate.area" @on-change="handleQuery" placeholder="地区" style="width: 300px"></Input>
                        </FormItem>
                         <FormItem label="姓名" prop="name">
                            <Input v-model="addValidate.name" @on-change="handleQuery" placeholder="姓名" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="手机号" prop="phoneNum">
                            <Input v-model="addValidate.phoneNum" @on-change="handleQuery" placeholder="手机号\邮箱" style="width: 300px"></Input>
                        </FormItem>
                         <FormItem label="邮箱" prop="email">
                            <Input v-model="addValidate.role"  placeholder="角色" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="备注" prop="description">
                            <Input v-model="addValidate.description"  placeholder="备注" style="width: 300px"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" style="margin-left: 8px">重置</Button>
                    <Button type="warning" class="confirm">提交</Button>
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
             editModal: false,
             addModal: false,
             delModal:false,
             index:'',
             editValidate: {
                userName: '',
                phoneNum: '',
                name: '',
                role: '',
                status: ''
            },
             editValidateRule: {
                userName: [
                    { required: true, type: 'string', message: '请输入用户名', trigger: 'change' }
                ],
                phoneNum: [
                    { required: true, message: '请填写手机号', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur'}
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'blur'}
                ]
            },
            addValidate: {
                userName: '',
                password:'',
                role:'',
                area:'',
                name: '',
                phoneNum: '',
                email:'',
                description:''
            },
             addValidateRule: {
                userName: [
                    { required: true, type: 'string', message: '请输入用户名', trigger: 'change' }
                ],
                password: [
                    { required: true, type: 'string', message: '请输入密码', trigger: 'change' }
                ],
                 role: [
                    { required: true, type: 'string', message: '请输入角色', trigger: 'change' }
                ],
                 password: [
                    { required: true, type: 'string', message: '请输入密码', trigger: 'change' }
                ],
                phoneNum: [
                    { required: true, message: '请填写手机号', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur'}
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'blur'}
                ]
            },
            initRowData:{},
            userName:'',
            phone:'',
            columns: [
                {
                    title: '角色名称',
                    key: 'roleName'
                },
                {
                    title: '备注',
                    key: 'role_remark'
                },
                {
                    title: '包含用户',
                    key: 'content_user'
                },
                {
                    title:'操作',
                    key:'action',
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
        show (params) {
            /*显示弹窗*/
            this.editModal = true
            console.log(params)
            this.initRowData = Object.assign({},params.row)
            this.editValidate = params.row
            this.index = params.index
        },
        handleReset(){
            /*重置编辑表单*/
            console.log(this.initRowData)
            this.data = this.initRowData
            this.$refs.editValidate.resetFields();
            this.editModal = false
        },
        handleSubmit(){
            /*提交表单 修改数据*/
            this.data.splice(this.index,1,this.editValidate)
            this.editModal = false
        },
        handleDelete(index){
          /*删除Row 数据 根据index 序列号*/
          this.index = index;
          this.delModal = true
          //this.data.splice(index,1)  
        },
        closeDelModal(){
            this.data.splice(this.index,1) 
             this.delModal = false
        },
        handleAdd(){
            /*增加数据*/
            this.addModal = true
            //this.data.unshift(this.editValidate)
        },
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize
        },
        handleQuery(e){
            console.log(this.value)
        },
        mockTableDatas(){
            var arr = [];
            for(var i=0;i<10;i++){
                arr.push({
                    roleName: 'jack' + i,
                    role_remark: '18812341234',
                    content_user: 'zhouyu'
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
    -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
    -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
}

ul.ivu-page {
    float: right;
}

div.roleManager {
    background: #ececec;
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
}
div.opeartor{margin-bottom:16px;}
 .editModal_form {
        p.editModal_head {
            text-align: left;
            color: #f60;
        }
        .cancel:hover{border:1px solid orange;color:orange}

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
                width:280px;
            }
            .number { 
                width:280px;
            }
        }
    }
 
</style>
