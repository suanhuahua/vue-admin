import { defineStore } from 'pinia'
import type { SpuData } from '@/api/product/spu/type'

interface SpuState {
    records: SpuData[]
    total: number
}

const useSpuStore = defineStore('spu', {
    state: (): SpuState => ({
        records: [],
        total: 0
    }),

    actions: {
        setRecords(records: SpuData[]) {
            this.records = records
        },

        setTotal(total: number) {
            this.total = total
        },

        clear() {
            this.records = []
            this.total = 0
        }
    }
})

export default useSpuStore