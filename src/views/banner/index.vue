<template>
  <div class="app-container">
    <Table v-bind="{ api, op, url }">
      <!-- 检索条件 -->
      <template #filter-item="{ filter, getList, pickerOptions }">
        <el-date-picker
          v-model="filter.create_time"
          type="daterange"
          value-format="yyyy-MM-dd"
          align="left"
          unlink-panels
          range-separator="to"
          start-placeholder="Start"
          end-placeholder="End"
          :picker-options="pickerOptions"
          size="small"
        />
        <el-input v-model="filter.name" placeholder="Name" style="width: 200px;" class="filter-item" size="small" @keyup.enter.native="getList()" />
      </template>
      <!-- table展示项 -->
      <template #table-item>
        <el-table-column align="center" label="ID" width="95" prop="id" sortable>
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="Create Time" align="center" width="150px" prop="create_time" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Name">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Preview">
          <template slot-scope="scope">
            <a :href="scope.row.img" target="_blank">
              <el-image style="width:80px;" :src="scope.row.img" :fit="'fill'" />
            </a>
          </template>
        </el-table-column>
      </template>
    </Table>
  </div>
</template>

<script>
import Api from '@/api/Banner'
import Table from '@/components/Table'

export default {
  components: { Table },
  data() {
    return {
      api: Api,
      op: {
        name: 'like',
        create_time: 'RANGE'
      },
      url: {
        create: '/banner/create',
        edit: '/banner/edit'
      }
    }
  }
}
</script>
