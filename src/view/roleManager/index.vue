<template>
    <Row class="roleManager">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>角色管理</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
           <Col span="24">
             <span class="lable">角色名称：</span>
                <Input v-model="keyword" @on-change="inputChange" placeholder="角色名称" style="width: 300px;vertical-align:bottom;"></Input>
                <button class="DIY_button" @click="searchByName" style="font-weight: 400;">查询</button>
           </Col>
        </Row>
        <Row class="tableGrid">
            <Col class="opeartor">
                <Button type="warning" @click="handleAdd" style="font-size: 13px;">添加角色</Button>
            </Col>
            <Table :columns="columns"  :no-data-text='noDataText'  :data="data"></Table>
            <Spin fix size="large" v-if="spinShow"  class="spin">
                 <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                 <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin> 
            <Page :total="totalListNum" show-sizer show-elevator class="tableGrid_page" placement="top" :current='currentPage' v-show="pageShow"  @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </Row>
           <!-- 模态框区域 编辑数据 -->
            <Modal v-model="editModal" :mask-closable='close' width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" style="color: #404040;">
                    <span>编辑角色</span>
                </p>
                <div class="editModal_content">
                    <Form ref="editValidate" :model="editValidate" :rules="editValidateRule" :label-width="80">
                        <FormItem label="角色名称" prop="roleName">
                             <Input v-model="editValidate.roleName" placeholder="姓名\用户名" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="备注" prop="description">
                            <Input id='textArea' v-model="editValidate.description" placeholder="手机号\邮箱" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="菜单权限" prop="roleList">
                          <Tree class="roleList" :data="baseData" ref="editAuthTree" show-checkbox></Tree>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" @click="handleReset" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm" @click="editConfirm">确定</Button>
                </div>
            </Modal>
             <!-- 模态框区域 增加数据 -->
            <Modal v-model="addModal" :mask-closable='close' width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" style="color: #404040;">
                    <span>添加角色</span>
                </p>
                <div class="editModal_content">
                    <Form ref="addValidate" :model="addValidate" :rules="addValidateRule" :label-width="80">
                        <FormItem label="角色名称" prop="roleName">
                             <Input v-model="addValidate.roleName" @on-change="handleQuery" placeholder="不超过50个字符" style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="备注" prop="description">
                            <Input v-model="addValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="不超过200个字符"  style="width: 300px"></Input>
                        </FormItem>
                        <FormItem label="菜单权限" prop="roleList">
                          <Tree class="roleList" :data="baseData" ref="authTree" show-checkbox></Tree>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" style="margin-left: 8px" @click="closeAddModel">取消</Button>
                    <Button type="warning" class="confirm" @click="handleSubmit('addValidate')">确定</Button>
                </div>
            </Modal>
            <!-- 删除模态框 -->
            <Modal v-model="delModal" :mask-closable='close' :styles="{width: '500px', top: '20%'}" class="editModal_form">
                <p slot="header" style="color: #404040;">
                    <span>Warning</span>
                </p>
                <p style="color: #444; font-weight: bold; font-size: 16px; text-align:left;text-indent:55px; height: 50px; line-height: 50px;">确定删除吗？</p>
                <div slot="footer">
                    <Button class="cancel" @click="delModal = false" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm" @click="closeDelModal">确定</Button>
                </div>
            </Modal>
    </Row>
</template>
<script>
import $ from 'jquery'
export default {
    data() {
        return {
            deleteRow:'',
             close: false,
             editModal: false,
             addModal: false,
             delModal:false,
             delId: '',
             index:'',
             editId: '',
             noDataText: '',
             spinShow: false,
             baseData: [{
                  expand: true,
                  title: '数据运营平台',
                  checked: false,
                  name: 0,
                  children: [{
                      title: '订单数据',
                      name: 20,
                      expand: false,
                      checked: false,
                      children: [{
                          title: '整体数据',
                          name: 21,
                          checked: false
                      }, {
                          title: '分日期分地区',
                          name: 22,
                          checked: false
                      }, {
                          title: '订单状态构成',
                          name: 23,
                          checked: false
                      }, {
                          title: '24小时趋势',
                          name: 24,
                          checked: false
                      }, {
                          title: '订单时长分布',
                          name: 25,
                          checked: false
                      }, {
                          title: '订单里程分布',
                          name: 26,
                          checked: false
                      }, {
                          title: '使用频次分布',
                          name: 27,
                          checked: false
                      }]
                  },{
                      title: '用户数据',
                      name: 30,
                      expand: false,
                      checked: false,
                      children: [{
                          title: '整体数据',
                          name: 31,
                          checked: false
                      }, {
                          title: '分日期分地区',
                          name: 32,
                          checked: false
                      }, {
                          title: '新用户',
                          name: 33,
                          checked: false
                      }, {
                          title: '活跃用户',
                          name: 34,
                          checked: false
                      }]
                  }, {
                      title: '个人中心',
                      name: 70,
                      checked: false
                  }, {
                      title: '账号管理',
                      name: 80,
                      checked: false,
                  }, {
                      title: '角色管理',
                      name: 90,
                      checked: false,
                  }, {
                      title: '城市经营分析',
                      checked: false,
                      name: 100,
                      children: [{
                        title: '整体数据',
                        checked: false,
                        name: 101,
                      }, {
                        title: '我管理的数据',
                        name: 102,
                        checked: false,
                      }]
                  }]
              }],
            editValidate: {
                roleName: '',
                description:''
            },
            editValidateRule: {
                roleName: [
                    { required: true, type: 'string', message: '请输入用户名', trigger: 'change' }
                ],
                description: [
                    { type: 'string', max: 200, message: '备注最长不能超过200个字符哦~', trigger: 'blur'}
                ]
            },
            addValidate: {
                roleName: '',
                description:''
            },
            addValidateRule: {
                roleName: [
                    { required: true, type: 'string', message: '请输入用户名', trigger: 'change' }
                ],
                description: [
                    { type: 'string', max: 200, message: '备注最长不能超过200个字符哦~', trigger: 'blur'}
                ]
            },
            initRowData:{},
            keyword:'',
            phone:'',
            columns: [
                {
                    title: '角色名称',
                    key: 'roleName'
                },
                {
                    title: '备注',
                    key: 'description'
                },
                {
                    title: '包含用户',
                    key: 'userList'
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
                                        this.handleDelete(params)
                                    }
                                }
                            })
                        ]);
                    }
                }

            ],
            data: [],
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            pageShow: false,
            isSearch: false
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/roleManager')
        this.loadData()
    },
    methods: {
        loadData () {
            this.currentPage = 1
            this.spinShow = true
            this.noDataText = ''
            this.axios.get('/beefly/role/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token
                }
            })
            .then((res) => {
                // 判断返回状态
                this.checkLogin(res)
                this.data = res.data.data
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'
                if (res.data.totalPage < 2 && this.pageSize === 10) {
                    this.pageShow = false
                } else {
                    this.pageShow = true
                }
                this.totalListNum = res.data.totalItems
            })
            .catch((err) => {
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        show (params) {
            /*显示弹窗*/
            this.editModal = true
            this.editValidate = params.row
            this.editId = params.row.id
            var menuStr = params.row.menuStr
            // console.log('menuStr',menuStr )
            // console.log('checkList',this.baseData )
            var that = this
            setTimeout(function () {
                that.baseData.map ( item => {
                    for (var i = 0; i < item.children.length; i++) {
                        if (menuStr.indexOf(item.children[i].name) != -1) {
                            item.children[i].checked = true
                        }
                        if (item.children[i].children != 'undefined') {
                            if (item.children[i].children instanceof Array === true) {
                                item.children[i].children.map(list => {
                                    if (menuStr.indexOf(list.name) != -1) {
                                        list.checked = true
                                    }
                                })
                            }

                        }
                    }
                })
            }, 200)
            
        },
        handleReset(){
            /*重置编辑表单*/
            this.clearTree()
            // this.$refs.editValidate.resetFields();
            this.loadData()
            this.editModal = false

        },
        inputChange () {
            if (this.keyword === '') {
                this.isSearch = false
                this.loadData()
            }
        },
        editConfirm () {
            this.$refs.editValidate.validate((valid) => {
                if (valid) {
                    // 抓取编辑状态的节点
                    var auth = this.$refs.editAuthTree.getCheckedNodes()
                    var arr = []
                    auth.map( (item) => {
                        arr.push(item.name)
                        return arr
                    })
                    this.axios.get('/beefly/role/api/v1/update', {
                        params: {
                            accessToken: this.$store.state.token,
                            menuStr: arr.toString(),
                            roleName: this.editValidate.roleName,
                            description: this.editValidate.description,
                            id: this.editId
                        }
                    })
                    .then((res) => {
                        // 判断返回状态
                        this.checkLogin(res)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('修改成功!');
                            // 关闭弹窗，关闭添加表单
                            this.editModal = false
                            this.clearTree()
                            this.loadData()
                            this.$refs.editValidate.resetFields();
                            
                        } else {
                            var message = res.data.message
                            this.$Message.error(message);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })
        },
        // handleSubmit(){
        //     /*提交表单 修改数据*/
        //     this.data.splice(this.index,1,this.editValidate)
        //     this.editModal = false
        // },
        handleDelete(params){
          this.deleteRow = params
          if(this.deleteRow.row.userList.length>0){
              this.$Message.error('该角色下有用户，不可删除！');
          }else{
                /*删除Row 数据 根据index 序列号*/
                this.index = params.index;
                this.delId = params.row.id
                this.delModal = true
          }
          return;
        
          //this.data.splice(index,1)  
        },
        closeDelModal(){
          
            this.axios.get('/beefly/role/api/v1/delete', {
                params: {
                    accessToken: this.$store.state.token,
                    id: this.delId
                }
            })
            .then((res) => {
                // 判断返回状态
                this.checkLogin(res)
                if (res.data.resultCode === 1) {
                    this.$Message.success('删除成功!');
                    this.currentPage = 1
                    this.data.splice(this.index,1)
                    this.loadData()
                    this.delModal = false;
                } else {
                    this.delModal = false;
                    let message = res.data.message
                    this.$Message.error(message);
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        handleAdd(){
            /*增加数据*/
            this.addModal = true
            //this.data.unshift(this.editValidate)
        },
        handleCurrentPage(currentPage) {
            this.spinShow = true
            this.noDataText = ''

            this.currentPage = currentPage
            this.axios.get('/beefly/role/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    keyword: this.isSearch === false?'':this.keyword,
                    pageNo: currentPage,
                    pageSize: this.pageSize
                }
            })
            .then((res) => {
                // 判断返回状态
                this.checkLogin(res)
                this.data = res.data.data
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'

                if (res.data.totalPage < 2 && this.pageSize === 10) {
                    this.pageShow = false
                } else {
                    this.pageShow = true
                }

                this.totalListNum = res.data.totalItems
            })
            .catch((err) => {
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        handlePageSize(pageSize) {
            this.spinShow = true
            this.noDataText = ''

            this.pageSize = pageSize
            this.axios.get('/beefly/role/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    keyword: this.isSearch === false?'':this.keyword,
                    pageNo: this.currentPage,
                    pageSize: pageSize
                }
            })
            .then((res) => {
                // 判断返回状态
                this.checkLogin(res)
                this.data = res.data.data
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'

                if (res.data.totalPage < 2 && this.pageSize === 10) {
                    this.pageShow = false
                } else {
                    this.pageShow = true
                }

                this.totalListNum = res.data.totalItems
            })
            .catch((err) => {
                // 关闭Loading
                this.spinShow = false
                this.noDataText = '暂无数据'
                console.log(err)
            })
        },
        handleQuery(e){
            // console.log(this.value)
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 抓取编辑状态的节点
                    var auth = this.$refs.authTree.getCheckedNodes()
                    var arr = []
                    auth.map( (item) => {
                        arr.push(item.name)
                        return arr
                    })
                    this.axios.get('/beefly/role/api/v1/add', {
                        params: {
                            accessToken: this.$store.state.token,
                            menuStr: arr.toString(),
                            roleName: this.addValidate.roleName,
                            description: this.addValidate.description
                        }
                    })
                    .then((res) => {
                        // 判断返回状态
                        this.checkLogin(res)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('添加成功!');
                            // 关闭弹窗，关闭添加表单
                            this.addModal = false
                            this.clearTree()
                            this.loadData()
                            this.$refs[name].resetFields();
                            
                        } else {
                            var message = res.data.message
                            this.$Message.error(message);
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })

        },
        closeAddModel () {
           this.addModal = false
           this.$refs.addValidate.resetFields();
           this.loadData()
           this.clearTree()
        },
        clearTree () {
            //   将权限树的选中状态取消。
           for (var i = 0; i < this.baseData.length; i++) {
               this.baseData[i].checked = false
               this.baseData[i].children.map((item) => {
                   if (item.children != null) {
                        item.checked = false
                       item.children.map(item => {
                           item.checked = false
                       }) 
                   } else {    
                        item.checked = false
                   }
               })
           }
        },
        searchByName () {
            this.isSearch = true
            this.currentPage = 1
            if (this.keyword === '') {    
                this.$Message.warning('请输入要查询的角色名称！');
            } else {
                this.axios.get('/beefly/role/api/v1/page', {
                    params: {
                        accessToken: this.$store.state.token,
                        keyword: this.keyword
                    }
                })
                .then((res) => {
                    this.checkLogin(res)
                    this.data = res.data.data
                    if (res.data.totalPage < 2 && this.pageSize === 10) {
                        this.pageShow = false
                    } else {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        },
        mockTableDatas(){
            var arr = [];
            for(var i=0;i<10;i++){
                arr.push({
                    roleName: 'jack' + i,
                    description: '18812341234',
                    content_user: 'zhouyu'
                })
            }
            return arr;
        },
        checkLogin (res) {
            if (res.message === '用户登录超时') {
                this.$router.push('/login')
            }
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
        display: inline-block;
        // background-color: rgba(253, 248, 248,0.0); 
        background-color: rgba(255, 255, 255, 0.8); 
    }
}
.datePick_zone {
    background: #fff;
    margin-top: -10px;
    border: 1px solid #eee;
    padding: 20px 10px 20px 10px;
    font-size: 13px;
    -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
    -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    button {
        font-weight: bolder;
        display: inline-block;
        margin-left: 30px;
    }
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
            .roleList {    
              border: 1px solid #dddee1;
              width: 300px;
              border-radius: 4px;
              padding-left: 10px;
            }
        }
    }
 
</style>
