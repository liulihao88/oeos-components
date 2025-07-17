<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>


<template>
 <div class="box">
   <div>
     <o-input v-model="input1" style="max-width: 600px" placeholder="Please input">
       <template #prepend>Http://</template>
     </o-input>
   </div>
   <div class="m-t-4">
     <o-input v-model="input2" style="max-width: 600px" placeholder="Please input">
       <template #append>.com</template>
     </o-input>
   </div>
   <div class="m-t-4">
     <o-input v-model="input3" style="max-width: 600px" placeholder="Please input" class="input-with-select">
       <template #prepend>
         <el-select v-model="select" placeholder="Select" style="width: 215px">
           <el-option label="Restaurant" value="1" />
           <el-option label="Order No." value="2" />
           <el-option label="Tel" value="3" />
         </el-select>
       </template>
       <template #append>
         <el-button :icon="Search" />
       </template>
     </o-input>
   </div>
   <div class="m-t-4">
     <o-input v-model="input3" style="max-width: 600px" placeholder="Please input" class="input-with-select">
       <template #prepend>
         <el-button :icon="Search" />
       </template>
       <template #append>
         <el-select v-model="select" placeholder="Select" style="width: 215px">
           <el-option label="Restaurant" value="1" />
           <el-option label="Order No." value="2" />
           <el-option label="Tel" value="3" />
         </el-select>
       </template>
     </o-input>
   </div>
 </div>

</template>

<style lang="scss" scoped>
.input-with-select :deep(.el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}
.box :deep(.el-input-group__prepend), .box :deep(.el-input-group__append){
  padding: 0 20px;
}
</style>