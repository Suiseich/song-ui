import { useEffect, useMemo, useState } from "react";
import { getSongs } from "./api/songApi";
import SongCard from "./components/SongCard";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getSongs();
        // Fix 1: Ensure data is an array before setting state
        const songList = Array.isArray(data) ? data : [];
        setSongs(songList);
        if (songList.length > 0) {
          setSelectedSong(songList[0]);
        }
      } catch (err) {
        console.error("Error fetching songs:", err);
        setSongs([]); // Fix 2: Fallback to empty array on error
      }
    };

    fetchSongs();
  }, []);

  const currentVideo =
    selectedSong?.videoUrl ||
    selectedSong?.video ||
    selectedSong?.url ||
    selectedSong?.link ||
    null;

  const filteredSongs = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    // Fix 3: Safety check (songs || []) to prevent .filter() crash
    return (songs || []).filter((song) => {
      const title = (song.title || song.name || "").toLowerCase();
      const artist = (song.artist || song.author || "").toLowerCase();

      if (!query) return true;
      return title.includes(query) || artist.includes(query);
    });
  }, [songs, searchTerm]);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0f0f0f",
      color: "#fff",
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 20px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(15,15,15,0.96)",
      backdropFilter: "blur(18px)",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexShrink: 0,
    },
    logo: {
      width: 42,
      height: 42,
      borderRadius: 999,
      background: "rgba(255,255,255,0.1)",
      display: "grid",
      placeItems: "center",
      fontSize: 18,
    },
    brandText: {
      lineHeight: 1.1,
    },
    brandTitle: {
      fontSize: 16,
      fontWeight: 700,
    },
    brandSubtitle: {
      marginTop: 4,
      fontSize: 11,
      letterSpacing: "0.28em",
      color: "#94a3b8",
      textTransform: "uppercase",
    },
    searchWrap: {
      flex: 1,
      display: isWideScreen ? "flex" : "none",
      justifyContent: "center",
      minWidth: 0,
    },
    searchBar: {
      width: "min(720px, 100%)",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "#121212",
    },
    searchInput: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#fff",
      padding: "12px 18px",
      fontSize: 14,
      minWidth: 0,
    },
    searchButton: {
      border: "none",
      borderLeft: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
      color: "#d1d5db",
      padding: "12px 18px",
      cursor: "pointer",
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexShrink: 0,
    },
    actionButton: {
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
      color: "#e5e7eb",
      borderRadius: 999,
      padding: "10px 16px",
      cursor: "pointer",
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 999,
      display: "grid",
      placeItems: "center",
      background: "rgba(34,211,238,0.18)",
      color: "#cffafe",
      fontWeight: 700,
      fontSize: 13,
    },
    shell: {
      display: "flex",
      width: "100%",
      maxWidth: 1600,
      margin: "0 auto",
    },
    sidebar: {
      width: 240,
      padding: 16,
      borderRight: "1px solid rgba(255,255,255,0.08)",
      background: "#0f0f0f",
      display: isWideScreen ? "block" : "none",
      position: "sticky",
      top: 64,
      height: "calc(100vh - 64px)",
      flexShrink: 0,
    },
    sidebarStack: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    sidebarButton: (active = false) => ({
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 14px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      color: active ? "#fff" : "#cbd5e1",
      background: active ? "rgba(255,255,255,0.10)" : "transparent",
    }),
    main: {
      flex: 1,
      minWidth: 0,
      padding: 20,
    },
    layout: {
      display: "grid",
      gap: 20,
      gridTemplateColumns: isWideScreen ? "minmax(0, 1.65fr) 360px" : "1fr",
    },
    watchCard: {
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "#161616",
      overflow: "hidden",
    },
    watchMeta: {
      padding: "16px 18px 18px",
    },
    title: {
      margin: 0,
      fontSize: 28,
      lineHeight: 1.2,
      fontWeight: 700,
    },
    subtitle: {
      margin: "8px 0 0",
      fontSize: 14,
      color: "#9ca3af",
    },
    chipsRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 14,
    },
    chip: {
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      color: "#d1d5db",
      padding: "6px 12px",
      fontSize: 12,
    },
    recHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      marginBottom: 12,
    },
    sectionTitle: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
    },
    sectionText: {
      margin: "4px 0 0",
      color: "#9ca3af",
      fontSize: 13,
    },
    pill: {
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
      padding: "7px 12px",
      color: "#d1d5db",
      fontSize: 12,
      whiteSpace: "nowrap",
    },
    recGrid: {
      display: "grid",
      gap: 12,
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    },
    emptyState: {
      borderRadius: 24,
      border: "1px dashed rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.04)",
      padding: 20,
      textAlign: "center",
      color: "#9ca3af",
      gridColumn: "1 / -1",
    },
    sidebarCard: {
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "#181818",
      padding: 16,
      marginBottom: 16,
    },
    sidebarText: {
      color: "#9ca3af",
      fontSize: 13,
      lineHeight: 1.7,
      marginTop: 8,
    },
    statRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 16,
      background: "rgba(255,255,255,0.05)",
      padding: "12px 14px",
      color: "#e5e7eb",
      fontSize: 14,
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>▶</div>
          <div style={styles.brandText}>
            <div style={styles.brandTitle}>SongTube</div>
            <div style={styles.brandSubtitle}>Music video library</div>
          </div>
        </div>

        <div style={styles.searchWrap}>
          <div style={styles.searchBar}>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search"
              style={styles.searchInput}
            />
            <button type="button" style={styles.searchButton}>
              Search
            </button>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button type="button" style={styles.actionButton}>
            Create
          </button>
          <div style={styles.avatar}>J</div>
        </div>
      </header>

      <div style={styles.shell}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarStack}>
            <button type="button" style={styles.sidebarButton(true)}>
              <span>🏠</span>
              <span>Home</span>
            </button>
            <button type="button" style={styles.sidebarButton()}>
              <span>🎵</span>
              <span>Music</span>
            </button>
            <button type="button" style={styles.sidebarButton()}>
              <span>📺</span>
              <span>Trending</span>
            </button>
            <button type="button" style={styles.sidebarButton()}>
              <span>⭐</span>
              <span>Favorites</span>
            </button>
          </div>
        </aside>

        <main style={styles.main}>
          <div style={styles.layout}>
            <section>
              <div style={styles.watchCard}>
                <VideoPlayer videoUrl={currentVideo} />

                <div style={styles.watchMeta}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.28em", color: "#94a3b8", textTransform: "uppercase" }}>
                    Now playing
                  </p>
                  <h1 style={styles.title}>
                    {selectedSong?.title || selectedSong?.name || "Choose a track"}
                  </h1>
                  <p style={styles.subtitle}>
                    {selectedSong?.artist || selectedSong?.author || "Select a song from the list"}
                  </p>

                  <div style={styles.chipsRow}>
                    <span style={styles.chip}>{songs.length} videos</span>
                    <span style={styles.chip}>Dark watch layout</span>
                    <span style={styles.chip}>Select a card to switch playback</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={styles.recHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>Recommended</h2>
                    <p style={styles.sectionText}>Pick another track from the list.</p>
                  </div>
                  <div style={styles.pill}>{filteredSongs.length} items</div>
                </div>

                <div style={styles.recGrid}>
                  {filteredSongs.length === 0 ? (
                    <div style={styles.emptyState}>No songs match your search.</div>
                  ) : (
                    filteredSongs.map((song, index) => (
                      <SongCard
                        key={song.id || index}
                        song={song}
                        isActive={selectedSong === song}
                        onPlay={(s) => setSelectedSong(s)}
                      />
                    ))
                  )}
                </div>
              </div>
            </section>

            {isWideScreen ? (
              <aside>
                <div style={styles.sidebarCard}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.28em", color: "#94a3b8", textTransform: "uppercase" }}>
                    Library
                  </p>
                  <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700 }}>{songs.length}</div>
                  <p style={styles.sidebarText}>
                    Search and choose a track from the recommendations. The active card stays highlighted.
                  </p>
                </div>

                <div style={styles.sidebarCard}>
                  <p style={{ margin: 0, marginBottom: 12, fontSize: 11, letterSpacing: "0.28em", color: "#94a3b8", textTransform: "uppercase" }}>
                    Playlist mood
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={styles.statRow}>
                      <span>Dark</span>
                      <span style={{ color: "#64748b" }}>On</span>
                    </div>
                    <div style={styles.statRow}>
                      <span>Card layout</span>
                      <span style={{ color: "#64748b" }}>On</span>
                    </div>
                    <div style={styles.statRow}>
                      <span>Search</span>
                      <span style={{ color: "#64748b" }}>On</span>
                    </div>
                  </div>
                </div>
              </aside>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
