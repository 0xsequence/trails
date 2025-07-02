import { type CSSProperties, useEffect, useState } from "react"

export function GreenCheckAnimation() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const styles: Record<string, CSSProperties> = {
    container: {
      width: "80px",
      height: "80px",
      position: "relative" as const,
    },
    circleContainer: {
      position: "relative" as const,
      width: "100%",
      height: "100%",
    },
    circleFill: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "#22c55e",
      transform: animate ? "scale(1)" : "scale(0)",
      opacity: animate ? 1 : 0,
      transition: "transform 0.15s ease-out 0.3s, opacity 0.15s ease-out 0.3s",
    },
    progressRing: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transform: "rotate(-90deg)",
    },
    circle: {
      fill: "none",
      stroke: "url(#gradient)",
      strokeWidth: 4,
      strokeLinecap: "round" as const,
      strokeDasharray: 226,
      strokeDashoffset: animate ? 0 : 226,
      transition: "stroke-dashoffset 0.3s ease-out",
    },
    checkmarkContainer: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: animate
        ? "translate(-50%, -50%) scale(1)"
        : "translate(-50%, -50%) scale(0)",
      opacity: animate ? 1 : 0,
      zIndex: 10,
      transition: "transform 0.1s ease-out 0.4s, opacity 0.1s ease-out 0.4s",
    },
    checkmarkPath: {
      fill: "none",
      stroke: "white",
      strokeWidth: 4,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      strokeDasharray: 18,
      strokeDashoffset: animate ? 0 : 18,
      transition: "stroke-dashoffset 0.15s ease-out 0.45s",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.circleContainer}>
        {/* Circle fill */}
        <div style={styles.circleFill} />

        {/* Progress ring */}
        <svg style={styles.progressRing}>
          <defs>
            <radialGradient
              id="gradient"
              cx="50%"
              cy="50%"
              r="50%"
              gradientUnits="objectBoundingBox"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#22c55e", stopOpacity: 0 }}
              />
              <stop
                offset="70%"
                style={{ stopColor: "#22c55e", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#22c55e", stopOpacity: 1 }}
              />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="36" style={styles.circle} />
        </svg>

        {/* Checkmark */}
        <div style={styles.checkmarkContainer}>
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path d="M6 14l4 4L18 8" style={styles.checkmarkPath} />
          </svg>
        </div>
      </div>
    </div>
  )
}
