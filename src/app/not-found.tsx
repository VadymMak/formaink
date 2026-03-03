export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1 style={{ fontSize: "4rem", color: "#8A837B" }}>404</h1>
      <p style={{ marginTop: "1rem" }}>Page not found</p>
      <a
        href="/sk"
        style={{ display: "inline-block", marginTop: "2rem", color: "#8B3A2A" }}
      >
        Go home
      </a>
    </div>
  );
}
