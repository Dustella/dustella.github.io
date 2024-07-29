import { Router } from 'vitepress'

export const initNProgress = async (router: Router) => {
    const { default: NProgress } = await import('nprogress')
    router.onBeforeRouteChange = () => {
      NProgress.start()
    }
    router.onAfterRouteChanged = () => {
      NProgress.done()
    }
}