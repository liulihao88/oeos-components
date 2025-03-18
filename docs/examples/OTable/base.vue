<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const num = ref(0)

// setInterval(() => {
//   num.value++
// }, 3000)

const data = ref([
  { name: '张三', address: '北京市朝阳区' },
  { name: '李四', address: '上海市浦东新区' },
  { name: '王五', address: '广州市天河区' },
  { name: '赵六', address: '深圳市南山区' },
  { name: '孙七', address: '成都市武侯区' },
  { name: '周八', address: '杭州市西湖区' },
  { name: '吴九', address: '南京市玄武区' },
  { name: '郑十', address: '武汉市江汉区' },
  { name: '钱十一', address: '重庆市渝中区' },
  { name: '孔十二', address: '天津市和平区' },
  { name: '孟十三', address: '西安市莲湖区' },
  { name: '包十四', address: '青岛市市北区' },
  { name: '梁十五', address: '大连市中山区' },
  { name: '陈十六', address: '沈阳市和平区' },
  { name: '蒋十七', address: '苏州市姑苏区' },
  { name: '沈十八', address: '长沙市芙蓉区' },
  { name: '韩十九', address: '合肥市庐阳区' },
  { name: '杨二十', address: '福州市鼓楼区' },
  { name: '朱二十一', address: '厦门市思明区' },
  { name: '秦二十二', address: '郑州市金水区' },
  { name: '尤二十三', address: '昆明市五华区' },
  { name: '许二十四', address: '南宁市青秀区' },
  { name: '何二十五', address: '济南市历下区' },
  { name: '吕二十六', address: '海口市龙华区' },
  { name: '施二十七', address: '太原市小店区' },
  { name: '张二十八', address: '石家庄市长安区' },
  { name: '孔二十九', address: '南昌市东湖区' },
  { name: '曹三十', address: '哈尔滨市南岗区' },
  { name: '严三十一', address: '长春市南关区' },
  { name: '华三十二', address: '兰州市城关区' },
  { name: '钱三十三', address: '银川市兴庆区' },
  { name: '沈三十四', address: '乌鲁木齐市天山区' },
  { name: '彭三十五', address: '拉萨市城关区' },
  { name: '任三十六', address: '呼和浩特市新城区' },
  { name: '苏三十七', address: '贵阳市南明区' },
  { name: '罗三十八', address: '南宁市青秀区' },
  { name: '葛三十九', address: '南宁市青秀区' },
  { name: '常四十', address: '南宁市青秀区' },
  { name: '梁四十一', address: '南宁市青秀区' },
  { name: '宗四十二', address: '南宁市青秀区' },
  { name: '凌四十三', address: '南宁市青秀区' },
  { name: '华四十四', address: '南宁市青秀区' },
  { name: '彭四十五', address: '南宁市青秀区' },
  { name: '任四十六', address: '南宁市青秀区' },
  { name: '苏四十七', address: '南宁市青秀区' },
  { name: '罗四十八', address: '南宁市青秀区' },
  { name: '葛四十九', address: '南宁市青秀区' },
  { name: '常五十', address: '南宁市青秀区' },
  { name: '梁五十一', address: '南宁市青秀区' },
  { name: '宗五十二', address: '南宁市青秀区' },
  { name: '凌五十三', address: '南宁市青秀区' },
  { name: '华五十四', address: '南宁市青秀区' },
  { name: '彭五十五', address: '南宁市青秀区' },
  { name: '任五十六', address: '南宁市青秀区' },
  { name: '苏五十七', address: '南宁市青秀区' },
  { name: '罗五十八', address: '南宁市青秀区' },
  { name: '葛五十九', address: '南宁市青秀区' },
  { name: '常六十', address: '南宁市青秀区' },
  { name: '梁六十一', address: '南宁市青秀区' },
  { name: '宗六十二', address: '南宁市青秀区' },
  { name: '凌六十三', address: '南宁市青秀区' },
  { name: '华六十四', address: '南宁市青秀区' },
  { name: '彭六十五', address: '南宁市青秀区' },
  { name: '任六十六', address: '南宁市青秀区' },
  { name: '苏六十七', address: '南宁市青秀区' },
  { name: '罗六十八', address: '南宁市青秀区' },
  { name: '葛六十九', address: '南宁市青秀区' },
  { name: '常七十', address: '南宁市青秀区' },
  { name: '梁七十一', address: '南宁市青秀区' },
  { name: '宗七十二', address: '南宁市青秀区' },
  { name: '凌七十三', address: '南宁市青秀区' },
  { name: '华七十四', address: '南宁市青秀区' },
  { name: '彭七十五', address: '南宁市青秀区' },
  { name: '任七十六', address: '南宁市青秀区' },
  { name: '苏七十七', address: '南宁市青秀区' },
  { name: '罗七十八', address: '南宁市青秀区' },
  { name: '葛七十九', address: '南宁市青秀区' },
  { name: '常八十', address: '南宁市青秀区' },
  { name: '梁八十一', address: '南宁市青秀区' },
  { name: '宗八十二', address: '南宁市青秀区' },
  { name: '凌八十三', address: '南宁市青秀区' },
  { name: '华八十四', address: '南宁市青秀区' },
  { name: '彭八十五', address: '南宁市青秀区' },
  { name: '任八十六', address: '南宁市青秀区' },
  { name: '苏八十七', address: '南宁市青秀区' },
  { name: '罗八十八', address: '南宁市青秀区' },
  { name: '葛八十九', address: '南宁市青秀区' },
  { name: '常九十', address: '南宁市青秀区' },
  { name: '梁九十一', address: '南宁市青秀区' },
])
const columns = [
  {
    label: '名字',
    prop: 'name',
  },
  {
    key: 'operation',
    label: '操作',
    isShow: (row, scope) => {
      return scope.$index % 2 === 0
    },
    btns: [
      {
        content: '编辑',
      },
    ],
  },
]
function editRow(row, scope, evt) {
  console.log(`42 evt`, evt)
  console.log(`46 scope`, scope)
  console.log(`86 row`, row)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="num++">测试13</el-button>
    <o-table
      :columns="columns"
      :data="data"
      ref="tableRef"
      :header-cell-style="{
        textAlign: 'left',
      }"
    ></o-table>
  </div>
</template>

<style scoped lang="scss"></style>
