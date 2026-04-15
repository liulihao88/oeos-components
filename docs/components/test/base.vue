<script setup lang="tsx">
import { ref } from 'vue'

const handleEdit = (row) => {
  console.log('编辑', row)
}

const data = ref([
  {
    id: 1,
    name: '张三',
    projectName: '智能风控分析平台一期建设',
    owner: '王小明',
    department: '产品研发中心',
    progress: '进行中',
    status: 1,
    startTime: '2026-04-01 09:00:00',
    endTime: '2026-06-30 18:00:00',
    city: '北京市朝阳区',
    budget: '1200000',
    remark: '需要重点关注接口稳定性与交付节奏',
  },
  {
    id: 2,
    name: '李四',
    projectName: '多租户数据看板升级与指标治理项目',
    owner: '刘海洋',
    department: '数据中台部',
    progress: '已延期',
    status: 0,
    startTime: '2026-03-15 10:30:00',
    endTime: '2026-07-20 19:30:00',
    city: '上海市浦东新区',
    budget: '860000',
    remark: '指标口径仍在持续对齐中',
  },
  {
    id: 3,
    name: '王五',
    projectName: '统一权限中心与审计留痕能力补齐',
    owner: '赵敏',
    department: '基础架构部',
    progress: '已完成',
    status: 1,
    startTime: '2026-02-10 08:00:00',
    endTime: '2026-05-18 17:30:00',
    city: '深圳市南山区',
    budget: '540000',
    remark: '已完成上线验收',
  },
])

const columns = [
  {
    label: '编号',
    prop: 'id',
    sortable: true,
  },
  {
    label: '姓名',
    prop: 'name',
    sortable: true,
  },
  {
    label: '项目名称项目名称项目名称项目名称',
    prop: 'projectName',
    sortable: true,
  },
  {
    label: '负责人',
    prop: 'owner',
    sortable: true,
  },
  {
    label: '所属部门',
    prop: 'department',
  },
  {
    label: '当前进度状态说明',
    prop: 'progress',
    sortable: true,
  },
  {
    label: '开始时间',
    prop: 'startTime',
    sortable: true,
  },
  {
    label: '结束时间结束时间结束时间',
    prop: 'endTime',
    sortable: true,
  },
  {
    label: '所在城市区域',
    prop: 'city',
  },
  {
    label: '预算金额(元)',
    prop: 'budget',
    sortable: true,
  },
  {
    label: '备注说明备注说明备注说明',
    prop: 'remark',
  },
  {
    key: 'operation',
    label: '操作',
    btns: [
      {
        width: 50,
        render: ({ row }) => {
          const canEdit = row.status === 1

          return (
            <span
              style={{
                color: canEdit ? 'var(--blue)' : 'red',
                cursor: canEdit ? 'pointer' : 'not-allowed',
              }}
              onClick={() => {
                if (!canEdit) return
                handleEdit(row)
              }}
            >
              编辑
            </span>
          )
        },
      },
    ],
  },
]
</script>

<template>
  <div>
    <o-table :columns="columns" :data="data" :show-page="false" />
  </div>
</template>
