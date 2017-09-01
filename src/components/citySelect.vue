<template>
    <div class="citySelect_area">
        <span>地区:</span>
        <div class="citySelect_area_span" @click.stop.prevent="areaClick">
            <span class="active" @click.stop.prevent="allAreaClick">全部地区</span>
            <span>无为</span>
            <span>禹州</span>
            <span>庐江</span>
            <span>庐江</span>
            <span>庐江</span>
            <span>庐江</span>
            <span>北京地区</span>
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
</template>
<style lang='scss' scoped type="text/css">
.citySelect_area span {
    width: 70px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    font-size: 14px;
    display: inline-block;
    border: 1px solid #dddee1;
    border-radius: 4px;
    text-align: center;
    margin: 0 5px 10px 5px;
}
.citySelect_area span:nth-of-type(1) {
    border: none;
    margin: 0;
    float: left;
    text-align: left;
    width: 40px;
    padding: 0;
}
// .citySelect_area span:nth-of-type(1):active {
//     color: #f60;
// }
.citySelect_area div.citySelect_area_span span:nth-of-type(1) {
    width: 70px;
    margin-left: 4px;
    margin-right: 9px;
    text-align: center;
    padding: 0 3px 0 3px;
}
.citySelect_area div.citySelect_area_span {
    span.active {
        background: #fff;
        color: orange;
        border: 1px solid orange;
        transition: all .1s linear 0s;
    }
}
.citySelect_area div {
   max-width: 90%;

    display: inline-block;
}
</style>
<script>
import $ from 'jquery'
export default {
    data () {
        return {

        }
    },
    methods: {
        areaClick () {
            $('.citySelect_area_span span').click(function (e) {
                e.preventDefault();
                $(this).toggleClass('active')    
            })
        },  
        allAreaClick () {
            $('.citySelect_area_span span.active').rmoveClass('active')
        }
    },
    mounted () {
        // e.preventDefault()
    }
}
</script>

