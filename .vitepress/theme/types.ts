import type { DefaultTheme } from 'vitepress'

export interface Link {
  link: string
  icon: string
  name: string
}

export interface ThemeLinearConfig extends DefaultTheme.Config {
  links?: Link[]
  posts?: Post[]
  favicon?: string
  googleId?: string
  comment?: Comment
}

export interface Post {
  frontmatter: Record<string, any>
  regularPath: string
}

export interface Comment {
  repo: string
  issueTerm: string
}
