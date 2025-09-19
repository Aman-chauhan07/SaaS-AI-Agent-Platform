import * as React from "react"


const MOBILE_BREAKPOINT = 768


export function useIsMobile() {

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // Run this effect only once after component mounts
  React.useEffect(() => {
    // Create a MediaQueryList object that matches screens below the breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Function to update state when screen size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Attach the event listener → listen for screen width changes
    mql.addEventListener("change", onChange)

    // Run check immediately on mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Cleanup → remove event listener when component unmounts
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Return true/false → force `undefined` into boolean using !!
  return !!isMobile
}
