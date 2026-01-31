import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ANATOMY_MODELS,
  BADGES,
  XP_PER_LEVEL,
  getLevelFromXP,
  getXPProgress,
} from "../data/anatomyModels";
import AnatomyCard from "./AnatomyCard";
import "./Dashboard.css";

const STORAGE_XP = "ar-medtech-xp";
const STORAGE_VIEWED = "ar-medtech-viewed";
const STORAGE_BADGES = "ar-medtech-badges";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [xp, setXp] = useState(0);
  const [viewedIds, setViewedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_VIEWED) || "[]");
    } catch {
      return [];
    }
  });
  const [earnedBadges, setEarnedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_BADGES) || "[]");
    } catch {
      return [];
    }
  });
  const [showXPBounce, setShowXPBounce] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_XP);
    if (stored) setXp(parseInt(stored, 10) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_XP, String(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem(STORAGE_VIEWED, JSON.stringify(viewedIds));
  }, [viewedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BADGES, JSON.stringify(earnedBadges));
  }, [earnedBadges]);

  useEffect(() => {
    if (!user) return;
    setEarnedBadges((prev) =>
      prev.includes("first-login") ? prev : [...prev, "first-login"]
    );
  }, [user]);

  const level = getLevelFromXP(xp);
  const xpInLevel = getXPProgress(xp);
  const progressPct = (xpInLevel / XP_PER_LEVEL) * 100;

  const handleViewModel = (model) => {
    if (viewedIds.includes(model.id)) return;
    setViewedIds((prev) => [...prev, model.id]);
    setXp((prev) => {
      const next = prev + model.xpReward;
      setShowXPBounce(true);
      setTimeout(() => setShowXPBounce(false), 600);
      return next;
    });
    checkBadges(model);
  };

  const checkBadges = (model) => {
    const newViewed = [...viewedIds, model.id];
    const toAdd = [];

    if (!earnedBadges.includes("first-view")) toAdd.push("first-view");
    if (model.id === "heart-ar" && !earnedBadges.includes("heart-master"))
      toAdd.push("heart-master");
    if (model.id === "skeleton" && !earnedBadges.includes("skeleton-explorer"))
      toAdd.push("skeleton-explorer");
    if (newViewed.length >= 3 && !earnedBadges.includes("anatomy-fan"))
      toAdd.push("anatomy-fan");

    const newXp = xp + model.xpReward;
    if (newXp >= 200 && !earnedBadges.includes("top-learner")) toAdd.push("top-learner");

    if (toAdd.length) setEarnedBadges((prev) => [...prev, ...toAdd]);
  };

  const handleStartAR = (model) => {
    if (!viewedIds.includes(model.id)) handleViewModel(model);
    navigate("/ar", { state: { model } });
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const badgeList = BADGES.map((b) => ({
    ...b,
    earned: earnedBadges.includes(b.id),
  }));

  return (
    <div className="dashboard-page">
      <div className="dashboard-bg">
        <div className="dashboard-bg-gradient" />
        <div className="dashboard-bg-grid" />
      </div>

      <header className="dashboard-header">
        <div className="header-left">
          <span className="logo-icon">🧬</span>
          <span className="logo-text">AR MedTech</span>
        </div>
        <div className="header-right">
          <div className={`xp-display ${showXPBounce ? "bounce" : ""}`}>
            <span className="xp-icon">⭐</span>
            <span className="xp-value">{xp}</span>
            <span className="xp-label">XP</span>
          </div>
          <div className="level-badge">
            <span className="level-num">Lv.{level}</span>
          </div>
          <div className="user-menu">
            <span className="user-name">{user?.name || "Student"}</span>
            <button type="button" className="btn-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="progress-section">
          <div className="progress-card">
            <h2 className="progress-title">Your progress</h2>
            <div className="level-bar-wrap">
              <div className="level-bar-bg">
                <div
                  className="level-bar-fill"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="level-bar-label">
                {xpInLevel} / {XP_PER_LEVEL} XP to Level {level + 1}
              </span>
            </div>
          </div>
        </section>

        <section className="badges-section">
          <h2 className="section-title">🏆 Badges</h2>
          <div className="badges-grid">
            {badgeList.map((badge) => (
              <div
                key={badge.id}
                className={`badge-item ${badge.earned ? "earned" : ""}`}
                title={badge.requirement}
              >
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="anatomy-section">
          <h2 className="section-title">Human Anatomy & Organ Systems</h2>
          <p className="section-subtitle">
            Explore 3D models from{" "}
            <a
              href="https://sketchfab.com/3d-models"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sketchfab
            </a>{" "}
            — view in browser or try AR with the Heart!
          </p>

          <div className="sketchfab-embed-wrapper sketchfab-featured">
            <iframe
              title="Complete Human Anatomy"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/c904a5a65ae145a0bc535645c7e693af/embed"
            />
            <p className="sketchfab-embed-credit">
              <a
                href="https://sketchfab.com/3d-models/complete-human-anatomy-c904a5a65ae145a0bc535645c7e693af?utm_medium=embed&utm_campaign=share-popup&utm_content=c904a5a65ae145a0bc535645c7e693af"
                target="_blank"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Complete Human Anatomy
              </a>{" "}
              by{" "}
              <a
                href="https://sketchfab.com/3D4SCI?utm_medium=embed&utm_campaign=share-popup&utm_content=c904a5a65ae145a0bc535645c7e693af"
                target="_blank"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                3D4SCI
              </a>{" "}
              on{" "}
              <a
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=c904a5a65ae145a0bc535645c7e693af"
                target="_blank"
                rel="nofollow noreferrer"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Sketchfab
              </a>
            </p>
          </div>

          <div className="anatomy-grid">
            {ANATOMY_MODELS.map((model) => (
              <AnatomyCard
                key={model.id}
                model={model}
                onView={handleViewModel}
                onStartAR={handleStartAR}
                viewed={viewedIds.includes(model.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
