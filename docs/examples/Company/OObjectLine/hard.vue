<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const objectCount = ref([])
const objectSize = ref([])

setTimeout(() => {
  objectCount.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1750867200',
          value: '42670',
        },
        {
          time: '1750888800',
          value: '42670',
        },
        {
          time: '1750910400',
          value: '42670',
        },
        {
          time: '1750932000',
          value: '42670',
        },
        {
          time: '1750953600',
          value: '42670',
        },
        {
          time: '1750975200',
          value: '42670',
        },
        {
          time: '1750996800',
          value: '42670',
        },
        {
          time: '1751018400',
          value: '42670',
        },
        {
          time: '1751040000',
          value: '42670',
        },
        {
          time: '1751061600',
          value: '42670',
        },
        {
          time: '1751083200',
          value: '42670',
        },
        {
          time: '1751104800',
          value: '42670',
        },
        {
          time: '1751126400',
          value: '42670',
        },
        {
          time: '1751148000',
          value: '42670',
        },
        {
          time: '1751169600',
          value: '42670',
        },
        {
          time: '1751191200',
          value: '42670',
        },
        {
          time: '1751212800',
          value: '42670',
        },
        {
          time: '1751234400',
          value: '42670',
        },
        {
          time: '1751256000',
          value: '42670',
        },
        {
          time: '1751277600',
          value: '42670',
        },
        {
          time: '1751299200',
          value: '42670',
        },
        {
          time: '1751320800',
          value: '42670',
        },
        {
          time: '1751342400',
          value: '42670',
        },
        {
          time: '1751364000',
          value: '42670',
        },
        {
          time: '1751385600',
          value: '42670',
        },
        {
          time: '1751407200',
          value: '42670',
        },
        {
          time: '1751428800',
          value: '42670',
        },
        {
          time: '1751450400',
          value: '42670',
        },
        {
          time: '1751472000',
          value: '42670',
        },
        {
          time: '1751493600',
          value: '42670',
        },
        {
          time: '1751515200',
          value: '42670',
        },
        {
          time: '1751536800',
          value: '42670',
        },
        {
          time: '1751558400',
          value: '42670',
        },
        {
          time: '1751580000',
          value: '42670',
        },
        {
          time: '1751601600',
          value: '50636',
        },
        {
          time: '1751623200',
          value: '50636',
        },
        {
          time: '1751644800',
          value: '50636',
        },
        {
          time: '1751666400',
          value: '50636',
        },
        {
          time: '1751688000',
          value: '50636',
        },
        {
          time: '1751709600',
          value: '50636',
        },
        {
          time: '1751731200',
          value: '50636',
        },
        {
          time: '1751752800',
          value: '50636',
        },
        {
          time: '1751774400',
          value: '50636',
        },
        {
          time: '1751796000',
          value: '50636',
        },
        {
          time: '1751817600',
          value: '50636',
        },
        {
          time: '1751839200',
          value: '50636',
        },
        {
          time: '1751860800',
          value: '50636',
        },
        {
          time: '1751882400',
          value: '50755',
        },
        {
          time: '1751904000',
          value: '50755',
        },
        {
          time: '1751925600',
          value: '50755',
        },
        {
          time: '1751947200',
          value: '50636',
        },
        {
          time: '1751968800',
          value: '50636',
        },
        {
          time: '1751990400',
          value: '50636',
        },
        {
          time: '1752012000',
          value: '50636',
        },
        {
          time: '1752033600',
          value: '50636',
        },
        {
          time: '1752055200',
          value: '50636',
        },
        {
          time: '1752076800',
          value: '50636',
        },
        {
          time: '1752098400',
          value: '50636',
        },
        {
          time: '1752120000',
          value: '50636',
        },
        {
          time: '1752141600',
          value: '50636',
        },
        {
          time: '1752163200',
          value: '50636',
        },
        {
          time: '1752184800',
          value: '50636',
        },
        {
          time: '1752206400',
          value: '50636',
        },
        {
          time: '1752228000',
          value: '50636',
        },
        {
          time: '1752249600',
          value: '50636',
        },
        {
          time: '1752271200',
          value: '50636',
        },
        {
          time: '1752292800',
          value: '50636',
        },
        {
          time: '1752314400',
          value: '50636',
        },
        {
          time: '1752336000',
          value: '50636',
        },
        {
          time: '1752357600',
          value: '50636',
        },
        {
          time: '1752379200',
          value: '50636',
        },
        {
          time: '1752400800',
          value: '50636',
        },
        {
          time: '1752422400',
          value: '50636',
        },
        {
          time: '1752444000',
          value: '50636',
        },
        {
          time: '1752465600',
          value: '50636',
        },
        {
          time: '1752487200',
          value: '50636',
        },
        {
          time: '1752508800',
          value: '50636',
        },
        {
          time: '1752530400',
          value: '50636',
        },
        {
          time: '1752552000',
          value: '50636',
        },
        {
          time: '1752573600',
          value: '50636',
        },
        {
          time: '1752595200',
          value: '50636',
        },
        {
          time: '1752616800',
          value: '50636',
        },
        {
          time: '1752638400',
          value: '50636',
        },
        {
          time: '1752660000',
          value: '50636',
        },
        {
          time: '1752681600',
          value: '50636',
        },
        {
          time: '1752703200',
          value: '50636',
        },
        {
          time: '1752724800',
          value: '50636',
        },
        {
          time: '1752746400',
          value: '50636',
        },
        {
          time: '1752768000',
          value: '50636',
        },
        {
          time: '1752789600',
          value: '50636',
        },
        {
          time: '1752811200',
          value: '50636',
        },
        {
          time: '1752832800',
          value: '50636',
        },
        {
          time: '1752854400',
          value: '50636',
        },
        {
          time: '1752876000',
          value: '50636',
        },
        {
          time: '1752897600',
          value: '50636',
        },
        {
          time: '1752919200',
          value: '50636',
        },
        {
          time: '1752940800',
          value: '50636',
        },
        {
          time: '1752962400',
          value: '50636',
        },
        {
          time: '1752984000',
          value: '50636',
        },
        {
          time: '1753005600',
          value: '50636',
        },
        {
          time: '1753027200',
          value: '50636',
        },
        {
          time: '1753048800',
          value: '50636',
        },
        {
          time: '1753070400',
          value: '50636',
        },
        {
          time: '1753092000',
          value: '50636',
        },
        {
          time: '1753113600',
          value: '50636',
        },
        {
          time: '1753135200',
          value: '50636',
        },
        {
          time: '1753156800',
          value: '50636',
        },
        {
          time: '1753178400',
          value: '50636',
        },
        {
          time: '1753200000',
          value: '50636',
        },
        {
          time: '1753221600',
          value: '50636',
        },
        {
          time: '1753243200',
          value: '50641',
        },
        {
          time: '1753264800',
          value: '50641',
        },
        {
          time: '1753286400',
          value: '50641',
        },
        {
          time: '1753308000',
          value: '50641',
        },
        {
          time: '1753351200',
          value: '50641',
        },
        {
          time: '1753372800',
          value: '50641',
        },
        {
          time: '1753394400',
          value: '50641',
        },
      ],
    },
  ]

  objectSize.value = [
    {
      tenant: 'zhou',
      timeValue: [
        {
          time: '1750867200',
          value: '103441763540',
        },
        {
          time: '1750888800',
          value: '103441763540',
        },
        {
          time: '1750910400',
          value: '103441763540',
        },
        {
          time: '1750932000',
          value: '103441763540',
        },
        {
          time: '1750953600',
          value: '103441763540',
        },
        {
          time: '1750975200',
          value: '103441763540',
        },
        {
          time: '1750996800',
          value: '103441763540',
        },
        {
          time: '1751018400',
          value: '103441763540',
        },
        {
          time: '1751040000',
          value: '103441763540',
        },
        {
          time: '1751061600',
          value: '103441763540',
        },
        {
          time: '1751083200',
          value: '103441763540',
        },
        {
          time: '1751104800',
          value: '103441763540',
        },
        {
          time: '1751126400',
          value: '103441763540',
        },
        {
          time: '1751148000',
          value: '103441763540',
        },
        {
          time: '1751169600',
          value: '103441763540',
        },
        {
          time: '1751191200',
          value: '103441763540',
        },
        {
          time: '1751212800',
          value: '103441763540',
        },
        {
          time: '1751234400',
          value: '103441763540',
        },
        {
          time: '1751256000',
          value: '103441763540',
        },
        {
          time: '1751277600',
          value: '103441763540',
        },
        {
          time: '1751299200',
          value: '103441763540',
        },
        {
          time: '1751320800',
          value: '103441763540',
        },
        {
          time: '1751342400',
          value: '103441763540',
        },
        {
          time: '1751364000',
          value: '103441763540',
        },
        {
          time: '1751385600',
          value: '103441763540',
        },
        {
          time: '1751407200',
          value: '103441763540',
        },
        {
          time: '1751428800',
          value: '103441763540',
        },
        {
          time: '1751450400',
          value: '103441763540',
        },
        {
          time: '1751472000',
          value: '103441763540',
        },
        {
          time: '1751493600',
          value: '103441763540',
        },
        {
          time: '1751515200',
          value: '103441763540',
        },
        {
          time: '1751536800',
          value: '103441763540',
        },
        {
          time: '1751558400',
          value: '103441763540',
        },
        {
          time: '1751580000',
          value: '103441763540',
        },
        {
          time: '1751601600',
          value: '237089066196',
        },
        {
          time: '1751623200',
          value: '237089066196',
        },
        {
          time: '1751644800',
          value: '237089066196',
        },
        {
          time: '1751666400',
          value: '237089066196',
        },
        {
          time: '1751688000',
          value: '237089066196',
        },
        {
          time: '1751709600',
          value: '237089066196',
        },
        {
          time: '1751731200',
          value: '237089066196',
        },
        {
          time: '1751752800',
          value: '237089066196',
        },
        {
          time: '1751774400',
          value: '237089066196',
        },
        {
          time: '1751796000',
          value: '237089066196',
        },
        {
          time: '1751817600',
          value: '237089066196',
        },
        {
          time: '1751839200',
          value: '237089066196',
        },
        {
          time: '1751860800',
          value: '237089066196',
        },
        {
          time: '1751882400',
          value: '364864343252',
        },
        {
          time: '1751904000',
          value: '364864343252',
        },
        {
          time: '1751925600',
          value: '364864343252',
        },
        {
          time: '1751947200',
          value: '237089066196',
        },
        {
          time: '1751968800',
          value: '237089066196',
        },
        {
          time: '1751990400',
          value: '237089066196',
        },
        {
          time: '1752012000',
          value: '237089066196',
        },
        {
          time: '1752033600',
          value: '237089066196',
        },
        {
          time: '1752055200',
          value: '237089066196',
        },
        {
          time: '1752076800',
          value: '237089066196',
        },
        {
          time: '1752098400',
          value: '237089066196',
        },
        {
          time: '1752120000',
          value: '237089066196',
        },
        {
          time: '1752141600',
          value: '237089066196',
        },
        {
          time: '1752163200',
          value: '237089066196',
        },
        {
          time: '1752184800',
          value: '237089066196',
        },
        {
          time: '1752206400',
          value: '237089066196',
        },
        {
          time: '1752228000',
          value: '237089066196',
        },
        {
          time: '1752249600',
          value: '237089066196',
        },
        {
          time: '1752271200',
          value: '237089066196',
        },
        {
          time: '1752292800',
          value: '237089066196',
        },
        {
          time: '1752314400',
          value: '237089066196',
        },
        {
          time: '1752336000',
          value: '237089066196',
        },
        {
          time: '1752357600',
          value: '237089066196',
        },
        {
          time: '1752379200',
          value: '237089066196',
        },
        {
          time: '1752400800',
          value: '237089066196',
        },
        {
          time: '1752422400',
          value: '237089066196',
        },
        {
          time: '1752444000',
          value: '237089066196',
        },
        {
          time: '1752465600',
          value: '237089066196',
        },
        {
          time: '1752487200',
          value: '237089066196',
        },
        {
          time: '1752508800',
          value: '237089066196',
        },
        {
          time: '1752530400',
          value: '237089066196',
        },
        {
          time: '1752552000',
          value: '237089066196',
        },
        {
          time: '1752573600',
          value: '237089066196',
        },
        {
          time: '1752595200',
          value: '237089066196',
        },
        {
          time: '1752616800',
          value: '237089066196',
        },
        {
          time: '1752638400',
          value: '237089066196',
        },
        {
          time: '1752660000',
          value: '237089066196',
        },
        {
          time: '1752681600',
          value: '237089066196',
        },
        {
          time: '1752703200',
          value: '237089066196',
        },
        {
          time: '1752724800',
          value: '237089066196',
        },
        {
          time: '1752746400',
          value: '237089066196',
        },
        {
          time: '1752768000',
          value: '237089066196',
        },
        {
          time: '1752789600',
          value: '237089066196',
        },
        {
          time: '1752811200',
          value: '237089066196',
        },
        {
          time: '1752832800',
          value: '237089066196',
        },
        {
          time: '1752854400',
          value: '237089066196',
        },
        {
          time: '1752876000',
          value: '237089066196',
        },
        {
          time: '1752897600',
          value: '237089066196',
        },
        {
          time: '1752919200',
          value: '237089066196',
        },
        {
          time: '1752940800',
          value: '237089066196',
        },
        {
          time: '1752962400',
          value: '237089066196',
        },
        {
          time: '1752984000',
          value: '237089066196',
        },
        {
          time: '1753005600',
          value: '237089066196',
        },
        {
          time: '1753027200',
          value: '237089066196',
        },
        {
          time: '1753048800',
          value: '237089066196',
        },
        {
          time: '1753070400',
          value: '237089066196',
        },
        {
          time: '1753092000',
          value: '237089066196',
        },
        {
          time: '1753113600',
          value: '237089066196',
        },
        {
          time: '1753135200',
          value: '237089066196',
        },
        {
          time: '1753156800',
          value: '237089066196',
        },
        {
          time: '1753178400',
          value: '237089066196',
        },
        {
          time: '1753200000',
          value: '237089066196',
        },
        {
          time: '1753221600',
          value: '237089066196',
        },
        {
          time: '1753243200',
          value: '237089503371',
        },
        {
          time: '1753264800',
          value: '237089503371',
        },
        {
          time: '1753286400',
          value: '237089503371',
        },
        {
          time: '1753308000',
          value: '237089503371',
        },
        {
          time: '1753351200',
          value: '237089503371',
        },
        {
          time: '1753372800',
          value: '237089503371',
        },
        {
          time: '1753394400',
          value: '237089503371',
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
