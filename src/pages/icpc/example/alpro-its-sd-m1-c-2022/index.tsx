import {
  convertToICPCScoreboardData,
  getContestDataFromAPI,
  getScoreboardFromAPI,
} from '@/hackerrank/utils/HackerrankUtil'
import ICPCScoreboardTable from '@/icpc/components/elements/ICPCScoreboardTable'
import ScoreboardData from '@/icpc/types/ScoreboardData'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

type Props = {
  data: ScoreboardData
  lastUpdated: string
}

const Praktikum1StrukDatC2022: FC<Props> = ({
  data: { problems, teams, contest },
  lastUpdated,
}) => {
  return (
    <>
      <NextSeo
        title={`${contest.name} Scoreboard - Competitive Programming Scoreboard`}
        description="An example from ICPC Scoreboard with data taken from DOMJudge demoweb Praktikum1StrukDatC2022"
      />
      <header
        style={{
          textAlign: 'center',
          paddingTop: '48px',
          paddingBottom: '48px',
        }}
      >
        <h1>{contest.name} Scoreboard</h1>
        <p>Last updated: {lastUpdated}</p>
      </header>
      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <ICPCScoreboardTable problems={problems} teams={teams} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const scoreboard = await getScoreboardFromAPI('alpro-its-sd-m1-c-2022', 100)
  const contest = await getContestDataFromAPI('alpro-its-sd-m1-c-2022')

  const lastUpdated = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour12: true,
  })

  return {
    props: {
      data: convertToICPCScoreboardData(scoreboard, contest),
      lastUpdated,
    },
  }
}

export default Praktikum1StrukDatC2022
