import fs from 'fs'
import path from 'path'

/**
 * 更新文章索引的函数
 */
function updateArticlesIndex(projectRoot) {
  const docsDir = path.join(projectRoot, 'public', 'docs')
  const indexFile = path.join(projectRoot, 'public', 'docs-index.json')
  
  try {
    // 检查docs目录是否存在
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true })
    }
    
    // 读取docs目录下的所有.md文件
    const files = fs.readdirSync(docsDir)
      .filter(file => file.endsWith('.md'))
      .sort()
    
    // 创建索引对象
    const index = {
      files,
      lastUpdated: new Date().toISOString(),
      count: files.length
    }
    
    // 检查是否需要更新
    let needUpdate = true
    if (fs.existsSync(indexFile)) {
      try {
        const currentIndex = JSON.parse(fs.readFileSync(indexFile, 'utf8'))
        needUpdate = JSON.stringify(currentIndex.files) !== JSON.stringify(files)
      } catch (error) {
        needUpdate = true
      }
    }
    
    if (needUpdate) {
      fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf8')
      console.log(`🔄 自动更新索引 - ${files.length} 个文章:`, files.map(f => f.replace('.md', '')).join(', '))
      return { updated: true, count: files.length, files }
    }
    
    return { updated: false, count: files.length, files }
  } catch (error) {
    console.error('❌ 更新文章索引失败:', error)
    return { updated: false, error: error.message }
  }
}

/**
 * Vite插件：提供文章API
 */
export function articlesApiPlugin() {
  let projectRoot
  
  return {
    name: 'articles-api',
    
    configResolved(config) {
      projectRoot = config.root
    },
    
    configureServer(server) {
      // 添加API路由
      server.middlewares.use('/api/update-articles', (req, res, next) => {
        if (req.method === 'POST') {
          const result = updateArticlesIndex(projectRoot)
          
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.statusCode = 200
          res.end(JSON.stringify(result))
        } else {
          next()
        }
      })
      
      // 初始化时更新一次索引
      setTimeout(() => {
        updateArticlesIndex(projectRoot)
      }, 1000)
    }
  }
} 