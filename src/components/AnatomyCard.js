import { useState } from "react";
import "./AnatomyCard.css";

export default function AnatomyCard({ model, onView, onStartAR, viewed, xpEarned }) {
  const [expanded, setExpanded] = useState(false);
  const isAR = !!model.arModel;

  const handleClick = () => {
    if (isAR) {
      onStartAR?.(model);
    } else {
      setExpanded(!expanded);
      if (!viewed) onView?.(model);
    }
  };

  const embedUrl = model.embedId
    ? `https://sketchfab.com/models/${model.embedId}/embed?autostart=0`
    : null;

  return (
    <div className={`anatomy-card ${viewed ? "viewed" : ""} ${expanded ? "expanded" : ""}`}>
      <div className="anatomy-card-inner" onClick={!expanded ? handleClick : undefined}>
        <div className="anatomy-card-glow" />
        <div className="anatomy-card-icon">{model.icon}</div>
        <h3 className="anatomy-card-title">{model.name}</h3>
        <p className="anatomy-card-category">{model.category}</p>
        <p className="anatomy-card-desc">{model.description}</p>
        <div className="anatomy-card-meta">
          <span className="xp-badge">+{model.xpReward} XP</span>
          {viewed && <span className="done-badge">✓ Viewed</span>}
        </div>
        {isAR ? (
          <button
            type="button"
            className="btn-ar"
            onClick={(e) => {
              e.stopPropagation();
              onStartAR?.(model);
            }}
          >
            Start AR Experience
          </button>
        ) : (
          <button
            type="button"
            className="btn-view"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {expanded ? "Close 3D" : "View 3D Model"}
          </button>
        )}
      </div>

      {expanded && embedUrl && (
        <div className="anatomy-card-embed" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="btn-close-embed"
            onClick={() => setExpanded(false)}
            aria-label="Close"
          >
            ×
          </button>
          <iframe
            title={model.name}
            src={embedUrl}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
          />
          <p className="embed-credit">
            <a
              href={`https://sketchfab.com/3d-models/${model.id}-${model.embedId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Sketchfab
            </a>
            {" · "}
            {model.author}
          </p>
        </div>
      )}
    </div>
  );
}
