type DomjudgeTeam = {
  organization_id: string
  group_ids: string[]
  affiliation: string
  nationality: string
  id: string
  icpc_id: string
  name: string
  display_name: string | null
  public_description: string | null
}

export default DomjudgeTeam
