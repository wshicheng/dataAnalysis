<template>
    <Row class="allData">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>城市经营分析</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
            <time class="month">月份：</time>
            <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
        </Row>
        <Row class="tableGrid">
            <Table :columns="columns" :data="data"></Table>
            <Page :total="totalListNum" v-show="pageShow" class="tableGrid_page" placement="top" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
        </Row>
    </Row>
</template>
<script>
import $ from 'jquery'
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
                                blank: '_blank',
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
            pageShow: false
        }
    },
    mounted () {
        var _this = this
        this.axios.get('/beefly/record/api/v1/page')
        .then(function (res) {
            console.log(res.data)
            console.log(res.data.data)
            _this.data = res.data.data
            if (res.data.totalPage > 1) {
                _this.pageShow = true
            }
            _this.totalListNum = res.data.totalItems
        })
        .catch(function (err) {
            console.log('err', err)
        });
    },
    methods: {
        handleCurrentPage(currentPage) {
            this.currentPage = currentPage
            var _this = this
            this.axios.get('/beefly/record/api/v1/page', {
                params: {
                    pageNo: currentPage,
                    pageSize: _this.pageSize
                }
            })
            .then(function (res) {
                _this.data = res.data.data
                if (res.data.totalPage > 1) {
                    _this.pageShow = true
                }
                _this.totalListNum = res.data.totalItems
            })
            .catch(function (err) {
                console.log('err', err)
            });
        },
        handlePageSize(pageSize) {
            this.pageSize = pageSize
        },
        mockTableData(){
            var arr = [];
            for(var i=0;i<10;i++){
                arr.push({
                    month: '2017-12',
                    updateTime: '2018-01-01 10:01:01',
                    operatingPerson: 'zhouyu' + i 
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
