// Collections
import { Media } from '@/collections/Media'
import Users from '@/collections/Users'
// import { Taal } from '@/collections/Taal'
// import { Videos } from '@/collections/Videos'
// import { Subheading } from '@/collections/Subheading'
// import { RaagSingers } from '@/collections/RaagSingers'
// import { Blogs } from '@/collections/Blogs'
// import { Raags } from '@/collections/Raags'
// import { Actors } from '@/collections/Actors'
// import { BollywoodSingers } from '@/collections/BollywoodSingers'
// import { BollywoodSongs } from '@/collections/BollywoodSongs'
// import { Lyricists } from '@/collections/Lyricists'
// import { MusicDirector } from '@/collections/MusicDirector'
// import { SongCategories } from '@/collections/SongCategories'
import { CollectionConfig } from 'payload'
import { Pages } from '@/collections/Pages'
// import { ClassicalMedia } from '@/collections/ClassicalMedia'
// import { BollywoodMedia } from '@/collections/BollywoodMedia'
import { Exams } from '@/collections/Exams'
import { Questions } from '@/collections/Questions'
import { Results } from '@/collections/Results'
import { Submissions } from '@/collections/Submissions'
import { Tags } from '@/collections/Tags'


// const groupCollections = (group: string, collections: CollectionConfig[]): CollectionConfig[] => {
//   return collections.map((collection) => {
//     return {
//       ...collection,
//       admin: {
//         ...collection.admin,
//         group,
//       },
//     }
//   })
// }

// const VideosCollections = [Videos, RaagSingers, Subheading, Blogs]
// const ClassicalCollections = [Raags, Taal, ClassicalMedia]
// const BollywoodCollections = [
//   BollywoodSongs,
//   BollywoodSingers,
//   SongCategories,
//   Lyricists,
//   Actors,
//   MusicDirector,
//   BollywoodMedia,
// ]

export const collectionsList = [
  Pages,
  Users,
  Media,
  Questions,
  Exams,
  Results,
  Submissions,
  Tags
  // ...groupCollections('Hindi Music', BollywoodCollections),
  // ...groupCollections('Classical', ClassicalCollections),
  // ...groupCollections('Teaching Videos', VideosCollections),
]
