import { it, describe, expect } from 'vitest'
import { Slug } from './slug'

describe('Normalize slug', () => {
  it('should be able to create a new slug from text', async () => {
    const slug = Slug.createFromText('Example question title @*/-*')

    expect(slug.value).toEqual('example-question-title')
  })
})
