import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5.5 6.5h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm8 3 2.4-1.8a1 1 0 0 1 1.6.8v4a1 1 0 0 1-1.6.8l-2.4-1.8z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgComponent
