import React from 'react'

function SongPlayer({ value }: { value?: { url: string; mimeType: string } }) {
  if (!value) return null

  return (
    <audio controls src={value.url}>
      Your browser does not support the audio element.
    </audio>
  )
}

export default SongPlayer
