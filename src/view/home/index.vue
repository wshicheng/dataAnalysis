<template>
  <Row>
      <Col span="12">
        <vehicle-operateState></vehicle-operateState>  
      </Col>
       <Col span="12">
        <vehicle-State></vehicle-State>  
      </Col>
  </Row>
</template>
<script>
import vehicleOperatStateDistribute from '../../components/Vehicle-operating-state-distribution/index.vue'
import vehicleState from '../../components/Vehicle-state-distribution/index.vue' 
 export default{
     components:{
       'vehicle-operateState':vehicleOperatStateDistribute,
       'vehicle-State':vehicleState
     }
  }
</script>
