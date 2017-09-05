<template>
  <div id="orderAllData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>整体数据</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderAllData_head">
        <div class="orderAllData_head_time">
            <span>时间:</span>
            <button class="active" @click="handleClick">今日</button>
            <button @click="handleClick">昨日</button>
            <button @click="handleClick">近七日</button>
            <button @click="handleClick">近30天</button>
            <button @click="handleClick">指定时间段</button>
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 216px; height: 28px;"></DatePicker>
            <div class="search"><button @click="searchByTimeLine">搜索</button></div>
        </div>
        <city-select></city-select>
      </div>
  </div>
</template>
<style lang='scss' scoped type="text/css">
    #orderAllData_body {
        background: #ececec;
        .Breadcrumb {
            width: 100%;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
        }
        #orderAllData_head {
            -moz-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            -webkit-box-shadow:3px 4px 6px rgba(51, 51, 51, 0.43); 
            box-shadow: 3px 4px 6px rgba(51, 51, 51, 0.43);
            font-size: 14px;
            background: #fff;
            padding: 10px;
            overflow: hidden;
            div.orderAllData_head_time {
                margin-bottom: 10px;
                span:nth-of-type(1) {
                    margin-right: 9px;
                }
                button {
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    display: inline-block;
                    background: #fff;
                    border: 1px solid #dddee1;
                    border-radius: 4px;
                    text-align: center;
                    color: #565c6b;
                    outline: none;
                    margin-right: 10px;
                }
                button:nth-last-of-type(1) {
                    width: 80px;
                }
                button.active {
                    border: 1px solid orange;
                    color: orange;
                }
                div.search {
                    display: inline-block;
                    button {
                        color: #fff;
                        background: #444;
                        font-weight: bolder;
                        border: 1px solid #444;
                    }
                    button:hover {
                        background: #666;
                        border: 1px solid #666;
                    }
                }
            }
        }
    }
</style>
<script>
import citySelect from '../../../components/citySelect.vue'
import { siblings } from '../../../util/util.js'
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        return {
            timeSelectShow: false
        }
    },
    methods: {
        handleClick (e) {
            var elems = siblings(e.target)
            for (var i = 0; i < elems.length; i++) {
                elems[i].setAttribute('class', '')
            }
            e.target.setAttribute('class', 'active')
            if (e.target.innerHTML === '指定时间段') {
                //this.timeSelectShow = true
            }       
        },
        searchByTimeLine () {}
    }
}
</script>