import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      {/* <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0xc2edad668740f1aa35e4d8f227fb8e17dca888cd#code"
      >
        NFT Staking Contract
      </StyledLink> */}
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0xe92346d9369fe03b735ed9bdeb6bdc2591b8227e"
      >
        Uniswap PASTA-ETH
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/ThEm36R">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/SpaghettiIsMoney">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/spaghettimoney">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
