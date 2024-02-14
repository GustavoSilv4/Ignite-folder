import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'web',
  async setup() {
    console.log('Executooooouuuu')
    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}
