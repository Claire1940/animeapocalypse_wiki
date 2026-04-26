# SEO 检查报告

生成时间: 2026-04-26 13:31:00 UTC

## 检查摘要

- 通过: 17 项
- 失败: 0 项
- 警告: 0 项
- 总计: 17 项

## 详细结果

### 阶段 1：代码结构检查

- 通过: `src/app/[locale]/layout.tsx` 输出 `<html lang={locale}>`。
- 通过: 首页 metadata 使用 `src/lib/site.ts` 中的 Anime Apocalypse 站点配置。
- 通过: 首页 JSON-LD 包含 `WebSite`、`Organization`、`SearchAction` 和 `VideoGame`。
- 通过: 详情页 metadata 使用 `SITE_NAME`，无旧品牌硬编码。
- 通过: `src/app/sitemap.ts` 使用 `NEXT_PUBLIC_SITE_URL` / `DEFAULT_SITE_URL`，内容类型已对齐当前栏目：`codes`、`guide`、`tier`、`weapons`、`raids`、`abilities`、`gadgets`。
- 通过: `src/i18n/routing.ts` 使用 `localePrefix: 'as-needed'`、`defaultLocale: 'en'`、`localeDetection: true`。
- 通过: `ArticleStructuredData` 和 `ListStructuredData` 使用 `SITE_NAME` / `SITE_URL` 动态生成结构化数据。

### 阶段 2：多语言与旧品牌检查

- 通过: 启用语言为 `en`、`pt-br`、`es`、`id`，对应 locale JSON 均存在且合法。
- 通过: 删除未启用且含旧项目内容的 locale 文件。
- 通过: `content/pt` 已对齐为 `content/pt-br`，与路由和 locale 文件一致。
- 通过: `src`、`content`、翻译脚本配置和关键词文件中未发现旧主题、旧平台外链或模板占位符残留。
- 通过: ES 翻译兜底模块已定向补翻，`pt-br`、`es`、`id` 均无与英文完全相同的长字符串兜底。

### 阶段 3：站内结构与链接一致性

- 通过: 首页 H1 使用 Anime Apocalypse Wiki 主题语义。
- 通过: 栏目页和详情页通过 `CONTENT_TYPES` 与导航配置共享同一内容类型来源。
- 通过: sitemap、导航、内容目录、locale 路由语言已对齐。
- 通过: 内容中误指向 Steam Community 的外链已改为 Anime Apocalypse Discord / Roblox 语义。
- 通过: Footer key 和用户可见文案均已改为 Roblox 语义。

### 阶段 4：自动 SEO 脚本

执行命令:

```bash
npm run check:seo
```

结果:

- Robots: 通过
- Sitemap: 通过
- Title: 通过，57 字符
- Description: 通过，153 字符
- Keywords: 通过，未配置 meta keywords
- OpenGraph: 通过
- Twitter Card: 通过
- Images: 通过
- Favicon: 通过
- Hreflangs: 通过，4 种语言
- Structured Data: 通过
- Content: 通过
- Config: 通过

## 修复建议

当前无必须修复项。后续建议将 sitemap 内容类型优先级从硬编码进一步派生到导航配置中，减少新项目迁移时的重复维护。
