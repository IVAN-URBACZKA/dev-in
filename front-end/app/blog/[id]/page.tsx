import React from 'react'

export default function page({ params }: { params: { id: string } }) {
  return (
    <p>My Post: {params.id}</p>
  )
}

