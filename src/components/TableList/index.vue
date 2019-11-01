<template>
  <div class="table-container">
    <div class="filter-container clearfix">
      <slot name="filter-item" v-bind="listQuery" :getList="getList" :pickerOptions="pickerOptions" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" size="small" @click="handleFilter">Search</el-button>
      <el-button v-waves class="filter-item" type="info" icon="el-icon-refresh" size="small" @click="handleReset">Reset</el-button>
      <el-button v-show="hasAddBtn" v-waves class="filter-item pull-right" type="success" icon="el-icon-plus" size="small" @click="handleCreate">Add</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <slot name="table-item" />
      <el-table-column v-if="hasEditBtn || hasDelBtn" label="Actions" align="center" width="160" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-show="hasEditBtn" type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-show="hasDelBtn" v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDel(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  directives: { waves },
  props: {
    hasAddBtn: {
      type: Boolean,
      default: true
    },
    hasEditBtn: {
      type: Boolean,
      default: true
    },
    hasDelBtn: {
      type: Boolean,
      default: true
    },
    op: {
      type: Object,
      default: () => ({})
    },
    api: {
      type: Object,
      default: () => ({})
    },
    url: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        filter: {},
        op: this.op
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
            this.handleFilter()
          }
        }, {
          text: '最近一个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
            this.handleFilter()
          }
        }, {
          text: '最近三个月',
          onClick: picker => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
            this.handleFilter()
          }
        }],
        onPick: dateRange => {
          this.handleFilter()
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    sortChange(data) {
      const { prop, order } = data
      this.listQuery.sort = prop
      this.listQuery.order = order === 'descending' ? 'desc' : 'asc'
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.page = 1
      this.listQuery.filter = {}
      this.getList()
    },
    handleCreate() {
      if (this.url.create) {
        this.$router.push(this.url.create)
      }
    },
    handleUpdate(row) {
      if (this.url.edit) {
        this.$router.push(this.url.edit, row)
      }
    },
    handleModifyStatus(row, status) {
      alert('update status')
    },
    handleDel(row) {
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        await this.api.delete(row.id)
        this.getList()
      }).catch(err => {
        console.log(err)
      })
    },
    async getList() {
      this.listLoading = true
      try {
        const response = await this.api.list(this.listQuery)
        this.list = response.data.rows
        this.total = response.data.total
      } catch (error) {
        console.log('get list by index api', error)
      }
      this.listLoading = false
    }
  }
}
</script>
