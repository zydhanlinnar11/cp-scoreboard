import DomjudgeScoreboardRowProblem from '@/domjudge/types/DomjudgeScoreboardRowProblem'

type DomjudgeScoreboardRow = {
  rank: number
  team_id: string
  score: {
    num_solved: number
    total_time: number
  }
  problems: DomjudgeScoreboardRowProblem[]
}

export default DomjudgeScoreboardRow
