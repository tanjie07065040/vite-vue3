<template>
  <div class="layout">
    <div class="header" :style="{
      background: 'url(' + headerBg + ')',
      'background-repeat': 'no-repeat',
      'background-size': '100% 124px',
    }">
      <div class="left">
        <div class="time">{{ currentTime }}</div>
        <div class="line"></div>
        <div class="date">{{ currentDate }}</div>
        <div class="line"></div>
        <div class="week">{{ currentWeek }}</div>
        <div class="line"></div>
        <div class="weather">{{ currentWeather }}</div>
      </div>
      <div class="title" :style="{
        background: 'url(' + titleBg + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
      }"></div>
      <div class="right">
        <div class="district">{{ currentDistrict }}</div>
        <div class="line"></div>
        <div class="userinfo">{{ currentLoginInfo.name }}</div>
        <a-popconfirm title="确定要退出系统吗?" @confirm="logout" okText="确定" cancelText="取消">
          <div class="exit">
            <div><img src="../assets/exit.png" /></div>
          </div>
        </a-popconfirm>
        <div class="line"></div>
        <div class="applink" @click="showModal">
          <div><img src="../assets/list.png" /></div>
        </div>
      </div>
      <video :src="webmBg" autoplay loop muted></video>
    </div>
    <div class="content">
      <router-view />
    </div>
    <!-- 系统切换 -->
    <div id="bbox" ref="bbox">
      <a-modal class="change-system" v-model:visible="visible" title="系统切换" footer="" :getContainer="() => $refs.bbox"
        destroyOnClose>
        <div class="system-box">
          <div class="tool composite" :class="[
              {
                'composite-active': selectData === 'composite',
              },
            ]" @click="selectFunc('composite')">
            <div class="title-box">{{ currentAppLink[0].name }}</div>
          </div>
          <div class="tool firecontrol" :class="[
              {
                'firecontrol-active': selectData === 'firecontrol',
              },
            ]" @click="selectFunc('firecontrol')">
            <div class="title-box">{{ currentAppLink[9].name }}</div>
          </div>
          <div class="tool elevator" :class="[
              {
                'elevator-active': selectData === 'elevator',
              },
            ]" @click="selectFunc('elevator')">
            <div class="title-box">{{ currentAppLink[10].name }}</div>
          </div>
          <div class="tool populationdensity" :class="[
              {
                'populationdensity-active': selectData === 'populationdensity',
              },
            ]" @click="selectFunc('populationdensity')">
            <div class="title-box">{{ currentAppLink[8].name }}</div>
          </div>
          <div class="tool traffic" :class="[
              {
                'traffic-active': selectData === 'traffic',
              },
            ]" @click="selectFunc('traffic')">
            <div class="title-box">{{ currentAppLink[2].name }}</div>
          </div>
          <div class="tool chemical" :class="[
              {
                'chemical-active': selectData === 'chemical',
              },
            ]" @click="selectFunc('chemical')">
            <div class="title-box">{{ currentAppLink[3].name }}</div>
          </div>
          <div class="tool tailingspond" :class="[
              {
                'tailingspond-active': selectData === 'tailingspond',
              },
            ]" @click="selectFunc('tailingspond')">
            <div class="title-box">{{ currentAppLink[4].name }}</div>
          </div>
          <div class="tool industrial" :class="[
              {
                'industrial-active': selectData === 'industrial',
              },
            ]" @click="selectFunc('industrial')">
            <div class="title-box">{{ currentAppLink[7].name }}</div>
          </div>

          <div class="tool flood" :class="[
              {
                'flood-active': selectData === 'flood',
              },
            ]" @click="selectFunc('flood')">
            <div class="title-box">{{ currentAppLink[1].name }}</div>
          </div>

          <div class="tool forest" :class="[
              {
                'forest-active': selectData === 'forest',
              },
            ]" @click="selectFunc('forest')">
            <div class="title-box">{{ currentAppLink[6].name }}</div>
          </div>

          <div class="tool geodisaster" :class="[
              {
                'geodisaster-active': selectData === 'geodisaster',
              },
            ]" @click="selectFunc('geodisaster')">
            <div class="title-box">{{ currentAppLink[5].name }}</div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
<script src="./Index.ts">

</script>

<style lang="less" scoped>
@import url('./Dashboard.less');
</style>
