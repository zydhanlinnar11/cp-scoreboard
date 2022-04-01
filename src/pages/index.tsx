import {
  sampleContest,
  sampleProblems,
  sampleScoreboard,
  sampleTeams,
} from '@/domjudge/data/sample'
import { convertToICPCScoreboardData } from '@/domjudge/utils/DomjudgeUtil'
import ICPCScoreboardTable from '@/icpc/components/elements/ICPCScoreboardTable'
import ScoreboardData from '@/icpc/types/ScoreboardData'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

type Props = {
  data: ScoreboardData
  lastUpdated: string
}

const HomePage: FC<Props> = ({
  data: { problems, teams, contest },
  lastUpdated,
}) => {
  return (
    <>
      <NextSeo
        title={`${contest.name} Scoreboard - Competitive Programming Scoreboard`}
        description="An example from ICPC Scoreboard with data taken from DOMJudge demoweb nwerce18"
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
  const problems = sampleProblems
  const scoreboard = sampleScoreboard
  const teams = sampleTeams
  const contest = sampleContest
  const lastUpdated = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour12: true,
  })

  return {
    props: {
      data: convertToICPCScoreboardData(scoreboard, teams, problems, contest),
      lastUpdated,
    },
  }
}

export default HomePage
