import Pagination from '@/components/Pagination/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from '@/components/Category/index.vue'
const allGlobalComponent = { SvgIcon, Pagination, Category }
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach(key => {
      app.component(key, allGlobalComponent[key as keyof typeof allGlobalComponent])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
