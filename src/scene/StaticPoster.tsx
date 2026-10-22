/**
 * The composition used when WebGL is unavailable, when the visitor asked for
 * reduced motion, and while the 3D chunk is still loading.
 *
 * It is a deliberate poster, not a grey box: concentric instrument rings, a
 * warm core glow and a perspective grid, all in CSS and SVG.
 */
export function StaticPoster() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-static-poster="true"
    >
      {/* perspective grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(232,238,245,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(232,238,245,0.045) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          transform: 'perspective(520px) rotateX(72deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, #000 0%, transparent 78%)',
          WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 78%)',
        }}
      />

      {/* core glow */}
      <div
        className="absolute left-1/2 top-[44%] h-[min(78vh,720px)] w-[min(78vh,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(245,165,36,0.30) 0%, rgba(245,165,36,0.10) 34%, rgba(7,9,12,0) 68%)',
          filter: 'blur(6px)',
        }}
      />

      {/* instrument rings */}
      <svg
        viewBox="0 0 800 800"
        className="absolute left-1/2 top-[44%] h-[min(74vh,680px)] w-[min(74vh,680px)] -translate-x-1/2 -translate-y-1/2"
        role="presentation"
      >
        <g fill="none" transform="translate(400 400)">
          {[120, 190, 268, 330].map((r, i) => (
            <circle
              key={r}
              r={r}
              stroke={i % 2 === 0 ? 'rgba(245,165,36,0.34)' : 'rgba(53,214,195,0.20)'}
              strokeWidth={i === 1 ? 1.2 : 0.7}
              strokeDasharray={i === 3 ? '3 9' : undefined}
            />
          ))}
          <circle r="58" fill="rgba(245,165,36,0.10)" stroke="rgba(245,165,36,0.5)" strokeWidth="1" />
          <ellipse rx="300" ry="92" stroke="rgba(139,124,246,0.28)" strokeWidth="0.8" transform="rotate(-22)" />
          <ellipse rx="232" ry="70" stroke="rgba(232,238,245,0.16)" strokeWidth="0.6" transform="rotate(38)" />
        </g>
      </svg>

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 44%, transparent 42%, rgba(7,9,12,0.86) 100%)',
        }}
      />
    </div>
  )
}
