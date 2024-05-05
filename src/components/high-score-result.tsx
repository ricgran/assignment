import React, { useState } from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'

interface HighScoreResultProps {
  name: string
  scores: number[]
}

export default function HighScoreResult(props: HighScoreResultProps) {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  if (props.scores.length < 1) return null

  return (
    <Box w='150px' mb='20px' onClick={toggleShow} cursor={'pointer'}>
      <Flex>
        <Text>{props.name}:</Text>
        <Spacer />
        <Text>{props.scores[0]}</Text>
      </Flex>
      <Flex style={{ display: show ? '' : 'none' }} direction={'column'}>
        {props.scores.slice(1).map((score) => (
          <Text textAlign={'right'} key={`${props.name}${score}`}>
            {score}
          </Text>
        ))}
      </Flex>
    </Box>
  )
}
