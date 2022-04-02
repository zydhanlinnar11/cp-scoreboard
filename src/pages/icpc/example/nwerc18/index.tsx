import {
  sampleContest,
  sampleProblems,
  sampleScoreboard,
  sampleTeams,
} from '@/domjudge/data/sample'
import {
  convertToICPCScoreboardData,
  getScoreboardFromAPI,
} from '@/domjudge/utils/DomjudgeUtil'
import ICPCScoreboardTable from '@/icpc/components/elements/ICPCScoreboardTable'
import ScoreboardData from '@/icpc/types/ScoreboardData'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { FC } from 'react'

type Props = {
  data: ScoreboardData
  lastUpdated: string
}

const NWERC18: FC<Props> = ({
  data: { problems, teams, contest },
  lastUpdated,
}) => {
  return (
    <>
      <NextSeo
        title={`${contest.name} Scoreboard - Competitive Programming Scoreboard`}
        description="An example from ICPC Scoreboard with data taken from DOMJudge demoweb nwerc18"
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
  const { contest, data, problems, teams } = await getScoreboardFromAPI(
    'https://www.domjudge.org/demoweb',
    'nwerc18'
  )
  const lastUpdated = new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour12: true,
  })

  return {
    props: {
      data: convertToICPCScoreboardData(data, teams, problems, contest),
      lastUpdated,
    },
  }
}

export default NWERC18
