import Image from 'next/image'
import type { Profile } from '@/lib/types'

export function ProfileSlide({ profile }: { profile: Profile }) {
  return (
    <div className="profile-slide">
      <div className="profile-image-wrap">
        <Image
          src={profile.portrait.src}
          alt={profile.name}
          width={profile.portrait.width}
          height={profile.portrait.height}
          sizes="(max-width: 800px) 100vw, 50vw"
          className="profile-image"
          priority
        />
      </div>
      <div className="profile-copy">
        <span className="eyebrow">01 / About the clinician</span>
        <h1>{profile.name}</h1>
        <p className="profile-description">{profile.bio}</p>
      </div>
    </div>
  )
}
