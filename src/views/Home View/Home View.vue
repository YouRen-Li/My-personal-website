<template>
  <div class="home-container">
    <!-- 文章阅读模式 -->
    <ArticleReader 
      v-if="articleStore.isReadingMode && articleStore.currentArticle" 
      :article="articleStore.currentArticle"
    />
    
    <!-- 文章列表模式 -->
    <div v-else class="articles-list">
      <div class="list-header">
        <h2 class="list-title">最新文章</h2>
        <p class="list-subtitle">分享技术、生活与思考</p>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="articleStore.loading" class="loading-state">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <p>加载文章中...</p>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="articleStore.error" class="error-state">
        <el-icon class="error-icon"><Warning /></el-icon>
        <p>{{ articleStore.error }}</p>
        <el-button @click="articleStore.loadArticles()" type="primary">重新加载</el-button>
      </div>
      
      <!-- 文章列表 -->
      <div v-else class="articles-grid">
        <ArticleCard 
          v-for="article in articleStore.articles" 
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { Loading, Warning, Document } from '@element-plus/icons-vue'
import { useArticleStore } from '@/stores/articles'
import ArticleCard from '@/components/ArticleCard.vue'
import ArticleReader from '@/components/ArticleReader.vue'

const articleStore = useArticleStore()
const route = useRoute()

// 在Home组件中也添加路由监听
watch(() => route.path, (newPath) => {
  console.log('Home组件检测到路由变化:', newPath)
  if (newPath === '/' && articleStore.isReadingMode) {
    console.log('Home组件：强制退出阅读模式')
    articleStore.exitReadingMode()
  }
})

// 监听阅读模式状态变化
watch(() => articleStore.isReadingMode, (newMode) => {
  console.log('阅读模式状态变化:', newMode)
})
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  padding: 20px 40px 20px 20px; /* 右侧增加更多内边距 */
  background: transparent; /* 确保背景透明 */
}

.articles-list {
  max-width: 100%; /* 利用更多可用空间 */
  margin: 0;
  background: transparent; /* 确保背景透明 */
}

.list-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #333;
}

.list-title {
  color: #ffffff;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.list-subtitle {
  color: #888;
  font-size: 16px;
  margin: 0;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 状态显示样式 */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.loading-icon,
.error-icon,
.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #666;
}

.loading-icon {
  animation: spin 1s linear infinite;
  color: #35c5d9;
}

.error-icon {
  color: #f56565;
}

.empty-icon {
  color: #888;
}

.loading-state p,
.error-state p,
.empty-state p {
  font-size: 16px;
  margin: 8px 0;
}

.empty-hint {
  font-size: 14px;
  color: #666;
  margin-top: 16px;
}

.empty-hint code {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }
  
  .list-title {
    font-size: 24px;
  }
  
  .list-subtitle {
    font-size: 14px;
  }
  
  .loading-state,
  .error-state,
  .empty-state {
    padding: 40px 16px;
  }
  
  .loading-icon,
  .error-icon,
  .empty-icon {
    font-size: 36px;
  }
}
</style>