# SEO 检查报告

生成时间: 2026-04-22 06:55:00 UTC

## 检查摘要

- ✅ 通过: 29
- ❌ 失败: 0
- ⚠️ 警告: 2
- 📊 总计: 31

## 详细结果

### 阶段 1：代码结构检查

#### 1.1 根 Layout
- ✅ `src/app/[locale]/layout.tsx` 包含 `<html lang={locale}>`
- ✅ 包含站点级 metadata、robots、OpenGraph、Twitter、icons、alternates
- ✅ 含 SearchAction（在首页 WebSite JSON-LD 中）

#### 1.2 动态页面 SEO
- ✅ `src/app/[locale]/[...slug]/page.tsx` 正确生成 title/description
- ✅ 包含 `alternates`（hreflang）
- ✅ 包含 OpenGraph
- ✅ 包含 robots
- ✅ 非英文内容缺失时 fallback 英文

#### 1.3 Sitemap
- ✅ 使用环境变量站点地址（`NEXT_PUBLIC_SITE_URL`）
- ✅ 包含所有语言首页
- ✅ 包含静态页面
- ✅ 包含内容列表页（本次修复新增）
- ✅ 包含所有 MDX 文章
- ✅ 优先级/更新频率映射已与当前内容类型对齐（本次修复）

#### 1.4 国际化配置
- ✅ `src/i18n/routing.ts` 中 `localePrefix: 'as-needed'`
- ✅ `defaultLocale: 'en'`
- ✅ `localeDetection: true`

#### 1.5 结构化数据组件
- ✅ `ArticleStructuredData` 存在且有效
- ✅ `ListStructuredData` 存在且有效
- ✅ 首页输出 `WebSite + Organization + VideoGame` JSON-LD（含 SearchAction）

#### 1.6 robots
- ✅ `src/app/robots.ts` 存在并输出 `sitemap`

#### 1.7 H1 标签
- ✅ 首页、列表页、详情页、法律页均有 H1
- ✅ 页面主语义与主题一致（Dragon Quest Smash Grow）

#### 1.8 图片 alt
- ✅ `Image` 组件均设置 alt 文本

#### 1.9 面包屑
- ✅ 详情页含可见 breadcrumb 导航
- ✅ `ArticleStructuredData` 含 BreadcrumbList JSON-LD

#### 1.10 内链与站内结构
- ✅ 修复首页 Latest Updates 链接与 `localePrefix: as-needed` 一致性（本次修复）
- ✅ 修复法律页返回首页链接为 i18n Link（本次修复）
- ✅ 移除 `src/` 下旧备份文件品牌残留（本次修复）

### 阶段 2：构建验证

- ✅ `npm run typecheck` 通过
- ✅ `npm run lint` 通过（仅 Next.js deprecate 提示，无错误）
- ✅ `npm run build` 通过

### 阶段 3：安全检查

- ✅ `src/` 内未发现 `sk-`、`API_KEY`、`password` 硬编码
- ✅ `.gitignore` 包含 `.env*`

### 阶段 4：本地运行验证

- ✅ dev 服务启动成功（端口 8209）
- ✅ 首页 `HEAD` 返回 `200`
- ✅ 非默认语言 `/ja`、`/ko` 返回 `200`
- ✅ `/en` 返回 `307`（符合 `as-needed` 预期）
- ✅ 首页 `{{OLD_THEME}}` 残留计数为 `0`
- ✅ 首页模块 H2 包含链接（快速统计：`H2_TOTAL=20`, `H2_WITH_A=13`）

## 本次修复清单

1. 链接一致性
- `src/components/home/LatestGuides.tsx`
- `src/components/home/LatestGuidesAccordion.tsx`
- 从手写 `/${locale}/...` 切换到 i18n Link 路由行为，避免默认语言 `/en` 链接不一致。

2. 法律页 i18n 返回链接
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/privacy-policy/page.tsx`
- `src/app/[locale]/terms-of-service/page.tsx`
- `src/app/[locale]/copyright/page.tsx`
- 统一改用 `@/i18n/navigation` 的 `Link`。

3. 旧品牌残留清理
- 删除 `src/app/[locale]/terms-of-service/page.tsx.bak`（含旧域名残留）。

4. Sitemap 结构修复
- `src/app/sitemap.ts`
- 内容类型映射更新为当前站点结构（release/reroll/videos/weapons/guide/install/beta）
- 新增各内容列表页 URL 入 sitemap。

5. 多语言翻译
- `src/locales/ja.json`、`src/locales/ko.json` 使用脚本完整覆盖重译
- 行数从 `932/11` 提升到 `1405/1405`，JSON 合法。

## 警告项

1. ⚠️ `src/locales/de|es|fr|pt|ru|tr.json` 仍存在旧主题内容，但当前 `routing.ts` 未启用这些语言，不影响线上路由。
2. ⚠️ 构建日志存在 next-intl 的 webpack cache warning（基线噪音，未阻断构建）。
