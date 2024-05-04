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
  const [nameError, setNameError] = useState<boolean>(false)
  const [scoreError, setScoreError] = useState<boolean>(false)

  function foundError() {
    let foundErrors = false

    if (name == '') {
      foundErrors = true
      setNameError(true)
    } else setNameError(false)

    if (isNaN(score)) {
      foundErrors = true
      setScoreError(true)
    } else setScoreError(false)

    return foundErrors
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (!foundError()) {
      props.createNew(name, score)
      setName('')
      setScore(0)
    }
  }

  return (
    <Box w='300px'>
      <FormControl isRequired isInvalid={nameError}>
        <FormLabel>Name:</FormLabel>
        <Input
          id='form-name'
          type='text'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        {!nameError ? (
          <FormHelperText>An actual name</FormHelperText>
        ) : (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={scoreError}>
        <FormLabel>Score:</FormLabel>
        <Input
          id='form-score'
          type='number'
          value={score}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setScore(parseInt(e.target.value))
          }
        />

        {!scoreError ? (
          <FormHelperText>Whole numbers only</FormHelperText>
        ) : (
          <FormErrorMessage>Please input a number</FormErrorMessage>
        )}
      </FormControl>
      <Button type='submit' onClick={onSubmit}>
        Submit
      </Button>
    </Box>
  )
}
