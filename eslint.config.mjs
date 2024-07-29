// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
    formatters: {
        css: true,
        html: true,
        markdown: "prettier"
    },
    unocss: true,
}, {
    rules: {
        "antfu/top-level-function": ["off"]
    }
})
