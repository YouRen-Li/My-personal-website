import * as yaml from 'js-yaml'

export interface ArticleFrontmatter {
  title?: string
  description?: string
  coverImage?: string
  date?: string
  readTime?: string
  tags?: string[]
}

export interface ParsedMarkdown {
  frontmatter: ArticleFrontmatter
  content: string
}

/**
 * 解析Markdown文件的frontmatter和内容
 */
export function parseMarkdown(markdownText: string): ParsedMarkdown {
  // 更健壮的frontmatter正则表达式，支持不同换行符
  const frontmatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/
  const match = markdownText.match(frontmatterRegex)
  
  if (match) {
    try {
      const frontmatterYaml = match[1].trim()
      const content = match[2].trim()
      const frontmatter = yaml.load(frontmatterYaml) as ArticleFrontmatter || {}
      
      return {
        frontmatter,
        content
      }
    } catch (error) {
      console.warn('解析frontmatter失败:', error)
      return {
        frontmatter: {},
        content: markdownText
      }
    }
  }
  
  // 如果没有frontmatter，直接返回原始内容
  return {
    frontmatter: {},
    content: markdownText
  }
}

/**
 * 从文件名生成默认的文章标题
 */
export function generateTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * 从markdown内容中提取描述（取第一个段落）
 */
export function extractDescription(content: string, maxLength: number = 100): string {
  // 移除markdown标记和多余空白
  const plainText = content
    .replace(/^#+\s+.*/gm, '') // 移除标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除加粗
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体
    .replace(/`(.*?)`/g, '$1') // 移除行内代码
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/^\s*[-*+]\s+/gm, '') // 移除列表标记
    .replace(/^\s*\d+\.\s+/gm, '') // 移除数字列表
    .replace(/\n+/g, ' ') // 合并换行
    .trim()
  
  const firstParagraph = plainText.split('\n')[0] || plainText
  
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }
  
  return firstParagraph.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

/**
 * 计算大概的阅读时间
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200 // 假设每分钟阅读200个字符
  const wordCount = content.length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  
  return `${minutes} min read`
} 