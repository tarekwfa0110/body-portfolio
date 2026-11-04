import { Portfolio } from '@/components/portfolio'
import { getPortfolio } from '@/lib/portfolio'

export default async function Page() {
  const { profile, cases } = await getPortfolio()
  return <Portfolio profile={profile} cases={cases} />
}
