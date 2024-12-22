<template>
  <!-- 导航栏 -->
  <div id="menu">

    <!-- 导航栏菜单 -->
    <el-row>
      <el-col :span="24">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#545c64"
          text-color="#ffffffbf" active-text-color="#35c5d9" id="el-menu" router :ellipsis="false">
          <el-menu-item index="/" id="home">友人的时光</el-menu-item>
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
      <el-col :span="12">
        <el-row>
          <el-col :span="12" id="avatar">
            <img src="./assets/image/半面夏娜 (1)-new.png" alt="">
            <el-text class="mx-1">YouR</el-text>
            <div id="point"></div>
            <el-text id="mx-2">我有许多想做的事情</el-text>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6"></el-col>
        </el-row>

      </el-col>

      <!-- 路由跳转组件页面 -->
      <el-col :span="12"><router-view></router-view></el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeIndex = ref('1')
</script>

<style lang="scss">
body {
  height: 1000px;
}

// 背景
#menu {
  height: 360px;
  background-image: url(./assets/image/洛天依星空.png);
  background-size: cover; // 使图片填充整个容器，保持宽高比
  background-position: center; // 居中显示图片
  background-repeat: no-repeat;
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
  width: 80%;
  margin: auto;
  margin-top: 100px;

}

#avatar {
  width: 381px;
  height: 763px;
  background-color: #141820;
  border-radius: 10px;
}

#avatar img {
  width: 87%;
  height: 300px;
  margin: 7%;
  border-radius: 10px;
}

.mx-1 {
  display: block;
  margin-left: 44%;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
}

#point {
  width: 25px;
  height: 5px;
  background-color: #90bf5b;
  margin-left: 48%;
  margin-top: 15px;
  border-radius: 10px;
}

#mx-2 {
  display: block;
  margin-left: 30%;
  margin-top: 15px;
  color: #999a9a;
  font-size: 16px;
  font-weight: 700;
}
</style>
