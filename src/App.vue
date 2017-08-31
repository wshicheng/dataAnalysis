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

.ivu-tabs-nav-scroll {
  /* text-align: center; */
}

.ivu-tabs-nav {
  margin: 0 auto;
  float: initial;
  display: inline-block;
}
.ivu-tabs-bar {
    border-bottom: 1px solid #6a6a6d;
    margin-bottom: 16px;
}

  .ivu-tabs-nav .ivu-tabs-tab .ivu-icon{margin-right:0;}
/* .ivu-table {
  width: inherit;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  color: #495060;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
} */
 .ivu-modal-body { overflow-y: auto;
    max-height: 300px; } 
    button.cancel{background:transparent}
button.cancel:hover{border-color:orange;color:orange;}
/* .ivu-page-item-active{background-color: #404040;
    border-color: #404040;} */
    /* .ivu-page-next:hover, .ivu-page-prev:hover{color:#404040;border-color:#404040;}
    .ivu-page-item:hover a{color:#404040;}
    .ivu-page-item:hover{border-color:#404040}
    .ivu-page-item-jump-prev:hover a{color:#404040;}
    .ivu-page-item-jump-prev:hover{border-color:#404040}
    .ivu-page-next:hover a{color:#404040;} */
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{background-color:rgba(73, 80, 96, 0.48)!important;}
</style>

