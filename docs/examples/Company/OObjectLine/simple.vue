<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const objectCount = ref([])
const objectSize = ref([])


setTimeout(() => {
  objectCount.value = [
    {
      tenant: 'aaa',
      timeValue: [
        {
          time: '1751277600',
          value: '0',
        },
        {
          time: '1751299200',
          value: '0',
        },
        {
          time: '1751320800',
          value: '0',
        },
        {
          time: '1751342400',
          value: '0',
        },
        {
          time: '1751364000',
          value: '0',
        },
        {
          time: '1751385600',
          value: '0',
        },
        {
          time: '1751407200',
          value: '0',
        },
        {
          time: '1751428800',
          value: '0',
        },
        {
          time: '1751450400',
          value: '0',
        },
        {
          time: '1751472000',
          value: '0',
        },
        {
          time: '1751493600',
          value: '0',
        },
        {
          time: '1751515200',
          value: '0',
        },
        {
          time: '1751536800',
          value: '0',
        },
        {
          time: '1751558400',
          value: '0',
        },
        {
          time: '1751580000',
          value: '0',
        },
        {
          time: '1751601600',
          value: '0',
        },
        {
          time: '1751623200',
          value: '0',
        },
        {
          time: '1751644800',
          value: '0',
        },
        {
          time: '1751666400',
          value: '0',
        },
        {
          time: '1751688000',
          value: '0',
        },
        {
          time: '1751709600',
          value: '0',
        },
        {
          time: '1751731200',
          value: '0',
        },
        {
          time: '1751752800',
          value: '0',
        },
        {
          time: '1751774400',
          value: '0',
        },
        {
          time: '1751796000',
          value: '0',
        },
        {
          time: '1751817600',
          value: '0',
        },
        {
          time: '1751839200',
          value: '0',
        },
        {
          time: '1751860800',
          value: '0',
        },
        {
          time: '1751882400',
          value: '0',
        },
        {
          time: '1751904000',
          value: '0',
        },
        {
          time: '1751925600',
          value: '0',
        },
      ],
    },
  ]

  objectSize.value = [
    {
      tenant: 'aaa',
      timeValue: [
        {
          time: '1751277600',
          value: '0',
        },
        {
          time: '1751299200',
          value: '0',
        },
        {
          time: '1751320800',
          value: '0',
        },
        {
          time: '1751342400',
          value: '0',
        },
        {
          time: '1751364000',
          value: '0',
        },
        {
          time: '1751385600',
          value: '0',
        },
        {
          time: '1751407200',
          value: '0',
        },
        {
          time: '1751428800',
          value: '0',
        },
        {
          time: '1751450400',
          value: '0',
        },
        {
          time: '1751472000',
          value: '0',
        },
        {
          time: '1751493600',
          value: '0',
        },
        {
          time: '1751515200',
          value: '0',
        },
        {
          time: '1751536800',
          value: '0',
        },
        {
          time: '1751558400',
          value: '0',
        },
        {
          time: '1751580000',
          value: '0',
        },
        {
          time: '1751601600',
          value: '0',
        },
        {
          time: '1751623200',
          value: '0',
        },
        {
          time: '1751644800',
          value: '0',
        },
        {
          time: '1751666400',
          value: '0',
        },
        {
          time: '1751688000',
          value: '0',
        },
        {
          time: '1751709600',
          value: '0',
        },
        {
          time: '1751731200',
          value: '0',
        },
        {
          time: '1751752800',
          value: '0',
        },
        {
          time: '1751774400',
          value: '0',
        },
        {
          time: '1751796000',
          value: '0',
        },
        {
          time: '1751817600',
          value: '0',
        },
        {
          time: '1751839200',
          value: '0',
        },
        {
          time: '1751860800',
          value: '0',
        },
        {
          time: '1751882400',
          value: '0',
        },
        {
          time: '1751904000',
          value: '0',
        },
        {
          time: '1751925600',
          value: '0',
        },
      ],
    },
  ]
}, 0)
</script>

<template>
  <div>
    <OObjectLine :objectCount="objectCount" :objectSize="objectSize" class="h-400"></OObjectLine>
  </div>
</template>
