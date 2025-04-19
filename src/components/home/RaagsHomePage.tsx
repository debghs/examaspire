import React from 'react'
import ScrollableSection from '../ScrollableSection'
import { LinkCard } from '../LinkCard'

function RaagsHomePage() {
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

  return (
    <>
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
          <LinkCard key={index} title={song.title} href={song.href} imageSrc={song.imageUrl} />
        ))}
      </ScrollableSection>
    </>
  )
}

export default RaagsHomePage
