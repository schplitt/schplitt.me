// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // TODO: investigate why the following error is thrown:
    // Error: Key "rules": Key "vue/object-property-newline":
    // Value {"allowMultiplePropertiesPerLine":true,"allowAllPropertiesOnSameLine":false} should NOT have additional properties.
    //      Unexpected property "allowMultiplePropertiesPerLine". Expected properties: "allowAllPropertiesOnSameLine".

    'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
  },
})
