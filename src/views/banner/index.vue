<template>
  <div class="app-container">
    <sail-table v-bind="{ api, op, url }">
      <!-- 检索条件 -->
      <template #filter-item="{ filter, handleFilter }">
        <sail-date-picker v-model="filter.create_time" @handleFilter="handleFilter()" />
        <el-input v-model="filter.name" placeholder="Name" style="width: 200px;" @keyup.enter.native="handleFilter()" />
        <sail-select v-model="filter.is_disabled" v-bind="{ms_selected, ms_options}" style="width: 200px;" @handleFilter="handleFilter()" />
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
import SailSelect from '@/components/SailSelect'

export default {
  components: { SailTable, SailDatePicker, SailSelect },
  data() {
    return {
      api: Api,
      op: {
        name: 'like',
        create_time: 'RANGE',
        is_disabled: '='
      },
      ms_selected: { option: 'no', value: '1' },
      ms_options: [
        { option: 'yes', value: '0' },
        { option: 'no', value: '1' }
      ],
      url: {
        create: '/banner/create',
        edit: '/banner/edit'
      }
    }
  }
}
</script>
