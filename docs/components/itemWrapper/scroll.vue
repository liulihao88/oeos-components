<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper gap="20px" :minWidth="'200px'">
    <OItem label="label" value="value" ></OItem>
    <OItem label="label" value="value" ></OItem>
    <OItem label="label" value="value" ></OItem>
    <OItem label="label" value="value" ></OItem>
    <OItem label="label" value="value" ></OItem>
  </oItemWrapper>

  <o-title title="或者每个item单独设置">

  </o-title>

  <oItemWrapper gap="20px" >
    <OItem label="label" value="value" :style="{minWidth: '200px'}" ></OItem>
    <OItem label="label" value="value" :style="{minWidth: '200px'}" ></OItem>
    <OItem label="label" value="value" :style="{minWidth: '200px'}" ></OItem>
    <OItem label="label" value="value" :style="{minWidth: '200px'}" ></OItem>
    <OItem label="label" value="value" :style="{minWidth: '200px'}" ></OItem>
  </oItemWrapper>
</template>

<style lang="scss" scoped></style>
