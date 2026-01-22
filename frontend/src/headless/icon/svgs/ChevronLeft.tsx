import type { SVGProps } from 'react'
import { Ref, forwardRef } from 'react'
const ChevronLeft = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-left-icon lucide-chevron-left"
    ref={ref}
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)
const ForwardRef = forwardRef(ChevronLeft)
export { ForwardRef as ChevronLeft }
