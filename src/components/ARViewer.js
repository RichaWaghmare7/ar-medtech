import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ARViewer.css";

export default function ARViewer() {
  const navigate = useNavigate();
  const location = useLocation();
  const model = location.state?.model;
  const [info, setInfo] = useState(null);

  const gltfSrc = model?.arModel || "/heart.glb";

  useEffect(() => {
    const handler = (e) => setInfo(e.detail);
    window.addEventListener("show-organ-info", handler);
    return () => window.removeEventListener("show-organ-info", handler);
  }, []);

  return (
    <div className="ar-viewer-page">
      <button
        type="button"
        className="ar-back-btn"
        onClick={() => navigate("/dashboard")}
        aria-label="Back to dashboard"
      >
        ← Back to Dashboard
      </button>

      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker preset="hiro">
          <a-entity
            gltf-model={gltfSrc}
            scale="0.6 0.6 0.6"
            rotation="0 180 0"
            organ-click
          />
        </a-marker>
        <a-entity camera />
      </a-scene>

      {info && (
        <div className="ar-info-panel">
          <h2>{info.name}</h2>
          <p>{info.desc}</p>
          <button type="button" onClick={() => setInfo(null)}>
            Close
          </button>
        </div>
      )}

      <div className="ar-hint">
        <p>Point your camera at a <strong>Hiro marker</strong> to see the 3D model in AR.</p>
      </div>
    </div>
  );
}
