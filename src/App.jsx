import { useState } from 'react'
import DustCard from '@/components/DustCard'
import DustLocation from '@/components/DustLocation'
import DustTab from '@/components/DustTab'
import DustApp from '@/components/DustApp'
import GlobalStyle from './styles/globalStyle'

function App() {

  return (
    <div>
      <GlobalStyle/>
      <DustApp/>
    </div>
  )
}

export default App
