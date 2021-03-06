import ScoreboardData from '@/icpc/types/ScoreboardData'
import DomjudgeScoreboardData from '@/domjudge/types/DomjudgeScoreboardData'
import DomjudgeScoreboardProblem from '@/domjudge/types/DomjudgeScoreboardProblem'
import DomjudgeTeam from '@/domjudge/types/DomjudgeTeam'
import DomjudgeContest from '@/domjudge/types/DomjudgeContest'

type ConvertToICPCScoreboardData = (
  data: DomjudgeScoreboardData,
  teams: DomjudgeTeam[],
  problems: DomjudgeScoreboardProblem[],
  contest: DomjudgeContest
) => ScoreboardData

type GetScoreboardFromAPI = (
  baseUrl: string,
  cid: string
) => Promise<{
  data: DomjudgeScoreboardData
  teams: DomjudgeTeam[]
  problems: DomjudgeScoreboardProblem[]
  contest: DomjudgeContest
}>

type TeamIdAsIndex = {
  [index: string]: DomjudgeTeam
}

export const convertToICPCScoreboardData: ConvertToICPCScoreboardData = (
  data,
  teams,
  problems,
  contest
) => {
  const teamsObj: TeamIdAsIndex = {}
  teams.forEach((team) => (teamsObj[team.id] = team))

  return {
    contest: {
      name: contest.formal_name,
      endTime: contest.end_time,
      startTime: contest.start_time,
    },
    problems: problems.map(({ label, name }) => ({ label, name })),
    teams: data.rows.map((row) => ({
      score: {
        penalty: row.score.total_time,
        solvedCount: row.score.num_solved,
      },
      institution: {
        name: teamsObj[row.team_id].affiliation,
      },
      name: teamsObj[row.team_id].name,
      problems: row.problems.map((problem) => ({
        problem: {
          name: problem.label,
          label: problem.label,
        },
        tryCount: problem.num_judged,
        pendingCount: problem.num_pending,
        isSolved: problem.solved,
        firstToSolve: problem.first_to_solve,
        time: problem.time ?? null,
      })),
      id: row.team_id,
    })),
  }
}

export const getScoreboardFromAPI: GetScoreboardFromAPI = async (
  baseUrl,
  cid
) => {
  let res = await fetch(`${baseUrl}/api/contests/${cid}`)
  const contest = await res.json()
  res = await fetch(`${baseUrl}/api/contests/${cid}/teams`)
  const teams = await res.json()
  res = await fetch(`${baseUrl}/api/contests/${cid}/problems`)
  const problems = await res.json()
  res = await fetch(`${baseUrl}/api/contests/${cid}/scoreboard`)
  const data = await res.json()

  return { contest, teams, problems, data }
}
