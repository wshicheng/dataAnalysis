<template>
  <div>
      <div id="bikeAllData_head">
          <div class="bikeAllData_head_time">
              <span>时间</span>
              <button>今日</button>
              <button>昨日</button>
              <button>近7日</button>
              <button>近30日</button>
              <button>制定时间段</button>

          </div>
      </div>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
    data () {
        return {

        }
    },
    methods: {
        areaClick () {
            $('.cityManageData_area_span span').click(function () {
                $(this).toggle('active')    
            })
        },  
        allAreaClick () {
            $('.cityManageData_area_span span.active').rmoveClass('active')
        }
    },
    mounted () {

    }
}
</script>
