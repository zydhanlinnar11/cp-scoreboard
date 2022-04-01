import DomjudgeScoreboardState from '@/domjudge/types/DomjudgeScoreboardState'
import DomjudgeScoreboardRow from '@/domjudge/types/DomjudgeScoreboardRow'

type DomjudgeScoreboardData = {
  event_id: string
  time: string
  contest_time: string
  state: DomjudgeScoreboardState
  rows: DomjudgeScoreboardRow[]
}

export default DomjudgeScoreboardData
