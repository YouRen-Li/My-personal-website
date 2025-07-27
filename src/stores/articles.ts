import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { parseMarkdown, generateTitleFromFilename, extractDescription, calculateReadTime } from '@/utils/markdownParser'

export interface Article {
  id: string
  title: string
  description: string
  coverImage: string
  date: string
  readTime: string
  tags: string[]
  mdFile: string
  filename: string
}

export const useArticleStore = defineStore('articles', () => {
  const currentArticle = ref<Article | null>(null)
  const isReadingMode = ref(false)
  const articles = ref<Article[]>([])
  const loading = ref(true)
  const error = ref('')

  // 默认配置 - 导入图片资源以确保正确的路径处理
  const DEFAULT_COVER_IMAGE = new URL('@/assets/image/洛天依星空.png', import.meta.url).href

  // 自动扫描并加载文章，同时检测变化
  const loadArticles = async () => {
    try {
      loading.value = true
      error.value = ''
      
      // 先尝试自动更新索引（如果在开发模式）
      if (import.meta.env.DEV) {
        try {
          await fetch('/api/update-articles', { method: 'POST' })
        } catch {
          // 如果API不可用，忽略错误
        }
      }
      
      // 获取文档索引（添加时间戳防止缓存）
      // 考虑 base 路径配置
      const basePath = import.meta.env.BASE_URL
      const indexResponse = await fetch(`${basePath}docs-index.json?t=${Date.now()}`)
      if (!indexResponse.ok) {
        throw new Error('无法加载文档索引')
      }
      
      const index = await indexResponse.json()
      const articlePromises = index.files.map(async (filename: string) => {
        try {
          const mdFile = `${basePath}docs/${filename}`
          
          // 获取markdown文件内容（添加时间戳防止缓存）
          const mdResponse = await fetch(`${mdFile}?t=${Date.now()}`)
          if (!mdResponse.ok) {
            console.warn(`文章文件不存在: ${mdFile}`)
            return null
          }
          
          const markdownContent = await mdResponse.text()
          const { frontmatter, content } = parseMarkdown(markdownContent)
          
          // 从文件名提取ID
          const id = filename.replace('.md', '')
          
          // 获取默认日期
          const defaultDate = new Date().toISOString().split('T')[0]
          
          const article: Article = {
            id,
            filename: id,
            title: frontmatter.title || generateTitleFromFilename(id),
            description: frontmatter.description || extractDescription(content),
            coverImage: frontmatter.coverImage || DEFAULT_COVER_IMAGE,
            date: frontmatter.date || defaultDate,
            readTime: frontmatter.readTime || calculateReadTime(content),
            tags: frontmatter.tags || [],
            mdFile
          }
          
          return article
        } catch (error) {
          console.warn(`解析文章失败: ${filename}`, error)
          return null
        }
      })
      
      const loadedArticles = await Promise.all(articlePromises)
      articles.value = loadedArticles
        .filter((article): article is Article => article !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期倒序排列
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : '加载文章失败'
      console.error('加载文章失败:', err)
    } finally {
      loading.value = false
    }
  }

  const setCurrentArticle = (article: Article) => {
    currentArticle.value = article
    isReadingMode.value = true
  }

  const exitReadingMode = () => {
    currentArticle.value = null
    isReadingMode.value = false
  }

  // 初始化时加载文章
  loadArticles()

  return {
    articles,
    currentArticle,
    isReadingMode,
    loading,
    error,
    setCurrentArticle,
    exitReadingMode,
    loadArticles
  }
}) 