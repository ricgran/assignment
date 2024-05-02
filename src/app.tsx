import React, { ReactNode, useState } from 'react'
import { Link } from '@chakra-ui/react'
import { Container, Box, P, VStack, HStack, H1, H2 } from '@northlight/ui'
import { palette } from '@northlight/tokens'
import { ExcelDropzone, ExcelRow } from './excel-dropzone.jsx'
import fileUsers from './users.ts'
import fileScores from './scores.ts'
import HighScore from './components/HighScore.tsx'
import EnterNewScore from './components/EnterNewScore.tsx'

interface ExternalLinkProps {
  href: string
  children: ReactNode
}

export interface User {
  _id: number
  name: string
}

export interface Score {
  userId: number
  score: number
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => (
  <Link
    href={href}
    isExternal
    sx={{ color: palette.blue['500'], textDecoration: 'underline' }}
  >
    {children}
  </Link>
)

function createNewScoreAndUser(
  name: string,
  score: number,
  userArr: User[],
  scoreArr: Score[]
) {
  let id: number
  const userId = userArr.find(
    (user) => user.name.toLowerCase() == name.toLowerCase()
  )?._id

  if (userId) {
    id = userId
  } else {
    id = userArr.length + 1
    userArr.push({ _id: id, name: name })
  }

  scoreArr.push({ userId: id, score: score })
}

export default function App() {
  const [users, setUsers] = useState<User[]>(fileUsers)
  const [scores, setScores] = useState<Score[]>(fileScores)

  function updateData(userArr: User[], scoreArr: Score[]) {
    setUsers(userArr)
    setScores(scoreArr)
  }

  function enterNewScore(name: string, score: number) {
    const userArray = [...users]
    const scoreArray = [...scores]

    createNewScoreAndUser(name, score, userArray, scoreArray)

    updateData(userArray, scoreArray)
  }

  function handleSheetData(data: ExcelRow[]) {
    const userArray = [...users]
    const scoreArray = [...scores]

    data.forEach((row) => {
      createNewScoreAndUser(row.name, row.score, userArray, scoreArray)
    })

    updateData(userArray, scoreArray)
  }

  return (
    <Container maxW='6xl' padding='4'>
      <H1 marginBottom='4'>Mediatool exercise</H1>
      <HStack spacing={10} align='flex-start'>
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label='Import excel file here'
        />
        <VStack align='left'>
          <Box>
            <H2>Initial site</H2>
            <P>
              Drop the excel file scores.xlsx that you will find in this repo in
              the area to the left and watch the log output in the console. We
              hope this is enough to get you started with the import.
            </P>
          </Box>
          <Box>
            <H2>Styling and Northlight</H2>
            <P>
              Styling is optional for this task and not a requirement. The
              styling for this app is using our own library Northligth which in
              turn is based on Chakra UI. You <i>may</i> use it to give some
              style to the application but again, it is entierly optional.
            </P>
            <P>
              Checkout{' '}
              <ExternalLink href='https://chakra-ui.com/'>
                Chackra UI
              </ExternalLink>{' '}
              for layout components such as{' '}
              <ExternalLink href='https://chakra-ui.com/docs/components/box'>
                Box
              </ExternalLink>
              ,{' '}
              <ExternalLink href='https://chakra-ui.com/docs/components/stack'>
                Stack
              </ExternalLink>
              ,{' '}
              <ExternalLink href='https://chakra-ui.com/docs/components/grid'>
                Grid
              </ExternalLink>
              ,{' '}
              <ExternalLink href='https://chakra-ui.com/docs/components/flex'>
                Flex
              </ExternalLink>{' '}
              and others.
            </P>
            <P>
              Checkout{' '}
              <ExternalLink href='https://northlight.dev/'>
                Northlight
              </ExternalLink>{' '}
              for some of our components.
            </P>
          </Box>
        </VStack>
      </HStack>
      <HighScore users={users} scores={scores} />
      <EnterNewScore createNew={enterNewScore} />
    </Container>
  )
}
