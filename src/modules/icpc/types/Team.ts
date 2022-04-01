import Institution from '@/icpc/types/Institution'
import TeamProblem from '@/icpc/types/TeamProblem'
import TeamScore from '@/icpc/types/TeamScore'

type Team = {
  name: string
  institution: Institution
  url?: string
  problems: TeamProblem[]
  score: TeamScore
}

export default Team
