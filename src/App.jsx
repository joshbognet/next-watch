import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();

  const [data, setData] = useState({
    title: "FRESH",
    hook:
      "What starts as a promising connection quickly turns into a nightmare.",
    story:
      "After quitting dating apps, Noa meets Steve, a charming man who seems different. Their spontaneous weekend getaway feels like the start of something real—until unsettling truths begin to surface.",
    director: "MIMI CAVE",
    rating: 4,
    rewatch: 3,
  });

  const [images, setImages] = useState([null, null, null]);

  const update = (k, v) => setData({ ...data, [k]: v });

  const handleUpload = (i, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const copy = [...images];
      copy[i] = reader.result;
      setImages(copy);
    };
    reader.readAsDataURL(file);
  };

  const stars = (n) => "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n);

  const downloadJPEG = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#F2EFE9",
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "movie-card.jpeg";
    a.click();
  };

  const downloadPDF = async () => {
    const dataUrl = await toJpeg(ref.current, {
      pixelRatio: 3,
      backgroundColor: "#F2EFE9",
    });
    const pdf = new jsPDF({ unit: "px", format: [600, 750] });
    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("movie-card.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#dcdcdc",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        ref={ref}
        style={{
          width: 600,
          height: 750,
          background: "#F2EFE9",
          display: "flex",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "url(https://grainy-gradients.vercel.app/noise.svg)",
          }}
        />

        {/* FILM STRIP */}
        <div
          style={{
            width: 180,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "18px 10px",
            borderRight: "4px solid black",
            position: "relative",
          }}
        >
          {/* perforation */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 10,
              background:
                "repeating-linear-gradient(to bottom, black 0 8px, transparent 8px 20px)",
            }}
          />

          {[0, 1, 2].map((i) => (
            <label
              key={i}
              style={{
                flex: 1,
                border: "3px solid black",
                marginLeft: 12,
                overflow: "hidden",
                cursor: "pointer",
                background: "#eee",
              }}
            >
              {images[i] ? (
                <img
                  src={images[i]}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                >
                  TAP
                </div>
              )}
              <input
                type="file"
                hidden
                onChange={(e) => handleUpload(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>

        {/* CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "24px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 12, letterSpacing: 2 }}>
            MOVIE OVERVIEW
          </div>

          <input
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: -1,
              color: "#8B2E16",
              border: "none",
              background: "transparent",
            }}
          />

          <div style={{ fontSize: 14 }}>
            2022 • THRILLER / HORROR • 114 MIN
          </div>

          <div style={{ height: 1, background: "#ccc" }} />

          <div>
            <div style={{ color: "#8B2E16", fontWeight: 600 }}>
              HOOK LINE
            </div>
            <textarea
              value={data.hook}
              onChange={(e) => update("hook", e.target.value)}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
              }}
            />
          </div>

          <div style={{ height: 1, background: "#ccc" }} />

          <div>
            <div style={{ color: "#8B2E16", fontWeight: 600 }}>
              STORY PREVIEW
            </div>
            <textarea
              value={data.story}
              onChange={(e) => update("story", e.target.value)}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
              }}
            />
          </div>

          <div style={{ height: 1, background: "#ccc" }} />

          {/* WHY + VIBE */}
          <div style={{ display: "flex", gap: 20 }}>
            <ul
              style={{
                fontSize: 12,
                paddingLeft: 16,
                lineHeight: 1.6,
                width: "50%",
              }}
            >
              <li>Strong performances</li>
              <li>Tense atmosphere</li>
              <li>Unexpected twists</li>
              <li>Social commentary</li>
            </ul>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                width: "50%",
              }}
            >
              {[
                "DARK",
                "INTENSE",
                "TWISTED",
                "PSYCHOLOGICAL",
                "SLOW BURN",
                "UNSETTLING",
              ].map((v) => (
                <span
                  key={v}
                  style={{
                    border: "1px solid #444",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                  }}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TORN EDGE */}
        <div
          style={{
            position: "absolute",
            bottom: 110,
            width: "100%",
            height: 20,
            background: "#F2EFE9",
            clipPath:
              "polygon(0 60%,5% 70%,10% 55%,15% 75%,20% 60%,25% 70%,30% 55%,35% 75%,40% 60%,45% 70%,50% 55%,55% 75%,60% 60%,65% 70%,70% 55%,75% 75%,80% 60%,85% 70%,90% 55%,95% 75%,100% 60%,100% 100%,0 100%)",
          }}
        />

        {/* BOTTOM */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "18px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 11,
          }}
        >
          <div>
            DIRECTED BY
            <input
              value={data.director}
              onChange={(e) => update("director", e.target.value)}
              style={{
                display: "block",
                border: "none",
                background: "transparent",
                color: "#8B2E16",
                fontWeight: 700,
              }}
            />
          </div>

          <div>
            PERSONAL RATING
            <div>{stars(data.rating)}</div>
          </div>

          <div>
            REWATCH VALUE
            <div>{stars(data.rewatch)}</div>
          </div>
        </div>

        {/* LOGO */}
        <img
          src="/logo.png"
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            width: 70,
          }}
        />
      </div>

      {/* BUTTONS */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          display: "flex",
          gap: 10,
        }}
      >
        <button onClick={downloadJPEG}>Download JPEG</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}      
            
