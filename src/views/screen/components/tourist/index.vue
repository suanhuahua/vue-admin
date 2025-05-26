<template>
    <div class="box">
        <div class="top">
            <p>是是游客</p>
            <p class="bg"></p>
            <p class="right">预约总量<span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let charts = ref()
let people = ref('2164494')
onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '水球图',
        },
        xAxis: {

        },
        yAxis: {

        },
        series: {
            type: 'liquidFill',
            data: [0.6],
            radius: '100%'
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style scoped>
.box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;
    margin-top: 20px;
    margin-left: 20px;

    .top {
        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: cover;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        margin-top: 30px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: cover;
            color: #29fccf;
        }
    }

    .charts {
        width: 100%;
        height: 250px;

    }
}
</style>