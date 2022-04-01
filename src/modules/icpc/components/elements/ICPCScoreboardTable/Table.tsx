import Problem from '@/icpc/types/Problem'
import Team from '@/icpc/types/Team'
import { FC } from 'react'
import styles from '@/styles/Table.module.css'
import clsx from 'clsx'

type Props = {
  problems: Problem[]
  teams: Team[]
}

const Table: FC<Props> = ({ problems, teams }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.scoreThead}>
        <tr>
          <th className={styles.scoreTh} style={{ borderLeft: 'none' }}>
            Rank
          </th>
          <th className={styles.scoreTh}>Team</th>
          <th className={styles.scoreTh}>Score</th>
          {problems.map(({ label, name }) => (
            <th
              key={label}
              title={`Problem ${name}`}
              className={styles.scoreTh}
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {teams.map(({ id, institution, name, problems, score }, rank) => (
          <tr key={id}>
            <td className={styles.scoreTd}>{rank}</td>
            <td className={clsx(styles.scoreTd, styles.teamNameTd)}>
              <p>{name}</p>
              <small className={styles.teamInstitution}>
                {institution.name}
              </small>
            </td>
            <td className={styles.scoreTd}>
              <p>{score.solvedCount}</p>
              <small>{score.penalty}</small>
            </td>
            {problems.map(
              ({
                firstToSolve,
                isSolved,
                pendingCount,
                problem,
                tryCount,
                time,
              }) => (
                <td className={styles.scoreTd} key={problem.label}>
                  {tryCount > 0 && (
                    <>
                      <p>{time === null ? '-' : time}</p>
                      <small>
                        {tryCount} {tryCount === 1 ? 'try' : 'tries'}
                      </small>
                    </>
                  )}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
