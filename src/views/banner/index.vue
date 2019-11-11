<template>
  <div class="app-container">
    <sail-table v-bind="{ api, op, url }">
      <!-- 检索条件 -->
      <template #filter-item="{ filter, handleFilter }">
        <sail-date-picker ref="datepicker" v-model="filter.create_time" @handleFilter="handleFilter()" />
        <el-input v-model="filter.name" placeholder="Name" style="width: 200px;" class="filter-item" size="small" @keyup.enter.native="handleFilter()" />
      </template>
      <!-- table展示项 -->
      <template #table-item>
        <el-table-column type="selection" align="center" width="55" />
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
            <a :href="scope.row.img | prefixImage" target="_blank">
              <el-image v-if="scope.row.img" style="max-width:80px;" :src="scope.row.img | prefixImage" :fit="'fill'" />
            </a>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>{{ scope.row.description }}</div>
          </template>
        </el-table-column>
      </template>
    </sail-table>
  </div>
</template>

<script>
import Api from '@/api/Banner'
import SailTable from '@/components/SailTable'
import SailDatePicker from '@/components/SailDatePicker'

export default {
  components: { SailTable, SailDatePicker },
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
