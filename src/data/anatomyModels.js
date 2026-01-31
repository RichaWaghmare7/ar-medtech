// Human anatomy and organ system 3D models from Sketchfab
// Embed URL format: https://sketchfab.com/models/{id}/embed
// Sources: https://sketchfab.com/3d-models

export const ANATOMY_MODELS = [
  {
    id: "complete-human-anatomy",
    name: "Complete Human Anatomy",
    category: "Full Body",
    embedId: "c904a5a65ae145a0bc535645c7e693af",
    author: "3D4SCI",
    xpReward: 50,
    description: "Full human anatomy model with detailed systems.",
    icon: "🧬",
  },
  {
    id: "animated-full-body",
    name: "Animated Full Human Body",
    category: "Full Body",
    embedId: "9b0b079953b840bc9a13f524b60041e4",
    author: "AVRcontent",
    xpReward: 50,
    description: "Animated full body anatomy for learning.",
    icon: "🦴",
  },
  {
    id: "full-body-anatomy",
    name: "Full Body Anatomy",
    category: "Full Body",
    embedId: "26856c9301884233a0e85b40f0b41089",
    author: "580000158",
    xpReward: 40,
    description: "Downloadable full body anatomy model.",
    icon: "👤",
  },
  {
    id: "human-anatomy-glb",
    name: "Human Anatomy",
    category: "Full Body",
    embedId: "14191ef860b44925be0e94462c84ffe6",
    author: "flixtlix",
    xpReward: 40,
    description: "Interactive human anatomy with AR/VR support.",
    icon: "🔬",
  },
  {
    id: "skeleton",
    name: "Anatomically Correct Skeleton",
    category: "Skeletal System",
    embedId: "3247ca2f8a6346d78142f193eeb59c88",
    author: "xandizandi",
    xpReward: 60,
    description: "Detailed human skeleton model.",
    icon: "💀",
  },
  {
    id: "beating-heart",
    name: "Beating Heart",
    category: "Organ Systems",
    embedId: "d9845afb1ee64ad094adc96320c67d98",
    author: "jalmer",
    xpReward: 60,
    description: "Interactive 3D beating heart model from Sketchfab.",
    icon: "❤️",
  },
  {
    id: "heart-ar",
    name: "Heart (AR Experience)",
    category: "Organ Systems",
    embedId: null,
    arModel: "/heart.glb",
    author: "AR MedTech",
    xpReward: 80,
    description: "Scan a Hiro marker to view the heart in AR!",
    icon: "❤️",
  },
];

export const BADGES = [
  { id: "first-login", name: "First Steps", icon: "🌟", requirement: "Complete login" },
  { id: "first-view", name: "Curious Mind", icon: "🔍", requirement: "View your first model" },
  { id: "heart-master", name: "Heart Master", icon: "❤️", requirement: "Complete Heart AR" },
  { id: "skeleton-explorer", name: "Bone Explorer", icon: "💀", requirement: "View Skeleton" },
  { id: "anatomy-fan", name: "Anatomy Fan", icon: "🧬", requirement: "View 3 models" },
  { id: "top-learner", name: "Top Learner", icon: "🏆", requirement: "Earn 200 XP" },
];

export const XP_PER_LEVEL = 100;
export const getLevelFromXP = (xp) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const getXPProgress = (xp) => xp % XP_PER_LEVEL;
