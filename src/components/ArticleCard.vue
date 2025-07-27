<template>
  <div class="article-card" @click="handleClick">
    <div class="card-cover">
      <img :src="article.coverImage" :alt="article.title" />
      <div class="card-overlay">
        <h2 class="card-title">{{ article.title }}</h2>
        <div class="author-info">
          <span class="author-name">Chlorine</span>
          <div class="author-signature">✓</div>
        </div>
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="content-title">{{ article.title }}</h3>
      <p class="content-description">{{ article.description }}</p>
      
      <div class="card-meta">
        <span class="meta-date">{{ article.date }}</span>
        <span class="meta-read-time">{{ article.readTime }}</span>
      </div>
      
      <div class="card-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/stores/articles'
import { useArticleStore } from '@/stores/articles'

interface Props {
  article: Article
}

const props = defineProps<Props>()
const articleStore = useArticleStore()

const handleClick = () => {
  articleStore.setCurrentArticle(props.article)
}
</script>

<style scoped>
.article-card {
  background-color: rgba(26, 26, 26, 0.95); /* 稍微透明一些 */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  backdrop-filter: blur(5px); /* 添加毛玻璃效果 */
  border: 1px solid rgba(255, 255, 255, 0.1); /* 添加微妙边框 */
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.card-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.card-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  align-self: flex-end;
  margin-top: auto;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.author-name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.author-signature {
  color: #35c5d9;
  font-size: 16px;
  font-weight: bold;
}

.card-content {
  padding: 20px;
}

.content-title {
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.content-description {
  color: #b0b0b0;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

.card-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-date,
.meta-read-time {
  color: #888;
  font-size: 12px;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background-color: #2d3748;
  color: #90bf5b;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
</style> 