import React from 'react'

interface Props {
  currentNav: string
}

const NavBar:React.FC<Props> = ({currentNav}) => {
  return (
    <nav>
      {currentNav}
    </nav>
  )
}

export default NavBar