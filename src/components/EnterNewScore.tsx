import React, { SyntheticEvent, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  FormErrorMessage
} from '@chakra-ui/react'

interface EnterNewScoreProps {
  createNew(name: string, score: number): void
}

export default function EnterNewScore(props: EnterNewScoreProps) {
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (name == '') {
      setError(true)
    } else {
      props.createNew(name, score)
      setName('')
      setScore(0)
      setError(false)
    }
  }

  console.log(error)
  return (
    <Box w='300px'>
      <FormControl isRequired isInvalid={error}>
        <FormLabel>Name:</FormLabel>
        <Input
          id='form-name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {!error ? (
          <FormHelperText>An actual name please</FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}

        <FormLabel>Score:</FormLabel>
        <Input
          id='form-score'
          type='number'
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
        />
        <FormHelperText>Whole numbers only please</FormHelperText>
        <Button type='submit' onClick={onSubmit}>
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}
