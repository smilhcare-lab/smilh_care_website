/**
 * LogoWordmark — inline SVG logo for Smile Care.
 * variant: 'color' (default, for light backgrounds) | 'white' (for dark backgrounds)
 * height: number in px (default 40)
 */
export default function LogoWordmark({ variant = 'color', height = 40 }) {
    const textColor = variant === 'white' ? '#ffffff' : '#1B2F7E'
    const accentColor = variant === 'white' ? '#ff6b8a' : '#E8194B'
    const heartStroke = variant === 'white' ? '#ffffff' : '#1B2F7E'
    const heartFill = variant === 'white' ? 'rgba(255,255,255,0.15)' : 'rgba(232,25,75,0.08)'

    // Aspect ratio: width ~220, height ~70 → ratio ≈ 3.14
    const width = Math.round(height * 3.14)

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 220 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Smile Care"
            role="img"
        >
            {/* Heart icon */}
            <g transform="translate(0, 2)">
                {/* Outer heart */}
                <path
                    d="M27 10 C27 10 22 4 16 4 C10 4 4 9 4 16 C4 23 10 28 27 42 C44 28 50 23 50 16 C50 9 44 4 38 4 C32 4 27 10 27 10Z"
                    fill={heartFill}
                    stroke={heartStroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Inner heart dot (accent) */}
                <path
                    d="M27 16 C27 16 24 13 21 13 C18 13 16 15 16 18 C16 21 18.5 23 27 29 C35.5 23 38 21 38 18 C38 15 36 13 33 13 C30 13 27 16 27 16Z"
                    fill={accentColor}
                    opacity="0.9"
                />
            </g>

            {/* "Smilh" text */}
            <text
                x="60"
                y="38"
                fontFamily="'DM Serif Display', Georgia, serif"
                fontSize="30"
                fontWeight="400"
                fill={textColor}
                letterSpacing="-0.5"
            >
                Smilh
            </text>

            {/* "Care" text in accent */}
            <text
                x="60"
                y="38"
                fontFamily="'DM Serif Display', Georgia, serif"
                fontSize="30"
                fontWeight="400"
                fill={accentColor}
                letterSpacing="-0.5"
                dx="90"
            >
                Care
            </text>

            {/* Tagline */}
            <text
                x="60"
                y="56"
                fontFamily="'DM Sans', system-ui, sans-serif"
                fontSize="9"
                fontWeight="400"
                fill={variant === 'white' ? 'rgba(255,255,255,0.6)' : '#6b7280'}
                letterSpacing="0.5"
            >
                Une Présence, Ensemble Chaque Jour
            </text>
        </svg>
    )
}
