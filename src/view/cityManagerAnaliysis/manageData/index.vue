<template>
    <div id="cityManagerData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>我管理的数据</BreadcrumbItem>
        </Breadcrumb>
        <div id="cityManagerData_head">
            <div class="cityManageData_month">
                <span>月份:</span>
                <DatePicker type="date" placeholder="选择日期" style="width: 216px"></DatePicker>
            </div>
            <city-select></city-select>
            <div class="cityManageData_type">
                <span>类别:</span>
                <button class="active" @click='handleClick'>固定资产</button>
                <button @click='handleClick'>运维费用</button>
            </div>
        </div>

        <div id="cityManage_table">
            <Button type="warning" @click="exportModal = true">导入数据</Button>
            <Button class="cancel">删除</Button>
            <span>*每月10号后，不可编辑和删除上月数据</span>


            <Table class="cityManage_table" border size='small' :columns="columns4" :data="data1"></Table>
            <Page :total="100" show-sizer show-elevator :styles='page' placement="top"></Page>

            <!-- 模态框区域 -->
            <Modal v-model="editModal" width="800px" :styles="{top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>编辑我的数据</span>
                </p>
                <div class="editModal_content">
                    <Form ref="editValidate" :model="editValidate" :rules="editValidateRule" :label-width="80">
                        <FormItem label="月份" prop="month">
                            <DatePicker :model="editValidate.month" format="yyyy年MM月dd日" style=" width:216px;" :placeholder="editMonth"></DatePicker>
                        </FormItem>
                        <FormItem label="城市" prop="area">
                            <Select class="city_select" :model="editValidate.area" :placeholder="editArea">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                                <Option value="shenzhen">深圳市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="类别">
                            <FormItem prop='bigType'>
                                <Select class="big_select" :model="editValidate.bigType" :placeholder="editBigType">
                                    <Option value="beijing">固定资产</Option>
                                    <Option value="shanghai">运维费用</Option>
                                </Select>
                            </FormItem>
                            <FormItem prop='smallType'>
                                <Select class="small_select" :model="editValidate.smallType" :placeholder="editSmallType">
                                    <Option value="beijing">车辆</Option>
                                    <Option value="shanghai">电池</Option>
                                    <Option value="shenzhen">充电站</Option>
                                </Select>
                            </FormItem>
                        </FormItem>
                        <FormItem label="单价" class="price" prop="price">
                            <Input v-model.number="editValidate.price" placeholder="请输入姓名"></Input>
                        </FormItem>
                        <FormItem label="数量" class="number" prop="num">
                            <Input v-model.number="editValidate.num" placeholder="请输入姓名"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer">
                    <Button class="cancel" @click="handleReset('editValidate')" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm" @click="handleSubmit('editValidate')">确认</Button>
                </div>
            </Modal>

            <!-- 导出模态框 -->
            <Modal v-model="exportModal" width="800px" :styles="{width: '600px', top: '20%'}" class="editModal_form">
                <p slot="header" class="editModal_head">
                    <span>导入数据</span>
                </p>
                <div class="managerData_upload_month">
                    <span>月份:</span>
                    <DatePicker type="date" class="DatePicker" placeholder="选择日期" style="width: 216px;"></DatePicker>
                </div>
                <div class="managerData_upload_uploadFile">
                    <span>选择文件:</span>
                    <Upload
                        :before-upload="handleUpload"
                        class="upload"
                        action="">
                        <Button type="ghost" style="width: 216px;" icon="ios-cloud-upload-outline">选择要上传文件的文件</Button>
                    </Upload>
                </div>
                <div class="managerData_upload_download">
                    <span>*请选择xls、xlsx格式文件</span>
                    <span>模板下载</span>
                </div>
                <Progress class="my_page" :percent="uploadPercent" v-show="isUploadPercent" status="active"></Progress>
                <div slot="footer">
                    <Button class="cancel" @click="exportModal = false" style="margin-left: 8px">取消</Button>
                    <Button type="warning" class="confirm">确认</Button>
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
        width: 100%;
        // border: 1px solid #dddee1;
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
        -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
        -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
        box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
        display: block;
        // width: 79%;
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
                margin-right: 9px;
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
        }
        // .cityManageData_area span:nth-of-type(1):active {
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
            padding: 0;
        }
    }

    #cityManage_table {
        width: 100%;
        overflow: hidden;
        background: #fff;
        box-sizing: border-box;
        padding: 20px 10px 20px 10px;
        // margin-top: 274px;
        margin-top: 20px;
        button:nth-of-type(1){
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
            span:nth-of-type(1) {
                font-size: 14px;
                float: left;
                line-height: 10px;
                margin-right: 16px;
                margin-top: 10px;
            }
            .upload {
                margin-top: 30px;
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
                width:296px;
            }
            .number { 
                width:296px;
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
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        return {
            page: {
                'float': 'right',
                'margin-top': '20px'
            },
            editValidate: {
                month: '',
                area: '',
                bigType: '',
                type: '',
                smallType: '',
                price: '',
                num: ''
            },
            editMonth: '',
            editArea: '',
            editBigType: '',
            editSmallType: '',
            editValidateRule: {
                month: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
                area: [
                    { required: true, message: '请选择地区', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择大类', trigger: 'blur'}
                ],
                bigType: [
                    { required: true, message: '请选择大类', trigger: 'blur'}
                ],
                smallType: [
                    { required: true, message: '请选择小类', trigger: 'blur'}
                ],
                price: [
                    { required: true, type: 'number', message: '请输入单价', trigger: 'blur'}
                ],
                num: [
                    { required: true, type: 'number', message: '请输入数量', trigger: 'blur'}
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
                    key: 'month'
                },
                {
                    title: '地区',
                    key: 'area'
                },
                {
                    title: '大类/小类',
                    key: 'type'
                },
                {
                    title: '数量',
                    key: 'num'
                },
                {
                    title: '单价',
                    key: 'price'
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
                                        this.remove(params.index)
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            data1: [
                {
                    month: '2017年7月2日',
                    area: '南京市',
                    type: '固定资产/电池',
                    num: '100',
                    price: '2222',
                }, {
                    month: '2017年7月2日',
                    area: '北京市',
                    type: '固定资产/电池',
                    num: '222',
                    price: '333',
                }
            ],
            modal1: false,
            file: null,
            loadingStatus: false,
            exportModal: false,
            uploadPercent: 0,
            isUploadPercent: false,
            editModal: false,
            delModal: false,
            delIndex: ''
        }
    },
    mounted () {
    },
    methods: {
        ok () {
            this.$Message.info('点击了确定');
        },
        handleUpload (file) {
            this.file = file;
            var _this = this
            this.isUploadPercent = true
            var timer = setInterval(function () {
                _this.uploadPercent++
                if (_this.uploadPercent === 100) {
                    clearInterval(timer)
                    _this.$Message.success('上传成功');
                    setTimeout( function () {
                        _this.isUploadPercent = false
                        _this.exportModal = false
                        _this.uploadPercent = 0
                    }, 1000)
                }
            }, 100)
            return false;
        },
        upload () {
            this.loadingStatus = true;
            setTimeout(() => {
                this.file = null;
                this.loadingStatus = false;
                this.$Message.success('上传成功')
            }, 1500);
        },
        show (index, row) {
            this.editModal = true
            console.log(row)
            this.editMonth = row.month
            this.editArea = row.area
            var type = row.type.split('/')
            // this.$set(this.editValidate.bigType,type[0],0) 
            this.editBigType = type[0]
            this.editSmallType = type[1]
            this.editValidate.price = row.price
            this.editValidate.num = row.num
            console.log(this.editValidate)
        },
        remove (index) {
            this.delIndex = index
            // this.$Modal.confirm({
            //     title: 'Warning',
            //     content: '确定删除吗？',
            //     onOk: () => {
            //         this.data1.splice(index, 1);
            //     }
            // })
            this.delModal = true
        },
        closeDelModal () {
            this.data1.splice(this.delIndex, 1)
            this.delModal = false
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
            this.editModal = false
        },
        handleClick (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')            
        }
    }
}
</script>

