<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
div#fiexedAssets th .ivu-table-cell {
  display: block;
  text-align: center;
  padding: 0;
}

div#fiexedAssets td .ivu-table-cell {
  display: block;
  text-align: center;
  padding: 0;
}

div#fiexedAssets .ivu-table td {
  height: 30px;
}

 ::selection {
  background: #fff;
}

button.ivu-btn.ivu-btn-ghost {
  width: 260px;
}



.ivu-tabs-nav-container {
  line-height: 3
}


.ivu-tabs-nav {
  margin: 0 auto;
  line-height: 43px;
  display: inline-block;
}
.ivu-tabs-bar {
    border-bottom: 1px solid #6a6a6d;
    margin-bottom: 16px;
}

  .ivu-tabs-nav .ivu-tabs-tab .ivu-icon{margin-right:0;}

 .ivu-modal-body { overflow-y: auto;
    max-height: 300px; } 
    button.cancel{background:transparent}
button.cancel:hover{border-color:orange;color:orange;}

    
</style>

