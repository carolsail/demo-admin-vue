<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="Password" name="password">
                <password />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Account from './components/Account'
import Password from './components/Password'

export default {
  name: 'Profile',
  components: { Account, Password },
  data() {
    return {
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
