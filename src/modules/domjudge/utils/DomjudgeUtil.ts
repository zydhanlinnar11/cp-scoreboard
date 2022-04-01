import ScoreboardData from '@/icpc/types/ScoreboardData'
import DomjudgeScoreboardData from '@/domjudge/types/DomjudgeScoreboardData'
import DomjudgeScoreboardProblem from '@/domjudge/types/DomjudgeScoreboardProblem'
import DomjudgeTeam from '@/domjudge/types/DomjudgeTeam'

type ConvertToICPCScoreboardData = (
  data: DomjudgeScoreboardData,
  teams: DomjudgeTeam[],
  problems: DomjudgeScoreboardProblem[]
) => ScoreboardData

type TeamIdAsIndex = {
  [index: string]: DomjudgeTeam
}

export const convertToICPCScoreboardData: ConvertToICPCScoreboardData = (
  data,
  teams,
  problems
) => {
  const teamsObj: TeamIdAsIndex = {}
  teams.forEach((team) => (teamsObj[team.id] = team))

  return {
    lastUpdated: new Date().toLocaleTimeString('id-ID', {
      timeZone: 'Asia/Jakarta',
    }),
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
