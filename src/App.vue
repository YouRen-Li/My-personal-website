<template>
  <!-- 导航栏 -->
  <div id="menu">

    <!-- 导航栏菜单 -->
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
          text-color="#ffffffbf" active-text-color="#35c5d9" id="el-menu" router :ellipsis="false">
          <el-menu-item index="/" id="home" @click="handleHomeClick">友人的时光</el-menu-item>
          <div class="flex-grow" />

          <el-sub-menu id="submenu">
            <template #title>归档</template>
            <el-menu-item index="/classify">分类</el-menu-item>
            <el-menu-item index="/time">时间</el-menu-item>
            <el-menu-item index="/label">标签</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/friendlink">友链</el-menu-item>
          <el-menu-item index="/work">碎语</el-menu-item>
          <el-menu-item index="/nowadays">如今</el-menu-item>
          <el-menu-item index="/about">关于</el-menu-item>
          <el-menu-item index="/leave">开往</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="8">
            <el-icon>
              <Moon />
            </el-icon>
          </el-menu-item>

          <el-menu-item index="9">
            <el-icon>
              <Search />
            </el-icon>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

    <!-- 个人信息 -->
    <el-row id="profile">
      <!-- 左侧标签页 -->
      <el-col :span="9" v-show="!articleStore.isReadingMode">
        <div class="avatar-container">
          <div id="avatar">
            <img src="./assets/image/YouR.jpg" alt="">
            <el-text class="mx-1">YouR</el-text>
            <div id="point"></div>
            <el-text id="mx-2">我有许多想做的事情</el-text>
          </div>
        </div>
      </el-col>

      <!-- 路由跳转组件页面 -->
      <el-col :span="articleStore.isReadingMode ? 24 : 15">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/articles'

const activeIndex = ref('1')
const articleStore = useArticleStore()
const route = useRoute()

// 处理首页点击
const handleHomeClick = () => {
  console.log('点击友人的时光，当前阅读模式:', articleStore.isReadingMode)
  if (articleStore.isReadingMode) {
    console.log('强制退出阅读模式')
    articleStore.exitReadingMode()
  }
}

// 监听路由变化，当回到首页时退出阅读模式
watch(() => route.path, (newPath) => {
  console.log('路由变化:', newPath, '当前阅读模式:', articleStore.isReadingMode)
  if (newPath === '/' && articleStore.isReadingMode) {
    console.log('退出阅读模式')
    articleStore.exitReadingMode()
  }
}, { immediate: true })
</script>

<style lang="scss">
// 确保根元素背景透明
html, body {
  background: transparent !important;
  margin: 0 !important;
  padding: 0 !important;
}

body {
  height: 1000px;
  background: transparent; // 设置透明背景，让星空背景透过来
  margin: 0; // 移除默认边距
  padding: 0; // 移除默认内边距
}

// 强制设置app容器背景透明
#app {
  background: transparent !important;
  background-color: transparent !important;
  margin: 0 !important;
  padding: 0 !important;
}

// 背景
#menu {
  min-height: 100vh; // 使用视口高度，确保背景充满整个页面
  background-image: url(./assets/image/洛天依星空.png);
  background-size: cover; // 使图片填充整个容器，保持宽高比
  background-position: center; // 居中显示图片
  background-repeat: no-repeat;
  background-attachment: fixed; // 背景固定，不随滚动移动
}

// 导航栏
#el-menu {
  width: 80%;
  height: 80px;
  background-color: #1f1b22;
  margin: 0 auto;
  border-radius: 0 0 10px 10px;
  border: none !important;
}

#submenu {
  height: 80px;
}


.el-menu-item,
.el-menu--horizontal>.el-sub-menu .el-sub-menu__title {
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  border: none !important;
}

.flex-grow {
  flex-grow: 1;
}

.is-active {
  border: none !important;
  height: 60px;
}

#home {
  margin-left: 20px;
}

// 个人信息
#profile {
  width: 85%;
  margin: auto;
  margin-top: 80px;
  align-items: flex-start; /* 顶部对齐 */
}

.avatar-container {
  display: flex;
  justify-content: center;
  padding-right: 20px;
}

#avatar {
  width: 350px;
  height: auto; /* 自适应内容高度 */
  min-height: 420px; /* 设置最小高度 */
  background-color: #141820;
  border-radius: 10px;
  padding: 20px; /* 添加内边距 */
  display: flex;
  flex-direction: column;
}

#avatar img {
  width: 100%;
  height: 280px;
  margin-bottom: 20px;
  border-radius: 10px;
  object-fit: cover; /* 保持图片比例 */
}

.mx-1 {
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
}

#point {
  width: 25px;
  height: 5px;
  background-color: #90bf5b;
  margin: 15px auto;
  border-radius: 10px;
}

#mx-2 {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #999a9a;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}
</style>
