import Image from 'next/image'
import Link from 'next/link'
import { imageSize } from '@/lib/images'
import type { Profile } from '@/lib/types'
import { ContactMenu } from './contact-menu'

export function SiteHeader({
  profile,
  onHome,
}: {
  profile: Profile
  onHome: () => void
}) {
  const { width, height } = imageSize(profile.avatar)
  return (
    <header className="portfolio-header">
      <button className="home-button" onClick={onHome} aria-label="Back to profile">
        <Image
          src={profile.avatar}
          alt=""
          width={width}
          height={height}
          className="header-avatar"
          priority
        />
        <span className="header-name">{profile.name}</span>
      </button>
      <nav className="header-actions">
        <Link className="contact-link" href="/print">
          PDF
        </Link>
        <ContactMenu contacts={profile.contacts} />
      </nav>
    </header>
  )
}
