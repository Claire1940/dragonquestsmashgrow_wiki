import type { LucideIcon } from 'lucide-react'
import { ArrowRight, BookOpen, Clock, Gamepad2, Hammer, Settings, Shield } from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{
		key: 'release',
		path: '/release',
		icon: Clock,
		isContentType: true,
	},
	{
		key: 'reroll',
		path: '/reroll',
		icon: ArrowRight,
		isContentType: true,
	},
	{
		key: 'videos',
		path: '/videos',
		icon: Gamepad2,
		isContentType: true,
	},
	{
		key: 'weapons',
		path: '/weapons',
		icon: Hammer,
		isContentType: true,
	},
	{
		key: 'guide',
		path: '/guide',
		icon: BookOpen,
		isContentType: true,
	},
	{
		key: 'install',
		path: '/install',
		icon: Settings,
		isContentType: true,
	},
	{
		key: 'beta',
		path: '/beta',
		icon: Shield,
		isContentType: true,
	},
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'build', 'combat', 'guides']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
