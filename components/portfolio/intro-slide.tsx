export function IntroSlide({ section, number }: { section: string; number: string }) {
  return (
    <div className="intro-slide">
      <span className="intro-number">{number}</span>
      <div>
        <span className="eyebrow">A clinical collection</span>
        <h1>{section}</h1>
      </div>
    </div>
  )
}
