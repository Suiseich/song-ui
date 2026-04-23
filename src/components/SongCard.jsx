import { useState } from "react";

const getYoutubeVideoId = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/watch")) {
        return parsedUrl.searchParams.get("v") || "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "");
    }
  } catch {
    return "";
  }

  return "";
};

const SongCard = ({ song, onPlay, isActive = false }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const youtubeId =
    getYoutubeVideoId(song.videoUrl || song.video || song.url || song.link);
  const imageUrl =
    song.thumbnail ||
    song.image ||
    song.cover ||
    song.photo ||
    song.artwork ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "");

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "hidden",
    borderRadius: 18,
    border: isActive ? "1px solid rgba(34, 211, 238, 0.38)" : "1px solid rgba(255,255,255,0.08)",
    background: isActive ? "rgba(34, 211, 238, 0.06)" : "#121212",
    color: "#fff",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: isActive
      ? "0 0 0 1px rgba(34, 211, 238, 0.12), 0 16px 34px rgba(0,0,0,0.34)"
      : "0 10px 24px rgba(0,0,0,0.26)",
    transition:
      "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
  };

  const thumbnailStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    background: "linear-gradient(135deg, #0b1220, #050816)",
    flexShrink: 0,
  };

  const contentStyle = {
    minWidth: 0,
    padding: "12px 12px 14px",
  };

  return (
    <button
      type="button"
      onClick={() => onPlay(song)}
      style={cardStyle}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-2px)";
        event.currentTarget.style.borderColor = isActive
          ? "rgba(34, 211, 238, 0.55)"
          : "rgba(255,255,255,0.18)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.borderColor = isActive
          ? "rgba(34, 211, 238, 0.42)"
          : "rgba(255,255,255,0.08)";
      }}
    >
      <div style={thumbnailStyle}>
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={song.title || "Song thumbnail"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 180ms ease",
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", color: "#cbd5e1" }}>
            <div style={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 16 }}>
              ▶
            </div>
          </div>
        )}
        <div style={{ pointerEvents: "none", position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.42), transparent 52%)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", right: 10, bottom: 10, borderRadius: 999, background: "rgba(0,0,0,0.72)", padding: "3px 8px", fontSize: 10, fontWeight: 600, color: "#fff", letterSpacing: "0.18em" }}>
          PLAY
        </div>
        <div style={{ position: "absolute", left: 10, top: 10, borderRadius: 999, background: "rgba(0,0,0,0.65)", padding: "4px 8px", fontSize: 10, color: "#f8fafc", textTransform: "uppercase", letterSpacing: "0.2em" }}>
          Video
        </div>
      </div>

      <div style={contentStyle}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: "#f8fafc" }}>
          {song.title || song.name || "No Title"}
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 12, color: "#a5b4fc", opacity: 0.92 }}>
          {song.artist || song.author || "Unknown Artist"}
        </p>
      </div>
    </button>
  );
};

export default SongCard;
