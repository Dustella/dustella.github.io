import type { Router } from 'vitepress'

export const initNProgress = async (router: Router) => {
  const { default: NProgress } = await import('nprogress')
  router.onBeforeRouteChange = () => {
    NProgress.start()
  }
  router.onAfterRouteChange = () => {
    NProgress.done()
  }
}
