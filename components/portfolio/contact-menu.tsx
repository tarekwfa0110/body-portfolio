import { ArrowRight } from 'lucide-react'
import type { Contact } from '@/lib/types'

export function ContactMenu({ contacts }: { contacts: Contact[] }) {
  return (
    <details className="contact-menu">
      <summary className="contact-link">
        Contact <ArrowRight size={14} />
      </summary>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="eyebrow">{contact.label}</span>
              {contact.display}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
