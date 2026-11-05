import { Deck } from '@/components/portfolio/deck'
import { getPortfolio } from '@/lib/content'

export const revalidate = 3600

export default async function Page() {
  const { profile, cases } = await getPortfolio()
  return <Deck profile={profile} cases={cases} />
}
