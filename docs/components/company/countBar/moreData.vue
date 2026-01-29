<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const objectDisk = ref({})
objectDisk.value = {
  magazineList: [
    '701102',
    '701103',
    '701104',
    '701105',
    'B0D9F0',
    '4E2A7C',
    '8B3D1F',
    'F5C9A2',
    '2D8B6E',
    '6F4C1A',
    '9E7B3F',
    '3C5D2A',
    '7A9B4E',
    '1F6C3D',
    '4B8E2A',
    'D2C7B3',
    '5F3A9E',
    'A7C4D8',
    '3E2B6F',
    '8C1F4E',
    'B6D3A5',
  ],
  magazineInCount: {
    '701102': 807,
    '701103': 3228,
    '701104': 3228,
    '701105': 1883,
    B0D9F0: 11277,
    '4E2A7C': 9342,
    '8B3D1F': 5167,
    F5C9A2: 7723,
    '2D8B6E': 1284,
    '6F4C1A': 6389,
    '9E7B3F': 4051,
    '3C5D2A': 2976,
    '7A9B4E': 8427,
    '1F6C3D': 1653,
    '4B8E2A': 5492,
    D2C7B3: 3115,
    '5F3A9E': 7862,
    A7C4D8: 4209,
    '3E2B6F': 6538,
    '8C1F4E': 1934,
    B6D3A5: 5107,
  },
  magazineInSize: {
    '701102': 37051980327,
    '701103': 12912003228,
    '701104': 12912003228,
    '701105': 7532001883,
    B0D9F0: 22554011277,
    '4E2A7C': 41827364589,
    '8B3D1F': 12634728563,
    F5C9A2: 91736482105,
    '2D8B6E': 72846391754,
    '6F4C1A': 53918364782,
    '9E7B3F': 31265478932,
    '3C5D2A': 84756391827,
    '7A9B4E': 27384659182,
    '1F6C3D': 93756482746,
    '4B8E2A': 65384719283,
    D2C7B3: 42918365478,
    '5F3A9E': 18273645917,
    A7C4D8: 38165472936,
    '3E2B6F': 72543819746,
    '8C1F4E': 45918273645,
    B6D3A5: 19638475298,
  },
  updateTime: 1735624154125,
}
</script>

<template>
  <div>
    <oCountBar
      :data="objectDisk"
      style="min-height: 200px"
      :options="{ count: 'magazineInCount', size: 'magazineInSize' }"
    />
  </div>
</template>
