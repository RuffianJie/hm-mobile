<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile"
                 required
                 clearable
                 label="手机"
                 v-validate="'required'"
                 placeholder="请输入手机号"
                 name="mobile"
                 :error-message="errors.first('mobile')" />

      <van-field v-model="user.code"
                 type="password"
                 label="验证码"
                 v-validate="'required'"
                 placeholder="请输入验证码"
                 :error-message="errors.first('code')"
                 name="code"
                 required />
    </van-cell-group>

    <div class="login-btn">
      <van-button type="info"
                  :loading="isLoginLoading"
                  @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '19831532157',
        code: '246810'
      },
      isLoginLoading: false
    }
  },
  created () {
    // 自定义配置表单验证消息
    this.$validator.localize('zh_CN', {
      custom: {
        mobile: {
          required: '手机号不能为空'
        },
        code: {
          required: '邮箱不能为空'
        }
      }
    })
  },
  methods: {
    ...mapMutations(['setUser']),
    async onLogin () {
      try {
        // 验证规则
        const isValid = await this.$validator.validate()
        if (!isValid) {
          return
        }
        // 提交表单，让登陆按钮 loading
        this.isLoginLoading = true
        // 调用utils/user.js中的函数
        const { data } = await login(this.user)
        // 将登陆成功的用户状态(token)保存到vuex容器中
        this.setUser(data.data)
        // 登陆成功，关闭 loading
        this.isLoginLoading = false
        // 跳转首页
        this.$router.push({ name: 'home' })
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        }
      }
      // 无论登陆成功还是失败，都要把 loading 停止
      this.isLoginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
