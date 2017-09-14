<template>
    <div id="cityManagerData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>我管理的数据</BreadcrumbItem>
        </Breadcrumb>
        <div id="cityManagerData_head">
            <div class="cityManageData_month">
                <div id="demo"></div>
                <span>月份:</span>
                <DatePicker type="month" v-model='selectTime' :options='options' placeholder="选择日期" format='yyyy-MM' style="width: 216px"></DatePicker>
            </div>
            <city-select></city-select>
            <div class="cityManageData_type">
                <span>类别:</span>
                <button class="active" @click='handleClick'>固定资产</button>
                <button  class="active" @click='handleClick'>运维费用</button>
            </div>
        </div>

        <div id="cityManage_table">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                 <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                 <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin> 
            <Button type="warning" @click="exportModal = true">导入数据</Button>
            <Button class="cancel" @click="delTableByGroup">删除</Button>
            <span>*每月10号后，不可编辑和删除上月数据</span>
                        
            <Table :row-class-name="rowClassName" :no-data-text='noDataText' class="cityManage_table" border size='small' :columns="columns4" :data="data1" @on-select="selectGroup" @on-select-all="selectAll" @on-selection-change="selectChange">                
            </Table>
            <Page :total="totalListNum" show-sizer show-elevator :styles='page' :current='current' placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>

            <!-- 模态框区域 -->
            <Modal v-model="editModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>编辑我的数据</span>
                </p>
                <div class="editModal_content">
                    <Form ref="editValidate" :model="editValidate" :rules="editValidateRule" :label-width="80">
                        <FormItem label="月份" prop="dataMonth">
                            <DatePicker v-model="editValidate.dataMonth" type="month" :options='options' format='yyyy-MM' style=" width:216px;" :placeholder="editMonth"></DatePicker>
                        </FormItem>
                        <FormItem label="城市" prop="city">
                            <Select class="city_select" v-model="editValidate.city" :placeholder="editArea">
                                <Option v-for="item in $store.state.keepCitys" :value="item.name" :key="item.code">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="类别">
                            <FormItem prop='bigKind'>
                                <Select class="big_select" v-model="editValidate.bigKind" :placeholder="editBigType">
                                    <Option v-for="item in bigList" :value="item.name" :key="item.index">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop='smallKind'>
                                <Select class="small_select" v-show="smallList_one_show" v-model="editValidate.smallKind" :placeholder="editSmallType">
                                    <Option v-for="item in smallList_one" :value="item.name" :key="item.index">{{ item.name }}</Option>
                                </Select>
                                <Select class="small_select" v-show="smallList_two_show" v-model="editValidate.smallKind"  :placeholder="editSmallType2">
                                    <Option v-for="item in smallList_two" :value="item.name" :key="item.index">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                        </FormItem>
                        <FormItem label="单价" class="price" prop="unitPrice">
                            <Input v-model.number="editValidate.unitPrice" placeholder="请输入单价"></Input>
                        </FormItem>
                        <FormItem label="数量" class="number" prop="number" v-show="numberShow">
                            <Input v-model.number="editValidate.number" placeholder="请输入数量"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" @click="handleReset('editValidate')" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm" @click="handleSubmit('editValidate')">确认</Button>
                </div>
            </Modal>

            <!-- 导入模态框 -->
            <Modal v-model="exportModal" width="800px" :styles="{width: '600px', top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>导入数据</span>
                </p>
                <div class="managerData_upload_month">
                    <span>月份:</span>
                    <DatePicker type="month" v-model='exportMonth' :options='options' class="DatePicker" placeholder="选择日期" style="width: 216px;"></DatePicker>
                </div>
                <div class="managerData_upload_uploadFile">
                    <span>选择文件:</span>
                    <input id='fileupload' class="upload" type="file" @change="importExcel($event.target)" placeholder="" >
                </div>
                <div class="managerData_upload_download">
                    <span>*请选择xls、xlsx格式文件</span>
                    <span @click="downloadExl">模板下载</span>
                    <a href="" download="这里是下载的文件名.xlsx" id="hf"></a>
                </div>
                <Progress class="my_page" :percent="uploadPercent" v-show="isUploadPercent" status="active"></Progress>
                <div slot="footer">
                    <Button class="cancel" @click="exportModal = false" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm" @click="confirmExport">确认</Button>
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
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/css">

    #cityManagerData_body {
    width: 100%; // border: 1px solid #dddee1;
    background: #ececec;
    border-radius: 4px;
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
}

#cityManagerData_head {
    -moz-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    -webkit-box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
    display: block; // width: 79%;
    // position: fixed;
    // right: 2.3%;
    // top: 12%;
    z-index: 10;
    font-size: 14px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #eee;
    padding: 10px 10px 0px 10px;
    .cityManageData_month {
        span:nth-of-type(1) {
            margin-right: 10px;
        }
        margin-bottom: 10px;
    }
    .cityManageData_area span {
        width: 70px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        display: inline-block;
        border: 1px solid #dddee1;
        border-radius: 4px;
        text-align: center;
        margin: 0 5px 10px 5px;
    }
    .cityManageData_area span:nth-of-type(1) {
        border: none;
        margin: 0;
        float: left;
        text-align: left;
        width: 3%;
        padding: 0;
    } // .cityManageData_area span:nth-of-type(1):active {
    //     color: #f60;
    // }
    .cityManageData_area div.cityManageData_area_span span:nth-of-type(1) {
        width: 70px;
        margin-left: 4px;
        margin-right: 9px;
        text-align: center;
        padding: 0 3px 0 3px;
    }
    .cityManageData_area div.cityManageData_area_span {
        span.active {
            background: orange;
            color: #fff;
            border: 1px solid #fff;
            transition: all .1s linear 0s;
        }
    }
    .cityManageData_area div {
        max-width: 97%;
        float: left;
    }
    .cityManageData_type button {
        width: 80px;
        height: 30px;
        line-height: 30px;
        outline: none;
        background: #fff;
        display: inline-block;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #565c6b;
        text-align: center;
        margin: 0 5px 10px 5px;
        cursor: pointer;
    }
    .cityManageData_type button.active {
        color: orange;
        border: 1px solid orange;
    }
    .cityManageData_type span:nth-of-type(1) {
        border: none;
        margin: 0;
        float: left;
        text-align: left;
        width: 40px;
        line-height: 30px;
        padding: 0;
    }
}

#cityManage_table {
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #fff;
    box-sizing: border-box;
    padding: 20px 10px 20px 10px; // margin-top: 274px;
    margin-top: 20px;
    .spin {
        position: absolute;
        display: inline-block;
        // background-color: rgba(253, 248, 248,0.0); 
        background-color: rgba(255, 255, 255, 0.8); 
    }
    button:nth-of-type(1) {
        margin-right: 10px;
    }
    span:nth-of-type(1) {
        float: right;
        color: #ccc;
        font-size: 13px;
        line-height: 50px;
    }
    .cityManage_table {
        margin-top: 20px;
    }
}

div.ivu-modal {
    width: 900px;
}

.editModal_form {
    div.managerData_upload_month {
        span:nth-of-type(1) {
            font-size: 14px;
            float: left;
            width: 58px;
            text-align: right;
            margin-top: 20px;
            margin-right: 17px;
        }
        .DatePicker {
            margin-top: 14px;
        }
    }
    div.managerData_upload_uploadFile {
        margin-top: 20px;
        span:nth-of-type(1) {
            font-size: 14px;
            float: left;
            line-height: 10px;
            margin-right: 16px;
            margin-top: 10px;
        }
        .upload {
            display: inline-block;
            width: 216px;
            height: 32px;
            line-height: 1.5;
            outline: none;
            padding: 4px 7px;
            font-size: 12px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            color: #495060;
            background-color: #fff;
            background-image: none;
            position: relative;
            cursor: text;
            transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
    }
    div.managerData_upload_download {
        font-size: 13px;
        span:nth-of-type(1) {
            display: inline-block;
            margin-left: 76px;
            margin-top: 10px;
            color: #888;
        }
        span:nth-of-type(2) {
            display: inline-block;
            margin-left: 14px;
            cursor: pointer;
            text-decoration: underline;
        }
    }
    p.editModal_head {
        text-align: left;
        color: #404040;
    }
    div.editModal_content {
        .city_select {
            width: 216px;
        }
        .big_select {
            display: inline-block;
            width: 216px;
        }
        .small_select {
            display: inline-block;
            width: 216px;
            position: relative;
            left: 225px;
            top: -33px;
        }
        .price {
            margin-top: -30px;
            width: 296px;
        }
        .number {
            width: 296px;
        }
    }
}

.cancel:hover {
    border: 1px solid orange;
    color: orange;
}


</style>

<script>
import $ from 'jquery'
import citySelect from '../../../components/citySelect.vue'
import { siblings } from '../../../util/util.js'
import moment from 'moment'
export default {
    components: {
        "city-select": citySelect
    },
    data() {
        return {
            listChose: [],
            smallList_one: [
                {
                    name: '车辆',
                    index: 0
                }, {
                    name: '电池',
                    index: 1
                }, {
                    name: '充电站建设',
                    index: 2
                }, {
                    name: '充电站电柜',
                    index: 3
                }, {
                    name: '机动车',
                    index: 4
                }, {
                    name: '物流成本',
                    index: 5
                }, {
                    name: '办公成本',
                    index: 6
                }, {
                    name: '运维工具车',
                    index: 7
                }, {
                    name: '其他',
                    index: 8
                }
            ],
            smallList_two: [
                {
                    name: '人员成本',
                    index: 0
                }, {
                    name: '经营费用',
                    index: 1
                }, {
                    name: '开城费用',
                    index: 2
                }, {
                    name: '房租(生产)',
                    index: 3
                }, {
                    name: '水电(生产)',
                    index: 4
                }
            ],
            bigList: [
                {
                    name: '固定资产',
                    index: 0
                }, {
                    name: '运维费用',
                    index: 1
                }
            ],
            smallList_one_show: true,
            smallList_two_show: false,
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            editValidate: {
                dataMonth: '',
                city: '',
                bigKind: '',
                type: '',
                smallKind: '',
                unitPrice: '',
                number: '',
                id: ''
            },
            editMonth: '',
            editArea: '',
            editBigType: '',
            editSmallType: '请选择小类',
            editSmallType2: '',
            editValidateRule: {
                month: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
                area: [
                    { required: true, message: '请选择地区', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择大类', trigger: 'blur' }
                ],
                bigType: [
                    { required: true, message: '请选择大类', trigger: 'blur' }
                ],
                smallType: [
                    { required: true, message: '请选择小类', trigger: 'blur' }
                ],
                price: [
                    { required: true, type: 'number', message: '请输入单价', trigger: 'blur' }
                ],
                num: [
                    { required: true, type: 'number', message: '请输入数量', trigger: 'blur' }
                ]
            },
            columns4: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '月份',
                    key: 'dataMonth'
                },
                {
                    title: '地区',
                    key: 'city'
                },
                {
                    title: '大类/小类',
                    key: 'type'
                },
                {
                    title: '数量',
                    key: 'number'
                },
                {
                    title: '单价',
                    key: 'unitPrice'
                },
                {
                    title: '操作',
                    key: 'del',
                    width: 150,
                    align: 'center',
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
                                        this.show(params.index, params.row)
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
                                        this.remove(params.index, params.row)
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            data1: [],
            modal1: false,
            file: null,
            loadingStatus: false,
            exportModal: false,
            uploadPercent: 0,
            isUploadPercent: false,
            editModal: false,
            delModal: false,
            delIndex: '',
            delId: '',
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            current: 1,
            options: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now()
                }
            },
            checkList: [],
            selectTime: '',
            exportMonth: '',
            exportedData: '',
            numberShow: true,
            spinShow: true,
            noDataText: '',
            typeList: ['固定资产','运维费用']
        }
    },
    mounted() {
        this.$store.dispatch('menuActiveName', '/index/managerData')
        document.title = '数据运营平台 - 我管理的数据'
        this.loadData()
    },
    methods: {
        rowClassName (row, index) {
            if (row.status === 0) {
                return '';
            } else {
                return 'demo-table-error-row';
            }
            return '';
        },
        loadData() {
            // loading显示，同时让无数据的文本为空
            this.spinShow = true
            this.noDataText = ''
            var that = this
            this.current = 1
            this.axios.get('/beefly/baseData/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    time: this.selectTime === '' ? '' : moment(this.selectTime).format('YYYY-MM'),
                    type: this.typeList.toString(),
                    pageSize: this.pageSize,
                    cityCode: this.$store.state.cityList.toString()
                }
            })
                .then((res) => {
                    this.checkLogin(res)
                    // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'

                    var data = res.data.data
                    var dataDeled = this.tableDataDel(data)

                    this.data1 = dataDeled
                    if (res.data.totalPage > 1) {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                })
                .catch(function(err) {
                // loading显示，同时让无数据的文本为空
                    that.spinShow = false
                    that.noDataText = '暂无数据'
                    console.log('err', err)
                })
        },
        dateChange() {
            // loading显示，同时让无数据的文本为空
            this.spinShow = true
            this.noDataText = ''

            this.current = 1
            this.axios.get('/beefly/baseData/api/v1/page', {
                params: {
                    cityCode: this.$store.state.cityList.toString(),
                    accessToken: this.$store.state.token,
                    pageSize: this.pageSize,
                    time: this.selectTime === '' ? '' : moment(this.selectTime).format('YYYY-MM'),
                    type: this.typeList.toString()
                }
            })
                .then((res) => {
                    this.checkLogin(res)

                    // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'

                    var data = res.data.data
                    var dataDesled = this.tableDataDel(data)
                    this.data1 = dataDesled
                    if (res.data.totalPage > 1) {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                })
                .catch((err) => {
                 // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'
                    console.log('err', err)
                })
        },
        handleCurrentPage(currentPage) {
            // loading显示，同时让无数据的文本为空
            this.spinShow = true
            this.noDataText = ''

            this.current = 1
            this.current = currentPage
            var _this = this
            this.axios.get('/beefly/baseData/api/v1/page', {
                params: {
                    pageNo: currentPage,
                    pageSize: _this.pageSize,
                    cityCode: this.$store.state.cityList.toString(),
                    accessToken: this.$store.state.token,
                    time: this.selectTime === '' ? '' : moment(this.selectTime).format('YYYY-MM'),
                    type: this.typeList.toString()
                }
            })
                .then((res) => {
                    this.checkLogin(res)

                    // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'

                    var data = res.data.data
                    var dataDeled = this.tableDataDel(data)

                    this.data1 = dataDeled
                    if (res.data.totalPage > 1) {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                })
                .catch(function(err) {
                 // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'
                    console.log('err', err)
                });
        },
        handlePageSize(pageSize) {
            // loading显示，同时让无数据的文本为空
            this.spinShow = true
            this.noDataText = ''

            this.current = 1
            var _this = this;
            this.pageSize = pageSize
            this.axios.get('/beefly/baseData/api/v1/page', {
                params: {
                    pageNo: this.current,
                    cityCode: this.$store.state.cityList.toString(),
                    pageSize: this.pageSize,
                    accessToken: this.$store.state.token,
                    time: this.selectTime === '' ? '' : moment(this.selectTime).format('YYYY-MM'),
                    type: this.typeList.toString()
                }
            })
                .then((res) => {
                    this.checkLogin(res)

                    // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'

                    var data = res.data.data
                    var dataDeled = this.tableDataDel(data)
                    this.data1 = dataDeled
                    if (res.data.totalPage > 1) {
                        this.pageShow = true
                    }
                    this.totalListNum = res.data.totalItems
                })
                .catch(function(err) {
                 // loading显示，同时让无数据的文本为空
                    this.spinShow = false
                    this.noDataText = '暂无数据'
                    console.log('err', err)
                });
        },
        tableDataDel(data) {
            // 处理大类小类数据
            var newData = []
            for (var i = 0; i < data.length; i++) {
                 var obj = {}
                 obj.type = data[i].bigKind + '/' + data[i].smallKind
                 newData[i] =  Object.assign({},data[i],{type: obj.type},{_disabled:obj.status===1?true:false})   
                 if(this.checkList.length>0){
                   this.checkList.map(id=>{
                       if(id=== newData[i].id){
                            newData[i] =  Object.assign({},data[i],{type: obj.type},{_disabled:obj.status===1?true:false},{_checked:true}) 
                       }
                   })
                }
            }
            return newData
        },
        ok() {
            this.$Message.info('点击了确定');
        },
        handleUpload(file) {
            this.file = file;

            return false;
        },
        upload() {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
        show(index, row) {
            var type = row.type.split('/')
            this.editBigType = type[0]
            this.editValidate.bigKind = type[0]
            this.editSmallType = type[1]
            this.editSmallType2 = '请选择小类'
            this.editValidate.smallKind = type[1]
            if (row.status === 1) {
                this.$Message.warning('每月10号后，不可编辑和删除上月数据')
            } else if (type[1] === '车辆' || type[1] === '电池' || type[1] === '机动车' || type[1] === '运维工具车') {
                this.numberShow = true
                this.editModal = true
                this.editMonth = row.dataMonth
                this.editValidate.dataMonth = row.dataMonth
                this.editArea = row.city
                // console.log('editArea',this.editArea)
                this.editValidate.city = row.city
                this.editValidate.unitPrice = row.unitPrice
                this.editValidate.number = row.number
                this.editValidate.id = row.id
                // console.log(this.editValidate)
            } else {
                this.numberShow = false
                this.editModal = true
                this.editMonth = row.dataMonth
                this.editValidate.dataMonth = row.dataMonth
                this.editArea = row.city
                // console.log('editArea',this.editArea)
                this.editValidate.city = row.city
                this.editValidate.unitPrice = row.unitPrice
                this.editValidate.number = row.number
                this.editValidate.id = row.id
                // console.log(this.editValidate)
            }
        },
        remove(index, row) {
            if (row.status === 1) {
                this.$Message.warning('每月10号后，不可编辑和删除上月数据!');
            } else {
                this.delId = row.id
                this.delIndex = index
                this.delModal = true
            }
        },
        closeDelModal() {
            this.axios.get('/beefly/baseData/api/v1/deleteBaseData', {
                params: {
                    accessToken: this.$store.state.token,
                    id: this.delId
                }
            })
            .then((res) => {
                this.checkLogin(res)
                // console.log(res.data)
                if (res.data.resultCode === 1) {
                    this.$Message.success('删除成功!');
                    this.current = 1
                    this.data1.splice(this.delIndex, 1)
                    this.loadData()
                    this.delModal = false;
                } else {
                    this.$Message.error('删除失败!');
                }
            })
            .catch((err) => {
                console.log('err', err)
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.axios.get('/beefly/baseData/api/v1/updateBaseData', {
                        params: {
                            data: {
                                dataMonth: moment(this.editValidate.dataMonth).format('YYYY-MM'),
                                city: this.editValidate.city,
                                bigKind: this.editValidate.bigKind,
                                smallKind: this.editValidate.smallKind,
                                number: this.editValidate.number,
                                unitPrice: this.editValidate.unitPrice,
                                id: this.editValidate.id,
                            },
                            accessToken: this.$store.state.token
                        }
                    })
                    .then((res) => {
                        this.checkLogin(res)
                        // console.log(res.data)
                        if (res.data.resultCode === 1) {
                            this.$Message.success('修改成功!');
                            this.editModal = false
                            this.loadData()
                        } else {
                            this.$Message.error('修改失败!');
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
        handleReset(name) {
            this.$refs[name].resetFields();
            this.editModal = false
        },
        handleClick(e) {
            // this.current = 1
            // var elems = siblings(e.target)
            // for (var i = 0; i < elems.length; i++) {
            //     elems[i].setAttribute('class', '')
            // }
            // e.target.setAttribute('class', 'active')
            // if (e.target.innerHTML === '固定资产') {
            //     this.loadData('固定资产')
            // } else {
            //     // this.editValidate.number = ''
            //     this.loadData('运维费用')
            // }
            if (e.target.getAttribute('class') === 'active') {
                e.target.setAttribute('class', '')
                var id = this.typeList.indexOf(e.target.innerHTML)
                this.typeList.splice(id, 1)
            } else {
                e.target.setAttribute('class', 'active')
                this.typeList.push(e.target.innerHTML)
                this.typeList.unique()
            }

            this.loadData()
            

        },
        importExcel(obj) {
            console.log(obj)
            if (!obj.files) {
                return;
            }
            console.log(obj.files)
            let file = obj.files[0],
                types = file.name.split('.')[1],
                fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(item => item === types);
            if (!fileType) {
                this.$Message.error('格式错误！请重新选择!');
                return;
            }
            this.file2Xce(file).then(tabJson => {
                if (tabJson && tabJson.length > 0) {
                    // console.log(tabJson)
                    this.exportedData = tabJson
                    console.log
                }
            });
        },
        file2Xce(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    let data = e.target.result;
                    this.wb = XLSX.read(data, {
                        type: 'binary'
                    });
                    resolve(XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]]));
                };
                reader.readAsBinaryString(file);
            });
        },
        confirmExport() {
            if (this.exportedData.length === 0) {
                this.$Message.warning('请导入excel文件！')
            } else if (this.exportMonth === '') {
                this.$Message.warning('请选择日期！')
            } else {
                // // 打开遮罩层，防止用户对导入界面进行操作。
                // this.cover = true
                var _this = this
                this.isUploadPercent = true
                this.axios.get('/beefly/baseData/api/v1/importData', {
                    params: {
                        data: JSON.stringify(this.exportedData),
                        userId: 123424,
                        dataMonth: moment(this.exportMonth).format('YYYY-MM'),
                        accessToken: this.$store.state.token
                    }
                })
                .then(function(res) {
                    _this.checkLogin(res)
                    // 上传响应回来后打开进度条
                    if (res.data.resultCode === 1) {
                        var timer = setInterval(function() {
                            _this.uploadPercent += 20
                            console.log(res.data.resultCode)
                            if (_this.uploadPercent === 100) {
                                _this.uploadPercent = 100
                                clearInterval(timer)
                                _this.$Message.success('上传成功');
                                // 清除上传excel文件流
                                var obj = document.getElementById('fileupload');
                                // obj.outerHTML=obj.outerHTML;
                                obj.value = ''
                                // $('#fileupload')[0].on('change', function () {
                                //     importExcel
                                // })
                                // $("#fileupload").html("");
                                // $("#fileupload").replaceWith("<input id='fileupload' class='upload' type='file' @change='importExcel($event.target)' placeholder='' >");  
                                // $("#fileupload").on("change", this.importExcel);  
                                // 清空上传存储的数组
                                _this.exportedData = []
                                _this.exportMonth = '' 
                                
                                setTimeout(function() {
                                    _this.isUploadPercent = false
                                    // 关闭遮罩层
                                    // _this.cover = false
                                    _this.loadData()
                                    _this.exportModal = false
                                    _this.uploadPercent = 0
                                }, 1000)
                                
                            } else if (_this.uploadPercent === 100) {
                                // _this.$Message.warning(res.data.message);
                                // _this.isUploadPercent = false
                                // clearInterval(timer)
                                // _this.uploadPercent = 0
                            }
                        }, 100)
                    } else {
                        _this.$Message.warning(res.data.message);
                        _this.$Message.warning(res.data.message);
                        _this.isUploadPercent = false
                        clearInterval(timer)
                        _this.uploadPercent = 0
                    }

                })
                .catch(function(err) {
                    _this.isUploadPercent = false
                    _this.uploadPercent = 0
                    // 关闭遮罩层
                    // _this.cover = false
                    _this.$Message.success(err.message);
                    console.log('err', err)
                })

            }
        },
        cityChange() {
            // 清空多选删除的数组容器。
            this.checkList = []
            this.current = 1

            // loading显示，同时让无数据的文本为空
            this.spinShow = true
            this.noDataText = ''

            this.axios.get('/beefly/baseData/api/v1/page', {
                params: {
                    accessToken: this.$store.state.token,
                    pageSize: this.pageSize,
                    type: $('.cityManageData_type button.active')[0].innerHTML,
                    cityCode: this.$store.state.cityList.toString(),
                    time: this.selectTime === '' ? '' : moment(this.selectTime).format('YYYY-MM')
                }
            })
            .then((res) => {
                this.checkLogin(res)
                
                // loading显示，同时让无数据的文本为空
                this.spinShow = false
                this.noDataText = '暂无数据'

                var data = res.data.data
                var dataDeled = this.tableDataDel(data)
                this.data1 = dataDeled
                if (res.data.totalPage > 1) {
                    this.pageShow = true
                }
                this.totalListNum = res.data.totalItems
            })
            .catch(function(err) {
                console.log('err', err)
            })
        },
        selectGroup(selection, row) {
            // this.checkList.push(row.id)
        },
        selectAll(selection) {
            
            // console.log(selection)
            selection.map( (item) => {
                if (item.status === 1) {
                    this.$Message.warning('每月10号后，不可编辑和删除上月数据')
                } else {
                    this.checkList.push(item.id)
                }
            })
        },
        selectChange(selection) {
            selection.map( (item) => {
                // this.checkList.push(item.id)
                if (item.status === 1) {
                    this.$Message.warning('每月10号后，不可编辑和删除上月数据')
                } else {
                    this.checkList.push(item.id)
                }
            })
            var res = this.checkList.unique()
            this.checkList = res
        },
        delTableByGroup () {
            if (this.checkList.length === 0) {
                this.$Message.warning('请至少勾选一条数据进行删除');
            } else {
                this.axios.get('/beefly/baseData/api/v1/batchDeleteBaseData', {
                    params: {
                        accessToken: this.$store.state.token,
                        ids: this.checkList.toString()
                    }
                })
                .then((res) => {
                    this.checkLogin(res)
                    if (res.data.resultCode === 1) {
                        this.$Message.success('删除成功!');
                        // 批量删除成功后，清空checkList数组
                        this.checkList = []
                        this.current = 1
                        this.loadData()
                        this.delModal = false;
                    } else {
                        this.$Message.error('删除失败!');
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                })
            }
        },
        getCharCol(n) {
            let temCol = '',
            s = '',
            m = 0
            while (n > 0) {
                m = n % 26 + 1
                s = String.fromCharCode(m + 64) + s
                n = (n - m) / 26
            }
            return s
        },
        s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        },
        downloadExl(json, type) {
            json = [{
                "城市": '北京市',
                "大类": '固定资产',
                '小类': '车辆',
                '数量(生产)':  29,
                '单价(生产)':  200
            }]
            var tmpDown; //导出的二进制对象
            var tmpdata = json[0];
            json.unshift({});
            var keyMap = []; //获取keys
            for (var k in tmpdata) {
                keyMap.push(k);
                json[0][k] = k;
            }
          var tmpdata = [];//用来保存转换好的json 
                json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                    v: v[k],
                    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
                }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                    v: v.v
                });
                var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
                var tmpWB = {
                    SheetNames: ['mySheet'], //保存的表标题
                    Sheets: {
                        'mySheet': Object.assign({},
                            tmpdata, //内容
                            {
                                '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                            })
                    }
                };
                tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, 
                    {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
                    ))], {
                    type: ""
                }); //创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            document.getElementById("hf").href = href; //绑定a标签
            document.getElementById("hf").click(); //模拟点击实现下载
            setTimeout(function() { //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        },
        bigListWatch () {
            if (this.editValidate.bigKind === '固定资产') {
                this.smallList_one_show = true
                this.smallList_two_show = false
            } else {
                this.smallList_one_show = false
                this.smallList_two_show = true
            }
        },
        checkLogin (res) {
           if (res.data.message === '用户登录超时') {
                this.$router.push('/login')
           }
        }
    },
    watch: {
        'selectTime': 'dateChange',
        '$store.state.cityList': 'cityChange',
        'editValidate.bigKind': 'bigListWatch'
    }
}
</script>

