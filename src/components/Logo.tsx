export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity={1} />
          <stop offset="25%" stopColor="#FFA500" stopOpacity={1} />
          <stop offset="75%" stopColor="#FF6347" stopOpacity={1} />
          <stop offset="100%" stopColor="#FF4500" stopOpacity={1} />
        </linearGradient>
        
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE44D" stopOpacity={1} />
          <stop offset="50%" stopColor="#FFB84D" stopOpacity={1} />
          <stop offset="100%" stopColor="#FF6B4D" stopOpacity={1} />
        </linearGradient>
        
        <linearGradient id="grad3" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFE44D" stopOpacity={1} />
          <stop offset="50%" stopColor="#FFB84D" stopOpacity={1} />
          <stop offset="100%" stopColor="#FF4D4D" stopOpacity={1} />
        </linearGradient>
      </defs>
      
      <g transform="translate(200, 200) rotate(45) translate(-200, -200)">
        <rect x="50" y="50" width="300" height="300" fill="url(#grad1)"/>
        <path d="M 125 50 L 275 50 L 200 175 L 125 175 Z" fill="url(#grad2)"/>
        <path d="M 200 225 L 275 225 L 275 350 L 125 350 Z" fill="url(#grad3)"/>
      </g>
    </svg>
  );
}
