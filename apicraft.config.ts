import { apicraft } from '@siberiacancode/apicraft'

export default apicraft([
  {
    input: './api-1.json',
    output: 'generated/api',
    instance: 'fetches',
    nameBy: 'path',
    groupBy: 'tags'
  }
])
