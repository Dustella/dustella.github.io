export const initClarity = async (id:string) => {
    // @ts-expect-error import for vite
    if (import.meta.env.DEV) return
    (function (c, l, a, r, i, t, y) {
        // eslint-disable-next-line prefer-rest-params
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        t = l.createElement(r); t.async = 1; t.src = `https://www.clarity.ms/tag/${i}`
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
      })(window, document, 'clarity', 'script', id)
}