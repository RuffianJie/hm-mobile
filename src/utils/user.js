const USER_KEY = 'user'

// 获取用户信息
export const getUse = () => JSON.parse(window.localStorage.getItem(USER_KEY))

// 设置用户信息
export const saveUser = data =>
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))

// 清除用户信息
export const clearUser = data => window.localStorage.removeItem(USER_KEY)
