import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('settingStore', {
  state() {
    return {
      fold: false
    }
  }
})

export default useLayoutSettingStore
