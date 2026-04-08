// router.js

// BASE: nome do repositório no GitHub Pages. 
// Em desenvolvimento local (Live Server) deixa vazio "".
const REPO_BASE = "/blog";

function detectBase() {
  const p = window.location.pathname;
  if (p.endsWith(".html")) {
    return p.substring(0, p.lastIndexOf("/"));
  }
  const baseTag = document.querySelector("base[href]");
  if (baseTag) return baseTag.getAttribute("href").replace(/\/$/, "");
  // Se estiver no GitHub Pages (pathname começa com REPO_BASE), usa ele.
  // Em localhost o pathname começa com "/" direto, não bate, retorna "".
  if (p === REPO_BASE || p.startsWith(REPO_BASE + "/")) return REPO_BASE;
  return "";
}

const BASE = detectBase();
window.__router__ = { BASE };

const routes = {
  "/":     { type: "home" },
  "/kits": { type: "kits" },
};

function resolveRoute(path) {
  let p = path;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
  if (p === "/index.html" || p === "") p = "/";
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);

  if (routes[p]) return routes[p];

  return { type: "not-found" };
}