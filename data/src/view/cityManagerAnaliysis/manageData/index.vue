<template>
    <div id="cityManagerData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>我管理的数据</BreadcrumbItem>
        </Breadcrumb>
        <div id="cityManagerData_head">
            <div class="cityManageData_month">
                <span>月份:</span>
                <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
            </div>
            <div class="cityManageData_area">
                <span>地区:</span>
                <div class="cityManageData_area_span" >
                    <span>全部地区</span>
                    <span>无为</span>
                    <span>禹州</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                    <span>庐江</span>
                </div>
            </div>
            <div class="cityManageData_type">
                <span>类别:</span>
                <span>固定资产</span>
                <span>运维费用</span>
            </div>
        </div>

        <div id="cityManage_table">
            <Button type="primary" @click="modal10 = true">导入数据</Button>
            <Button>删除</Button>
            <span>*每月10号后，不可编辑和删除上月数据</span>
            <Table class="cityManage_table" border :columns="columns4" :data="data1"></Table>
            <Page :total="100" show-sizer show-elevator :styles='page' placement="top"></Page>

            <!-- 模态框区域 -->
            <Modal
                v-model="modal1"
                title="普通的Modal对话框标题"
                @on-ok="ok">
                <p>对话框内容</p>
                <p>对话框内容</p>
                <p>对话框内容</p>
            </Modal>

            <Modal
                title="导入数据"
                v-model="modal10"
                class-name="vertical-center-modal"
                class="managerData_upload">
                <div class="managerData_upload_month">
                    <span>月份:</span>
                    <DatePicker type="date" class="DatePicker" placeholder="选择日期" style="width: 200px"></DatePicker>
                </div>
                <div class="managerData_upload_uploadFile">
                    <span>选择要上传的文件:</span>
                    <Upload
                        :before-upload="handleUpload"
                        class="upload"
                        action="">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传文件的文件</Button>
                    </Upload>
                </div>

                <Progress class="uploadPercent" vertical :percent="uploadPercent" v-show="isUploadPercent" status="active"></Progress>
            </Modal>
        </div>
    </div>
</template>

<style lang='scss' scoped type="text/css">
    #cityManagerData_body {
        width: 100%;
        // border: 1px solid #dddee1;
        background: #ffffff;
        border-radius: 4px;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
    }
    #cityManagerData_head {
        width: 100%;
        display: block;
        background: #fff;
        overflow: hidden;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        padding: 10px 10px 0px 10px;
        .cityManageData_month {
            span:nth-of-type(1) {
                margin-right: 10px;
            }
            margin-bottom: 10px;
        }
        .cityManageData_area span {
            width: 50px;
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
        .cityManageData_area span:nth-of-type(1):active {
            color: #f60;
        }
        .cityManageData_area div.cityManageData_area_span span:nth-of-type(1) {
            width: 60px;
            margin: 0;
            margin-right: 2px;
            text-align: center;
            padding: 0 3px 0 3px;
        }
        .cityManageData_area div {
            max-width: 97%;
            float: left;
        }
        .cityManageData_type span {
            width: 80px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            border: 1px solid #dddee1;
            border-radius: 4px;
            text-align: center;
            margin: 0 5px 10px 5px;
        }
        .cityManageData_type span:nth-of-type(1) {
            border: none;
            margin: 0;
            float: left;
            text-align: left;
            width: 3%;
            padding: 0;
        }
    }

    #cityManage_table {
        width: 100%;
        overflow: hidden;
        background: #fff;
        box-sizing: border-box;
        padding: 20px 10px 20px 10px;
        border-radius: 4px;
        button:nth-of-type(1){
            margin-right: 10px;
        }
        span:nth-of-type(1) {
            float: right;
            color: #ccc;
        }
        .cityManage_table {
            margin-top: 20px;
        }
    }

    .managerData_upload {
        div.managerData_upload_month {
            span:nth-of-type(1) {
                float: left;
                width: 100px;
                text-align: right;
                margin-top: 20px;
                margin-right: 8px;
            }
            .DatePicker {
                margin-top: 14px;
            }
        }
        div.managerData_upload_uploadFile {
            span:nth-of-type(1) {
                float: left;
                margin-right: 10px;
                margin-top: 10px;
            }
            .upload {
                margin-top: 30px;
            }
        }

        .uploadPercent {
            position: fixed;
            z-index: 1000;
            left: 50%;
            top: 50%;
        }
    }
    
</style>

<script>
import $ from 'jquery'
export default {
    data () {
        return {
            page: {
                'float': 'right',
                'margin-top': '20px'
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
                    title: '类别',
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
                                        this.show(params.index)
                                    }
                                }
                            }),
                            h('icon', {
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
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }, {
                    month: '王小明',
                    area: 18,
                    type: 18,
                    num: 10,
                    price: 100,
                }
            ],
            modal1: false,
            file: null,
            loadingStatus: false,
            modal10: false,
            uploadPercent: 99,
            isUploadPercent: false
        }
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
                this.uploadPercent++
                if (this.uploadPercent === 100) {
                    clearInterval(timer)
                    _this.isUploadPercent = true
                    _this.modal10 = false
                }
            }, 1000)
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
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `月份：${this.data1[index].month}<br>类别：${this.data1[index].area}<br>数量：${this.data1[index].type}`
            })
        },
        remove (index) {
            this.$Modal.confirm({
                title: 'Warning',
                content: '确定删除吗？',
                onOk: () => {
                    this.data1.splice(index, 1);
                }
            })
        }
    }
}
</script>

