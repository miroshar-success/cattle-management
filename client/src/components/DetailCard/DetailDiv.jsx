import React from 'react'

export default function DetailDiv({text, value}) {
  return (
    <div className="flex gap-3 items-center">
        <p className="first:font-semibold w-[150px]">{text} </p>
        <p className="capitalize"> {value}</p>
    </div>
  )
}
