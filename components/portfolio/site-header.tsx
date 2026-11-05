import Image from 'next/image'
import Link from 'next/link'
import type { Profile } from '@/lib/types'
import { ContactMenu } from './contact-menu'
import { ToothMark } from './tooth-art'

export function SiteHeader({ profile, onHome }: { profile: Profile; onHome: () => void }) {
  return (
    <header className="portfolio-header">
      <button className="home-button" onClick={onHome} aria-label="Back to profile">
        <Image
          src={profile.avatar.src}
          alt=""
          width={profile.avatar.width}
          height={profile.avatar.height}
          className="header-avatar"
          priority
        />
        <span className="header-name">
          {profile.name}
          <ToothMark />
        </span>
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
