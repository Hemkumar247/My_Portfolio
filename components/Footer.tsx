export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border)",
        padding: "28px 24px 36px",
      }}
    >
      <div
        className="container-shell"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span
          className="font-clash"
          style={{
            color: "var(--accent-primary)",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          HEM.
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "12px", color: "var(--text-secondary)" }}
        >
          Built with Next.js + Three.js
        </span>
        <span
          className="font-mono"
          style={{ fontSize: "12px", color: "var(--text-muted)" }}
        >
          © 2025 Hemkumar Vitta
        </span>
      </div>
    </footer>
  );
}
