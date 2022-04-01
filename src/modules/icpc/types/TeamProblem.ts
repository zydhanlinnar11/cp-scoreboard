import Problem from '@/icpc/types/Problem'

type TeamProblem = {
  problem: Problem
  tryCount: number
  pendingCount: number
  isSolved: boolean
  firstToSolve: boolean
}

export default TeamProblem
