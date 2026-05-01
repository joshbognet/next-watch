 import React, { useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export default function App() {
  const ref = useRef();

  const [data, setData] = useState({
    title: "FRESH",
    hook: "What starts as a promising connection quickly turns into a nightmare.",
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

  const stars = (n) =>
    "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n);

  const downloadJPEG = async () => {
    const dataUrl = await toJpeg(ref.current, {
      quality: 1,
      pixelRatio: 3,
      backgroundColor: "#F2EFE9",
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "card.jpeg";
    a.click();
  };

  const downloadPDF = async () => {
    const dataUrl = await toJpeg(ref.current, { pixelRatio: 3 });
    const pdf = new jsPDF({ unit: "px", format: [600, 750] });
    pdf.addImage(dataUrl, "JPEG", 0, 0, 600, 750);
    pdf.save("card.pdf");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#ddd"
    }}>

      <div ref={ref} style={{
        width: 600,
        height: 750,
        background: "#F2EFE9",
        display: "flex",
        position: "relative",
        boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        fontFamily: "Inter, sans-serif"
      }}>

        {/* GRAIN */}
        <div style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)"
        }}/>

        {/* FILM STRIP */}
        <div style={{
          width: 200,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          borderRight: "6px solid black",
          position: "relative"
        }}>
          {[0,1,2].map(i => (
            <label key={i} style={{
              flex: 1,
              border: "4px solid black",
              position: "relative",
              cursor: "pointer",
              overflow: "hidden"
            }}>
              {images[i] ? (
                <img src={images[i]} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}/>
              ) : (
                <div style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11
                }}>
                  TAP
                </div>
              )}

              {/* perforation */}
              <div style={{
                position: "absolute",
                left: -8,
                top: 0,
                bottom: 0,
                width: 6,
                background:
                  "repeating-linear-gradient(black 0 6px, transparent 6px 16px)"
              }}/>

              <input type="file" hidden onChange={(e)=>handleUpload(i,e.target.files[0])}/>
            </label>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{
          flex: 1,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}>

          <div style={{ fontSize: 12, letterSpacing: 2 }}>
            MOVIE OVERVIEW
          </div>

          <input
            value={data.title}
            onChange={(e)=>update("title",e.target.value)}
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 64,
              fontWeight: 900,
              color: "#8B2E16",
              border: "none",
              background: "transparent"
            }}
          />

          <div style={{ fontSize: 14 }}>
            2022 • THRILLER / HORROR • 114 MIN
          </div>

          <hr/>

          <div>
            <div style={{ color:"#8B2E16", fontWeight:600 }}>HOOK LINE</div>
            <textarea value={data.hook} onChange={(e)=>update("hook",e.target.value)}
              style={{ width:"100%", border:"none", background:"transparent" }}/>
          </div>

          <hr/>

          <div>
            <div style={{ color:"#8B2E16", fontWeight:600 }}>STORY PREVIEW</div>
            <textarea value={data.story} onChange={(e)=>update("story",e.target.value)}
              style={{ width:"100%", border:"none", background:"transparent" }}/>
          </div>

          <hr/>

          {/* WHY + VIBE */}
          <div style={{ display:"flex", gap:20 }}>
            <ul style={{ fontSize:13, paddingLeft:16 }}>
              <li>Strong performances</li>
              <li>Tense atmosphere</li>
              <li>Unexpected twists</li>
              <li>Social commentary</li>
            </ul>

            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["DARK","INTENSE","TWISTED","PSYCHOLOGICAL","SLOW BURN"].map(v=>(
                <span key={v} style={{
                  border:"1px solid black",
                  padding:"4px 10px",
                  borderRadius:20,
                  fontSize:11
                }}>{v}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TORN EDGE */}
        <div style={{
          position:"absolute",
          bottom:110,
          width:"100%",
          height:20,
          background:"#F2EFE9",
          clipPath:"polygon(0 50%,5% 70%,10% 40%,15% 65%,20% 50%,25% 70%,30% 40%,35% 60%,40% 50%,45% 70%,50% 40%,55% 65%,60% 50%,65% 70%,70% 40%,75% 60%,80% 50%,85% 70%,90% 40%,95% 65%,100% 50%,100% 100%,0 100%)"
        }}/>

        {/* BOTTOM */}
        <div style={{
          position:"absolute",
          bottom:0,
          width:"100%",
          padding:20,
          display:"flex",
          justifyContent:"space-between",
          fontSize:12
        }}>
          <div>
            DIRECTED BY
            <input value={data.director}
              onChange={(e)=>update("director",e.target.value)}
              style={{ display:"block", border:"none", background:"transparent", color:"#8B2E16", fontWeight:700 }}/>
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
        <img src="/logo.png" style={{
          position:"absolute",
          bottom:10,
          right:10,
          width:70
        }}/>
      </div>

      {/* BUTTONS */}
      <div style={{
        position:"fixed",
        bottom:20,
        display:"flex",
        gap:10
      }}>
        <button onClick={downloadJPEG}>JPEG</button>
        <button onClick={downloadPDF}>PDF</button>
      </div>
    </div>
  );
}    
  
