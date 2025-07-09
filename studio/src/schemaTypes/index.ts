import blockContent from './objects/blockContent'
import post from './documents/post'
import homepage from './documents/homepage'
import youtube from './objects/youtube'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [post, blockContent, homepage, youtube]
