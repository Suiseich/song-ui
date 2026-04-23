const getEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }

      const videoId = parsedUrl.searchParams.get("v");

      if (parsedUrl.pathname.startsWith("/watch") && videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const shortsId = parsedUrl.pathname.split("/")[2];

        if (shortsId) {
          return `https://www.youtube.com/embed/${shortsId}`;
        }
      }
    }

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return "";
  }

  return "";
};

const VideoPlayer = ({ videoUrl }) => {
  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <div
        style={{
          minHeight: 320,
          display: "grid",
          placeItems: "center",
          borderRadius: 24,
          border: "1px dashed rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.22)",
          padding: 24,
          textAlign: "center",
          color: "#94a3b8",
          marginBottom: 18,
        }}
      >
        Select a track with a supported video URL to start playback.
      </div>
    );
  }

  return (
    <div
      style={{
        marginBottom: 18,
        overflow: "hidden",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "#000",
        boxShadow: "0 24px 50px rgba(0,0,0,0.35)",
      }}
    >
      <iframe
        style={{ width: "100%", aspectRatio: "16 / 9", display: "block", border: "none" }}
        src={embedUrl}
        title="Video Player"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        loading="lazy"
      />
    </div>
  );
};

export default VideoPlayer;