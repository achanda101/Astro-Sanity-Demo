import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare({url}) {
      const videoId = url ? url.split('v=')[1]?.split('&')[0] : null
      return {
        title: 'YouTube Video',
        subtitle: videoId ? `Video ID: ${videoId}` : 'No video ID',
        media: () => '🎥',
      }
    },
  },
})