# 微信Markdown编辑器 | www.cxin.net魔改版

<div align="center">

[![logo](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/logo-2.png)](https://github.com/doocs/md)

</div>

<div align="center">

**基于 @doocs 的原项目 (https://github.com/doocs/md) 进行二次开发**  
**二改作者：@cxin (https://github.com/icxin/md-edgeone)**

</div>

<div align="center">

[![node](https://img.shields.io/badge/node-%3E%3D22-42cc23?style=flat-square&labelColor=564341)](https://nodejs.org/en/about/previous-releases) [![stars](https://img.shields.io/github/stars/icxin/md-edgeone?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/icxin/md-edgeone/stargazers) [![forks](https://img.shields.io/github/forks/icxin/md-edgeone?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/icxin/md-edgeone)<br> [![license](https://img.shields.io/github/license/icxin/md-edgeone?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/icxin/md-edgeone/blob/main/LICENSE)

</div>

## 📝 项目介绍

**Markdown 文档自动即时渲染为微信图文**，让你不再为微信内容排版而发愁！只要你会基本的 Markdown 语法，就能做出一篇样式简洁而又美观大方的微信图文。

本项目是基于 @doocs 的优秀开源项目进行二次开发的魔改版本，主要优化：
- 移除了所有AI相关功能，专注于纯粹的Markdown编辑体验
- 优化了项目结构，适配Pages服务部署
- 改进了数学公式显示效果，统一字体大小并支持横向滚动
- 删除了推广内容和帮助文档，界面更简洁

**如果这个项目对你有帮助，请给原项目和我们点个 Star ⭐️**，感谢开源社区的支持！

## 🌐 在线编辑器地址

[https://md.doocs.org](https://md.doocs.org) (原项目地址)

> **推荐使用 Chrome 浏览器**，效果最佳。

## ✨ 功能特性

### 🎨 核心功能

- ✅ **完整 Markdown 支持** - 支持所有基础语法、数学公式
- ✅ **图表渲染** - 支持 Mermaid 图表和 GFM 警告块
- ✅ **PlantUML 支持** - 强大的 UML 图表渲染
- ✅ **Ruby 注音扩展** - 支持 `[文字]{注音}`、`[文字]^(注音)` 格式

### 🎯 编辑体验

- ✅ **代码高亮** - 丰富的代码块高亮主题，提升代码可读性
- ✅ **自定义样式** - 允许自定义主题色和 CSS 样式，灵活定制展示效果
- ✅ **草稿保存** - 内置本地内容管理功能，支持草稿自动保存

### 🚀 高级功能

- ✅ **多图床支持** - 提供多种图床选择，便捷的图片上传功能
- ✅ **文件管理** - 便捷的文件导入、导出功能，提升工作效率

## 🖼️ 支持的图床服务

| #   | 图床                                                   | 使用时是否需要配置                                                         | 备注                                                                                                                   |
| --- | ------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | 默认                                                   | 否                                                                         | -                                                                                                                      |
| 2   | [GitHub](https://github.com)                           | 配置 `Repo`、`Token` 参数                                                  | [如何获取 GitHub token？](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
| 3   | [阿里云](https://www.aliyun.com/product/oss)           | 配置 `AccessKey ID`、`AccessKey Secret`、`Bucket`、`Region` 参数           | [如何使用阿里云 OSS？](https://help.aliyun.com/document_detail/31883.html)                                             |
| 4   | [腾讯云](https://cloud.tencent.com/act/pro/cos)        | 配置 `SecretId`、`SecretKey`、`Bucket`、`Region` 参数                      | [如何使用腾讯云 COS？](https://cloud.tencent.com/document/product/436/38484)                                           |
| 5   | [七牛云](https://www.qiniu.com/products/kodo)          | 配置 `AccessKey`、`SecretKey`、`Bucket`、`Domain`、`Region` 参数           | [如何使用七牛云 Kodo？](https://developer.qiniu.com/kodo)                                                              |
| 6   | [MinIO](https://min.io/)                               | 配置 `Endpoint`、`Port`、`UseSSL`、`Bucket`、`AccessKey`、`SecretKey` 参数 | [如何使用 MinIO？](http://docs.minio.org.cn/docs/master/)                                                              |
| 7   | [公众号](https://mp.weixin.qq.com/)                    | 配置 `appID`、`appsecret`、`代理域名` 参数                                 | [如何使用公众号图床？](https://md-pages.doocs.org/tutorial)                                                            |
| 8   | [Cloudflare R2](https://developers.cloudflare.com/r2/) | 配置 `AccountId`、`AccessKey`、`SecretKey`、`Bucket`、`Domain` 参数        | [如何使用 S3 API 操作 R2？](https://developers.cloudflare.com/r2/api/s3/api/)                                          |
| 9   | [又拍云](https://www.upyun.com/)                       | 配置 `Bucket`、`Operator`、`Password`、`Domain` 参数                       | [如何使用 又拍云？](https://help.upyun.com/)                                                                           |
| 10  | [Telegram](https://core.telegram.org/api)              | 配置 `Bot Token`、`Chat ID` 参数                                           | [如何使用 Telegram 图床？](https://github.com/doocs/md/blob/main/docs/telegram-usage.md)                               |
| 11  | [Cloudinary](https://cloudinary.com/)                  | 配置 `Cloud Name`、`API Key`、`API Secret` 参数                            | [如何使用 Cloudinary？](https://cloudinary.com/documentation/upload_images)                                            |
| 12  | 自定义上传                                             | 是                                                                         | [如何自定义上传？](/docs/custom-upload.md)                                                                             |

## 🛠️ 开发与部署

```sh
# 安装 node 版本
nvm i && nvm use

# 安装依赖
pnpm i

# 启动开发模式
pnpm start

# 访问 http://localhost:5173

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📄 许可证

本项目基于原项目的 MIT 许可证进行二次开发。

## 🙏 致谢

感谢原项目 [@doocs/md](https://github.com/doocs/md) 的优秀贡献，以及所有为开源社区做出贡献的开发者们。

## 📞 联系方式

- 原项目：https://github.com/doocs/md
- 本项目：https://github.com/icxin/md-edgeone
- 作者网站：www.cxin.net