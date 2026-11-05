import Link from 'next/link'
import { PrintButton } from '@/components/print/print-button'
import './print.css'
import { getPortfolio } from '@/lib/content'

export const revalidate = 3600

export const metadata = { title: 'Abdelrahman Alaa — Clinical Portfolio (print)' }

export default async function PrintPage() {
  const { profile, cases } = await getPortfolio()

  return (
    <main className="print-page">
      <div className="print-toolbar">
        <Link href="/">← Back to portfolio</Link>
        <PrintButton />
        <p>In the print dialog, choose “Save as PDF” as the destination.</p>
      </div>

      <section className="print-cover">
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
        <ul>
          {profile.contacts.map((contact) => (
            <li key={contact.label}>
              {contact.label}: {contact.display}
            </li>
          ))}
        </ul>
      </section>

      {cases.map((item, i) => (
        <section className="print-case" key={`${item.title}-${i}`}>
          {cases[i - 1]?.section !== item.section && (
            <h2 className="print-section">{item.section}</h2>
          )}
          <h3>{item.title}</h3>
          <div className="print-gallery" data-count={Math.min(item.images.length, 5)}>
            {item.images.map((image) => {
              return (
                // Plain img: the PDF should use the files as they are, not resized copies.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image.src}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt=""
                  loading="eager"
                />
              )
            })}
          </div>
        </section>
      ))}
    </main>
  )
}
