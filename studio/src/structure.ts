import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Homepage as singleton
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      // Other document types (excluding homepage and media.tag)
      ...S.documentTypeListItems().filter(
        (listItem) => !['homepage', 'media.tag'].includes(listItem.getId()!)
      ),
    ])