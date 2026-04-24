<template>
  <div class="demo-box">
    <div>
      <div class="demo-label">gap=&quot;12&quot;，数字字符串会自动补 `px`</div>
      <o-item-wrapper gap="12">
        <o-item label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png" />
        <o-item label="label" value="value" />
        <o-item label="label" value="value" />
      </o-item-wrapper>
    </div>

    <div>
      <div class="demo-label">gap=&quot;5%&quot;，保留原始百分比单位</div>
      <o-item-wrapper gap="5%">
        <o-item label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png" />
        <o-item label="label" value="value" />
        <o-item label="label" value="value" />
      </o-item-wrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-label {
  margin-bottom: 8px;
  color: var(--45);
}
</style>
