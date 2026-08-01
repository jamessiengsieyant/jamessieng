import SpaceBackground from "../vast/SpaceBackground";

export default function DevPreview() {
  return (
    <div style={{ minHeight: "300vh" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1, color: "#fff", padding: 40 }}>
        Scroll to test orbit
      </div>
    </div>
  );
}
