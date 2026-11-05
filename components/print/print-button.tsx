'use client'

export function PrintButton() {
  return (
    <button className="print-button" onClick={() => window.print()}>
      Save as PDF
    </button>
  )
}
