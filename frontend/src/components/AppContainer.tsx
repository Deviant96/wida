import React from 'react'

type Props = {
    children: React.ReactElement;
}

export default function AppContainer({children}: Props) {
  return (
    <div className='bg-slate-200'>{children}</div>
  )
}