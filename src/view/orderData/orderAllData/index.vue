<template>
  <div id="orderAllData_body">
        <Breadcrumb class="Breadcrumb">
            <BreadcrumbItem>整体数据</BreadcrumbItem>
        </Breadcrumb>
      <div id="orderAllData_head">
        <div class="orderAllData_head_time">
            <span>时间:</span>
            <button>今日</button>
            <button>昨日</button>
            <button>近七日</button>
            <button>近30天</button>
            <button>指定时间段</button>
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
            text-indent: 11px;
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
                    margin-right: 6px;
                }
                button {
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    display: inline-block;
                    background: #fff;
                    border: 1px solid #dddee1;
                    border-radius: 4px;
                    text-align: center;
                    outline: none;
                    margin-right: 10px;
                }
                button:nth-last-of-type(1) {
                    width: 80px;
                }
            }
        }
    }
</style>
<script>
import citySelect from '../../../components/citySelect.vue'
export default {
    components: {
        "city-select": citySelect
    },
    data () {
        return {

        }
    }   
}
</script>