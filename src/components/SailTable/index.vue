<template>
  <div class="sail-table">
    <div class="filter-container clearfix">
      <el-button v-show="hasAddBtn" v-waves class="filter-item" type="success" icon="el-icon-plus" size="small" @click="handleCreate">Add</el-button>
      <slot name="filter-item" v-bind="listQuery" :handleFilter="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" size="small" @click="handleFilter">Search</el-button>
      <el-button v-waves class="filter-item" type="info" icon="el-icon-refresh" size="small" @click="handleReset">Reset</el-button>
      <el-button v-show="hasBatchDelBtn" v-waves class="filter-item" type="danger" icon="el-icon-delete" size="small" @click="handleBatchDel">Batch Del</el-button>
      <el-button v-show="hasExportBtn" v-waves class="filter-item pull-right" type="warning" icon="el-icon-document-delete" size="small" @click="handleExportExcel">Export</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
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
import { Loading, Message } from 'element-ui'

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
    hasExportBtn: {
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
      multipleSelection: []
    }
  },
  computed: {
    hasBatchDelBtn() {
      return this.multipleSelection.length
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSortChange(data) {
      const { prop, order } = data
      this.listQuery.sort = prop
      this.listQuery.order = order === 'descending' ? 'desc' : 'asc'
      this.handleFilter()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
        this.$router.push(this.url.edit + '/' + row.id)
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
    handleBatchDel() {
      const loadingInstance = Loading.service()
      this.$confirm('Are you sure?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async() => {
        let ids = ''
        this.multipleSelection.forEach((e, k) => {
          ids += e.id + ','
        })
        ids = ids.substring(0, ids.lastIndexOf(','))
        await this.api.delete(ids)
        this.getList()
        loadingInstance.close()
      }).catch(err => {
        console.log(err)
        loadingInstance.close()
      })
    },
    async handleExportExcel() {
      if (!Object.keys(this.listQuery.filter).length) {
        Message({
          message: '请进行数据筛选',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      const response = await this.api.export({ filter: this.listQuery.filter, op: this.op })
      if (response.data.val) {
        window.location.href = response.data.val
      }
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

<style scoped>
.el-button+.el-button {
  margin-left: 0;
}
</style>
