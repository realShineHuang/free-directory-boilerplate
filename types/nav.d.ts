export interface NavItem {
  title: string
  href: string
  description?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
}

export interface MainNavItem extends NavItem {
  path?: string
  items?: NavItem[]
}

export interface NavConfig {
  mainNav: MainNavItem[]
}

export interface SidebarNavItem {
  title?: string
  href?: string
  external?: boolean
  items?: SidebarNavItem[]
} 