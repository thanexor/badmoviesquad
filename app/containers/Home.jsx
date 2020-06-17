import React, { useState } from 'react'
//import PropTypes from 'prop-types'
import styled from 'styled-components'

import Search from '../components/Search'
import Image from '../components/Image'

const Container = styled.div``

const StyledImage = styled(Image)`
  width: 400px;
  height: 400px;
`

const propTypes = {

}

export default function Home(props) {
  return (
    <Container>
      <h1>Home</h1>

    </Container>
  )
}

Home.propTypes = propTypes
