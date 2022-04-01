import Team from '@/icpc/types/Team'
import Problem from '@/icpc/types/Problem'

type ScoreboardData = {
  lastUpdated?: string
  teams: Team[]
  problems: Problem[]
}

export default ScoreboardData
