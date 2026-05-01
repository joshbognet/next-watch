import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();

  const [title, setTitle] = useState("FRESH");
  const [hook, setHook] = useState(
    "What starts as a promising connection quickly turns into a nightmare."
  );
  const [story, setStory] = useState(
    "After quitting dating apps, Noa meets Steve, a charming man who seems different..."
  );

  const [images, setImages] = useState([null, null, null]);

  const handleUpload = (i, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const copy = [...images];
      copy[i] = reader.result;
      setImages(copy);
    };
    reader.readAsDataURL(file);
  };

  const downloadJPEG = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: "#F2EFE9",
    });

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "movie-card.jpeg";
    a.click();
  };

  const downloadPDF = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 2,
    });

    const pdf = new jsPDF({ unit: "px", format: [600, 750] });
    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("movie-card.pdf");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#d9d9d9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20
    }}>

      {/* CARD */}
      <div
        ref={ref}
        style={{
          width: 600,
          height: 750,
          background: "#F2EFE9",
          display: "flex",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden"
        }}
      >

        {/* GRAIN */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)"
        }} />

        {/* LEFT FILM STRIP */}
        <div style={{
          width: 220,
          borderLeft: "8px solid black",
          borderRight: "8px solid black",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 10,
          position: "relative"
        }}>
          {[0,1,2].map(i => (
            <label key={i} style={{
              flex: 1,
              border: "4px solid black",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden"
            }}>
              {images[i] ? (
                <img src={images[i]} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} />
              ) : (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 12
                }}>
                  TAP TO UPLOAD
                </div>
              )}

              {/* film holes */}
              <div style={{
                position: "absolute",
                left: -10,
                top: 0,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around"
              }}>
                {[...Array(6)].map((_,idx)=>(
                  <div key={idx} style={{
                    width: 6,
                    height: 6,
                    background: "black"
                  }} />
                ))}
              </div>

              <input
                type="file"
                hidden
                onChange={(e)=>handleUpload(i, e.target.files[0])}
              />
            </label>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div style={{
          flex: 1,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>

          <div style={{ fontSize: 12, letterSpacing: 2 }}>
            MOVIE OVERVIEW
          </div>

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "#8B2E16",
              border: "none",
              outline: "none",
              background: "transparent"
            }}
          />

          <div style={{ fontSize: 14 }}>
            2022 • THRILLER / HORROR • 114 MIN
          </div>

          <div>
            <b style={{ color: "#8B2E16" }}>HOOK LINE</b>
            <textarea
              value={hook}
              onChange={(e)=>setHook(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14
              }}
            />
          </div>

          <div>
            <b style={{ color: "#8B2E16" }}>STORY PREVIEW</b>
            <textarea
              value={story}
              onChange={(e)=>setStory(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14
              }}
            />
          </div>

          {/* VIBE TAGS */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6
          }}>
            {["DARK","INTENSE","TWISTED","PSYCHOLOGICAL"].map(tag=>(
              <span key={tag} style={{
                border: "1px solid black",
                padding: "4px 8px",
                borderRadius: 20,
                fontSize: 11
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* TORN PAPER */}
        <div style={{
          position: "absolute",
          bottom: 110,
          width: "100%",
          height: 20,
          background: "#F2EFE9",
          clipPath:
            "polygon(0 40%, 5% 60%, 10% 50%, 15% 70%, 20% 40%, 25% 60%, 30% 45%, 35% 65%, 40% 50%, 45% 70%, 50% 40%, 55% 60%, 60% 50%, 65% 70%, 70% 45%, 75% 65%, 80% 50%, 85% 70%, 90% 45%, 95% 60%, 100% 40%, 100% 100%, 0 100%)"
        }} />

        {/* BOTTOM */}
        <div style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12
        }}>
          <div>
            <div>DIRECTED BY</div>
            <b style={{ color: "#8B2E16" }}>MIMI CAVE</b>
          </div>

          <div>
            <div>RATING</div>
            ★★★★☆
          </div>

          <div>
            <div>REWATCH</div>
            ★★★☆☆
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
            opacity: 0.9
          }}
        />
      </div>

      {/* BUTTONS */}
      <div style={{
        position: "fixed",
        bottom: 20,
        display: "flex",
        gap: 10
      }}>
        <button onClick={downloadJPEG}>Download JPEG</button>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>

    </div>
  );
}
      
