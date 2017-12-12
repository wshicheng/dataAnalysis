<template>
    <Row class="allData">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>整体数据</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
            <time class="month">月份：</time>
            <DatePicker @on-change="queryMonth"  type="month" :options="options" format="yyyy-MM"  placeholder="选择日期" style="width: 216px"></DatePicker>
        </Row>
        <Row class="tableGrid">
            <Spin fix size="large" v-if="spinShow"  class="spin">
                 <Icon type="load-c" size=18 class="demo-spin-icon-load" style="color: #ccc;"></Icon>
                 <div style="color: #ccc; text-indent: 5px;">  loading...</div>
            </Spin>
            <Table :columns="columns" :no-data-text='noDataText' :data="data" class="message_table"></Table>
            <Page :total="totalListNum" v-show="pageShow" class="tableGrid_page" placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </Row>
    </Row>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '月份',
                    key: 'dataMonth',
                    render: (h, params) => {
                        return h('a', {
                            style: {
                                color: '#2d8cf0',
                                cursor: 'pointer'
                            },
                            attrs: {
                                target: '_blank',
                                href: '#/index/cityManagerAnalysis/month/' + params.row.dataMonth
                            }
                        }, params.row.dataMonth)
                    }
                },
                {
                    title: '最后更新时间',
                    key: 'updateTime'
                },
                {
                    title: '操作人',
                    key: 'operator'
                }
            ],
            data:[],
            totalListNum: 100,
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            currentPage: 1,
            pageShow: false,
            noDataText: '',
            time:'',
            options:{
                disabledDate (date) {
                    return date&&date.valueOf()> Date.now()
                }
            },
            spinShow: false
        }
    },
    mounted () {
        this.$store.dispatch('menuActiveName', '/index/cityManagerAnalysis')
        document.title = '数据运营平台 - 整体数据'

        this.spinShow = true
        var _this = this
        this.axios.get('/beefly/record/api/v1/page',{params:{accessToken:this.$store.state.token}})
        .then(function (res) {
            if (res.data.resultCode === 1) {  
                _this.noDataText = ''
            } else {
                _this.noDataText = '暂无数据'
            }
            
            _this.data = res.data.data.length>0?res.data.data:[]
            var message = res.data.message;
            if(message === '用户登录超时'){
                _this.$router.push('/login')
            }
            if (res.data.totalPage > 1) {
                _this.pageShow = true
            }
            
            _this.spinShow = false
            _this.noDataText = ''
            _this.totalListNum = res.data.totalItems
        })
        .catch(function (err) {
            _this.spinShow = false
            _this.noDataText = '暂无数据'
            console.log('err', err)
        });
    },
    methods: {
        queryMonth(value){
            this.noDataText = ''
            this.spinShow = true
            var _this = this
            this.axios.get('/beefly/record/api/v1/page', {
                params: {
                    pageNo: this.currentPage,
                    pageSize: this.pageSize,
                    time: value.length>0?moment(value).format('YYYY-MM'):'',
                    accessToken:this.$store.state.token
                    
                }
            })
            .then(function (res) {
                _this.spinShow = false
                if (res.data.resultCode === 1) {  
                    _this.noDataText = ''
                } else {
                    _this.noDataText = '暂无数据'
                }   
                
                _this.data = res.data.data
                _this.totalListNum = res.data.totalItems

                if (res.data.totalPage > 1) {
                    _this.pageShow = true
                } else {
                    _this.pageShow = false
                }

            })
            .catch(function (err) {
                _this.spinShow = false
                console.log('err', err)
            });
        },
        handleCurrentPage(currentPage) {
            this.spinShow = true
            this.currentPage = currentPage
            var _this = this
            this.axios.get('/beefly/record/api/v1/page', {
                params: {
                    pageNo: currentPage,
                    pageSize: _this.pageSize,
                    accessToken:this.$store.state.token
                }
            })
            .then(function (res) {
                _this.spinShow = false
                if (res.data.resultCode === 1) {  
                    _this.noDataText = ''
                } else {
                    _this.noDataText = '暂无数据'
                }   
                
                _this.data = res.data.data
                _this.totalListNum = res.data.totalItems

                if (res.data.totalPage > 1) {
                    _this.pageShow = true
                } else {
                    _this.pageShow = false
                }
            })
            .catch(function (err) {
                _this.spinShow = false
                console.log('err', err)
            });
        },
        handlePageSize(pageSize) {
            this.spinShow = true
            var _this = this;
            this.pageSize = pageSize
            this.axios.get('/beefly/record/api/v1/page', {
                params: {
                    pageNo:  this.currentPage,
                    pageSize:  this.pageSize,
                    accessToken:this.$store.state.token
                }
            })
            .then(function (res) {
                _this.spinShow = false
                if (res.data.resultCode === 1) {  
                    _this.noDataText = ''
                } else {
                    _this.noDataText = '暂无数据'
                }   
                
                _this.data = res.data.data
                _this.totalListNum = res.data.totalItems

                if (res.data.totalPage > 1) {
                    _this.pageShow = true
                } else {
                    _this.pageShow = false
                }
            })
            .catch(function (err) {
                _this.spinShow = false
                console.log('err', err)
            });
        },
        queryData(){

        },
        mockTableData(){
            var arr = [];
            for(var i=0;i<10;i++){
                arr.push({
                    dataMonth: '2017-12',
                    updateTime: '2018-01-01 10:01:01',
                    operator: 'zhouyu' + i 
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
    .spin {
        position: absolute;
        display: inline-block;
        // background-color: rgba(253, 248, 248,0.0); 
        background-color: rgba(255, 255, 255, 0.8); 
    }
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

div.allData {
    background: #ececec;
    .Breadcrumb {
        width: 100%;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
       
    }
}
</style>
