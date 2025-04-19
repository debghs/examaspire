import React from 'react'
import { LinkCard } from '../LinkCard'
import ScrollableSection from '../ScrollableSection'

const courses = [
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/398168d8-edc5-4af7-888f-f1a662d2773a.png',
    title: 'Sitar Fundamentals',
    instructor: 'Instructed by Ravi Shankar',
    href: '/course/sitar-fundamentals',
  },
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/d4fe8863-82b7-4fb6-b9d4-3af4daa407b1.png',
    title: 'Carnatic Vocal Basics',
    instructor: 'Instructed by M.S. Subbulakshmi',
    href: '/course/carnatic-vocal-basics',
  },
  {
    image: 'https://cdn.usegalileo.ai/sdxl10/a49e1ce6-b0d9-4053-bfc2-831e1d4f86fa.png',
    title: 'Tabla Technique',
    instructor: 'Instructed by Zakir Hussain',
    href: '/course/tabla-technique',
  },
]

const raags = [
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/4146f5cb-30d8-4c3d-b272-64bc31a45efe.png',
    name: 'Raag Yaman',
    href: '/raag/yaman',
  },
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/1f1bfe52-ac30-4d1e-9795-52337fbf7d32.png',
    name: 'Raag Bhairavi',
    href: '/raag/bhairavi',
  },
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/f99c6757-00be-445e-a482-96d6ffcc4e4e.png',
    name: 'Raag Darbari Kanada',
    href: '/raag/darbari-kanada',
  },
]

const songs = [
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/029cea86-051c-4f30-8c44-8a94916b40ee.png',
    title: 'Tere Bina Zindagi Se',
    artists: 'Rafi, Lata',
    href: '/song/tere-bina-zindagi-se',
  },
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/27660c78-93b2-4256-a35c-c0b9746cd095.png',
    title: 'Lag Ja Gale',
    artists: 'Lata',
    href: '/song/lag-ja-gale',
  },
  {
    imageUrl: 'https://cdn.usegalileo.ai/sdxl10/2eca47d1-b9c8-41f3-a752-a01bbd432140.png',
    title: 'Tum Hi Ho',
    artists: 'Arijit',
    href: '/song/tum-hi-ho',
  },
]

const PopularCourses = () => {
  return (
    <>
      <h2 className="text-[#201A09] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Popular Videos
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {courses.map((course, index) => (
          <LinkCard
            key={index}
            title={course.title}
            href={course.href}
            subtitle={course.instructor}
            imageSrc={course.image}
          />
        ))}
      </div>

      <ScrollableSection title="Most Heard Raags">
        {raags.map((raag, index) => (
          <LinkCard
            type="square"
            key={index}
            title={raag.name}
            href={raag.href}
            imageSrc={raag.imageUrl}
          />
        ))}
      </ScrollableSection>

      <ScrollableSection title="Superhit Songs">
        {songs.map((song, index) => (
          <LinkCard
            key={index}
            type="square"
            title={song.title}
            href={song.href}
            imageSrc={song.imageUrl}
          />
        ))}
      </ScrollableSection>
    </>
  )
}

export default PopularCourses
