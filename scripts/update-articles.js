import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 项目根目录
const projectRoot = path.resolve(__dirname, '..')
const docsDir = path.join(projectRoot, 'public', 'docs')
const indexFile = path.join(projectRoot, 'public', 'docs-index.json')

/**
 * 扫描docs目录并更新索引文件
 */
function updateArticlesIndex() {
  try {
    console.log('🔍 手动更新文章索引...')
    console.log('📁 目录路径:', docsDir)
    
    // 检查docs目录是否存在
    if (!fs.existsSync(docsDir)) {
      console.log('📁 创建docs目录...')
      fs.mkdirSync(docsDir, { recursive: true })
    }
    
    // 读取docs目录下的所有.md文件
    const files = fs.readdirSync(docsDir)
      .filter(file => file.endsWith('.md'))
      .sort() // 按文件名排序
    
    console.log(`📄 找到 ${files.length} 个markdown文件:`)
    files.forEach(file => console.log(`   - ${file}`))
    
    // 创建索引对象
    const index = {
      files,
      lastUpdated: new Date().toISOString(),
      count: files.length
    }
    
    // 写入索引文件
    fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf8')
    
    console.log('✅ 文章索引已手动更新!')
    console.log(`📍 索引文件: ${indexFile}`)
    console.log(`📊 文章数量: ${files.length}`)
    
    if (files.length === 0) {
      console.log('\n💡 提示: 在 public/docs/ 目录下添加 .md 文件来创建文章')
    } else {
      console.log('\n🎉 提示: 开发模式下文章会自动同步，无需手动运行此命令！')
    }
    
  } catch (error) {
    console.error('❌ 更新文章索引失败:', error)
    process.exit(1)
  }
}

// 运行更新函数
updateArticlesIndex() 