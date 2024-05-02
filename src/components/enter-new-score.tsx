import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
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

  return (
    <Box w='300px'>
      <FormControl isRequired isInvalid={error}>
        <FormLabel>Name:</FormLabel>
        <Input
          id='form-name'
          type='text'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        {!error ? (
          <FormHelperText>An actual name</FormHelperText>
        ) : (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}

        <FormLabel>Score:</FormLabel>
        <Input
          id='form-score'
          type='number'
          value={score}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setScore(parseInt(e.target.value))
          }
        />
        <FormHelperText>Whole numbers only</FormHelperText>
        <Button type='submit' onClick={onSubmit}>
          Submit
        </Button>
      </FormControl>
    </Box>
  )
}
