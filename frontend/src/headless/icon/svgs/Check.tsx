import type { SVGProps } from 'react'
import { Ref, forwardRef } from 'react'
const Check = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
    className="lucide lucide-check-icon lucide-check"
    ref={ref}
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const ForwardRef = forwardRef(Check)
export { ForwardRef as Check }
