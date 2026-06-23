export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />

      {/* Stardust particles */}
      <div className="stardust">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 37) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              animationDelay: `${(i * 1.3) % 20}s`,
              animationDuration: `${22 + (i % 10)}s`,
              opacity: 0.15 + ((i % 4) * 0.08),
            }}
          />
        ))}
      </div>

      {/* Vignette to keep text legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,15,0.6)_100%)]" />
    </div>
  );
}
