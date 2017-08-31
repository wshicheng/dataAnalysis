<template>
    <Row class="allData">
        <Breadcrumb>
            <BreadcrumbItem >城市经营分析</BreadcrumbItem>
        </Breadcrumb>
        <Row class="datePick_zone">
            <time class="month">月份：</time>
            <DatePicker type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
        </Row>
        <Row class="tableGrid">
            <Table :columns="columns" :data="data"></Table>
        </Row>
        <Row class="paganation">
            <template>
                <Page :total="totalListNum" @on-change="handleCurrentPage" @on-page-size-change="handlePageSize" show-sizer :page-size="pageSize" :page-size-opts='pageSizeOpts'></Page>
            </template>
        </Row>
    </Row>
</template>
<script>
import $ from 'jquery'
    export default {
        data () {
            return {
                columns:[
                    {
                        title:'月份',
                        key:'month',
                        render:(h,params) => {
                            return h('a',{
                                style:{
                                    color:'rgb(0, 0, 255)',
                                    cursor:'pointer'
                                },
                                attrs:{
                                    blank:'_blank',
                                    href:'/index/cityManagerAnalysis/month/' + params.row.month
                                }
                            },params.row.month)
                        }
                    },
                    {
                        title: '最后更新时间',
                        key: 'updateTime'
                    },
                    {
                        title: '操作人',
                        key: 'operatingPerson'
                    }
                ],
                data: [
                    {
                        month: '2017-12',
                        updateTime: '2018-01-01 10:01:01',
                        operatingPerson: 'zhouyu'
                    },
                    {
                        month: '2017-1',
                        updateTime: '2018-01-01 10:01:01',
                        operatingPerson: 'zhouyu'
                    }
                ],
                totalListNum:100,
                pageSizeOpts:[10,20,30,40],
                pageSize:20,
                currentPage:1,
            }
        },
        methods:{
            handleCurrentPage(currentPage){
               this.currentPage = currentPage
            },
            handlePageSize(pageSize){
                this.pageSize = pageSize
            }
        },
    }
</script>
<style lang="scss" type="text/css" scoped>
    $ivu-breadcrumb-margin:20px;
    $tableGridMargin:20px;
    $tableGridMarginBottom:20px;
    .ivu-breadcrumb{margin-bottom:$ivu-breadcrumb-margin}
    div.tableGrid{
        margin-top:$tableGridMargin;
        margin-bottom: $tableGridMarginBottom;
    }
    ul.ivu-page{float:right;}
    div.allData{padding:10px;}
</style>
