import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'
import FireIcon from '../../../components/FireIcon'
import BankIcon from '../../../components/BankIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress, getSushiSupply, getFoodbank, getOven } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getNodeMajorVersion } from 'typescript'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [foodbank, setFoodbank] = useState<BigNumber>()
  const [oven, setOven] = useState<BigNumber>()

  const sushi = useSushi()
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(sushi)
      setTotalSupply(supply)
    }
    async function fetchFoodbank() {
      const food = await getFoodbank(sushi)
      setFoodbank(food)
    }
    async function fetchOven() {
      const burn = await getOven(sushi)
      setOven(burn)
    }
    if (sushi) {
      fetchTotalSupply()
      fetchFoodbank()
      fetchOven()
    }
  }, [sushi, setTotalSupply, setFoodbank, setOven])

  return (
    <>
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <SushiIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your PASTA Balance" />
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <SushiIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Total PASTA Supply" />
                <Value
                  value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
    </StyledWrapper>
    <Spacer />
    <StyledWrapper>
        <Card>
          <CardContent>
            <StyledBalances>
                <StyledBalance>
                  <BankIcon />
                  <Spacer />
                  <div style={{ flex: 1 }}>
                    <Label text="PASTA in the foodbank" />
                    <Value
                      value={foodbank ? getBalanceNumber(foodbank) : 'Locked'}
                    />
                  </div>
                </StyledBalance>
              </StyledBalances>

          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <FireIcon />
                <Spacer />
                <div style={{ flex: 1 }}>
                  <Label text="PASTA waiting to be burned" />
                  <Value
                    value={oven ? getBalanceNumber(oven) : 'Locked'}
                  />
                </div>
              </StyledBalance>
            </StyledBalances>
          </CardContent>
        </Card>
      </StyledWrapper>
      </>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
