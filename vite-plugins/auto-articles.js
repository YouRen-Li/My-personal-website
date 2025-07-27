import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

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
      console.log(`🔄 文章索引已自动更新 - ${files.length} 个文章`)
      return true
    }
    
    return false
  } catch (error) {
    console.error('❌ 自动更新文章索引失败:', error)
    return false
  }
}

/**
 * Vite插件：自动监控文章变化
 */
export function autoArticlesPlugin() {
  let projectRoot
  let watcher
  
  return {
    name: 'auto-articles',
    
    configResolved(config) {
      projectRoot = config.root
      console.log('🔧 插件初始化, 项目根目录:', projectRoot)
      
      // 初始化时更新一次索引
      console.log('🔄 初始化时更新索引...')
      updateArticlesIndex(projectRoot)
    },
    
    configureServer(server) {
      const docsDir = path.join(projectRoot, 'public', 'docs')
      const watchPattern = path.join(docsDir, '*.md')
      
      console.log('📁 监控目录:', docsDir)
      console.log('🎯 监控模式:', watchPattern)
      
      // 监控docs目录的变化
      watcher = chokidar.watch(watchPattern, {
        ignoreInitial: true,
        persistent: true,
        usePolling: true, // 在某些系统上更可靠
        interval: 100
      })
      
      watcher.on('ready', () => {
        console.log('✅ 文件监控器已就绪')
      })
      
      watcher.on('add', (filePath) => {
        const fileName = path.basename(filePath)
        console.log(`📄 检测到新文章: ${fileName}`)
        console.log(`📍 完整路径: ${filePath}`)
        if (updateArticlesIndex(projectRoot)) {
          // 通知浏览器刷新
          server.ws.send({
            type: 'full-reload'
          })
        }
      })
      
      watcher.on('unlink', (filePath) => {
        const fileName = path.basename(filePath)
        console.log(`🗑️  检测到删除文章: ${fileName}`)
        console.log(`📍 完整路径: ${filePath}`)
        if (updateArticlesIndex(projectRoot)) {
          // 通知浏览器刷新
          server.ws.send({
            type: 'full-reload'
          })
        }
      })
      
      watcher.on('change', (filePath) => {
        const fileName = path.basename(filePath)
        console.log(`✏️  检测到文章修改: ${fileName}`)
      })
      
      watcher.on('error', (error) => {
        console.error('❌ 文件监控器错误:', error)
      })
      
      console.log('👀 正在监控文章目录变化...')
      console.log('📋 当前监控的文件:')
      
      // 显示当前正在监控的文件
      setTimeout(() => {
        const watchedPaths = watcher.getWatched()
        Object.keys(watchedPaths).forEach(dir => {
          const files = watchedPaths[dir]
          files.forEach(file => {
            if (file.endsWith('.md')) {
              console.log(`   👁️  ${path.join(dir, file)}`)
            }
          })
        })
      }, 1000)
    },
    
    buildStart() {
      // 构建时更新索引
      updateArticlesIndex(projectRoot)
    },
    
    closeBundle() {
      // 清理监控器
      if (watcher) {
        watcher.close()
      }
    }
  }
} 