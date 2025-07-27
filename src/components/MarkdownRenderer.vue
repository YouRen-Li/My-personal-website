<template>
  <div class="markdown-container">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else v-html="renderedHtml" class="markdown-content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { parseMarkdown } from '@/utils/markdownParser'

interface Props {
  src: string // markdown文件路径
}

const props = defineProps<Props>()

const renderedHtml = ref('')
const loading = ref(true)
const error = ref('')

// 配置markdown-it
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用外部默认转义
  }
})

const loadMarkdown = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // 从public目录加载markdown文件
    const response = await fetch(props.src)
    if (!response.ok) {
      throw new Error(`无法加载文件: ${props.src}`)
    }
    
    const markdownText = await response.text()
    
    // 解析frontmatter，只渲染内容部分
    const { content } = parseMarkdown(markdownText)
    renderedHtml.value = md.render(content)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMarkdown()
})
</script>

<style scoped>
.markdown-container {
  width: 100%;
  height: 100%;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #999;
}

.error {
  color: #f56565;
}

.markdown-content {
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 8px;
  color: #ffffff;
  font-family: "XiaWuWenKai", sans-serif;
  line-height: 1.6;
}

/* Markdown样式 */
.markdown-content :deep(h1) {
  color: #35c5d9;
  border-bottom: 2px solid #35c5d9;
  padding-bottom: 8px;
  margin-bottom: 16px;
}

.markdown-content :deep(h2) {
  color: #90bf5b;
  margin-top: 24px;
  margin-bottom: 12px;
}

.markdown-content :deep(h3) {
  color: #ffd700;
  margin-top: 20px;
  margin-bottom: 10px;
}

.markdown-content :deep(p) {
  margin-bottom: 12px;
  color: #e0e0e0;
}

.markdown-content :deep(ul, ol) {
  margin-left: 20px;
  margin-bottom: 12px;
}

.markdown-content :deep(li) {
  color: #e0e0e0;
  margin-bottom: 4px;
}

.markdown-content :deep(code) {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.markdown-content :deep(pre) {
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #35c5d9;
  padding-left: 16px;
  margin: 12px 0;
  color: #a0a0a0;
  font-style: italic;
}

.markdown-content :deep(a) {
  color: #35c5d9;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}
</style> 