import Problem from '@/icpc/types/Problem'
import Team from '@/icpc/types/Team'
import { FC } from 'react'

type Props = {
  problems: Problem[]
  teams: Team[]
}

const Table: FC<Props> = ({ problems, teams }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Score</th>
          {problems.map(({ label, name }) => (
            <th key={label} title={`Problem ${name}`}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.map(({ id, institution, name, problems, score }, rank) => (
          <tr key={id}>
            <td>{rank}</td>
            <td>{name}</td>
            <td>
              {score.solvedCount} / {score.penalty}
            </td>
            {problems.map(
              ({ firstToSolve, isSolved, pendingCount, problem, tryCount }) => (
                <td key={problem.label}>{tryCount}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
