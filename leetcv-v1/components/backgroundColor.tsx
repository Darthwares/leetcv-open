import React from 'react'

const BackgroundColor = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
      aria-hidden="true"
    >
      <circle
        cx={512}
        cy={512}
        r={512}
        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
        fillOpacity="0.7"
      />
      <defs>
        <radialGradient
          id="759c1415-0410-454c-8f7c-9a820de03641"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(512 512) rotate(90) scale(512)"
        >
          <stop stopColor="#7775D6" />
          <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default BackgroundColor