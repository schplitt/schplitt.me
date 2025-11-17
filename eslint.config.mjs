// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
  },
})
