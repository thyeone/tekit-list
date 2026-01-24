import type { SVGProps } from 'react'
import { Ref, forwardRef } from 'react'
const ChevronDown = (
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
    className="lucide lucide-chevron-down"
    ref={ref}
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)
const ForwardRef = forwardRef(ChevronDown)
export { ForwardRef as ChevronDown }
