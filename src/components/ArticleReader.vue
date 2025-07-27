<template>
  <div class="article-reader">
    <div class="reader-header">
      <div class="article-info">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-date">{{ article.date }}</span>
          <span class="meta-divider">·</span>
          <span class="meta-read-time">{{ article.readTime }}</span>
          <span class="meta-divider">·</span>
          <span class="meta-author">YouR</span>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="reader-content">
      <MarkdownRenderer :src="article.mdFile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/stores/articles'
import MarkdownRenderer from './MarkdownRenderer.vue'

interface Props {
  article: Article
}

const props = defineProps<Props>()
</script>

<style scoped>
.article-reader {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.reader-header {
  padding-bottom: 32px;
  border-bottom: 1px solid #333;
  margin-bottom: 32px;
}

.article-info {
  text-align: center;
}

.article-title {
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.article-meta {
  color: #888;
  font-size: 14px;
  margin-bottom: 16px;
}

.meta-divider {
  margin: 0 8px;
}

.article-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  background-color: #2d3748;
  color: #90bf5b;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
}

.reader-content {
  /* MarkdownRenderer组件会处理自己的样式 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-reader {
    padding: 16px;
  }
  
  .article-title {
    font-size: 24px;
  }
  
  .article-tags {
    justify-content: flex-start;
  }
}
</style> 