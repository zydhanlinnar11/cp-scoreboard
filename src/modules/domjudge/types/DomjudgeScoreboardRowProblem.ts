type DomjudgeScoreboardRowProblem = {
  label: string
  problem_id: string
  num_judged: number
  num_pending: number
  solved: boolean
  time?: number
  first_to_solve: boolean
}

export default DomjudgeScoreboardRowProblem
