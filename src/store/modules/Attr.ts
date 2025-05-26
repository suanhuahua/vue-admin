import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Attr } from '@/api/product/attr/type';

const useAttrStore = defineStore('Attr', () => {
    const attrList = ref<Attr[]>([]);

    const setAttrList = (list: Attr[]) => {
        attrList.value = list;
    };

    return {
        attrList,
        setAttrList
    };
});

export default useAttrStore; 