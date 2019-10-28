<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.filter.name" placeholder="Name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="currentPage" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { list } from '@/api/banner'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      currentPage: 1,
      listQuery: {
        offset: 0,
        limit: 1,
        filter: {
          name: undefined
        },
        op: {
          name: 'like'
        },
        sort: 'id',
        order: 'desc'
      }
    }
  },
  watch: {
    currentPage(v, old) {
      this.listQuery.offset = (v - 1) * this.listQuery.limit
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.currentPage = 1
      this.getList()
    },
    handleCreate() {
      alert(123)
    },
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
