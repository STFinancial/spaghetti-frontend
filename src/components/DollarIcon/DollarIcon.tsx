import React from 'react'

interface DollarIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const DollarIcon: React.FC<DollarIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    💲
  </span>
)

export default DollarIcon
