<template>
  <nav class="navbar glass-panel">
    <div class="container nav-content">
      <router-link to="/" class="brand-logo heading-hero">K.</router-link>
      
      <div class="nav-links">
        <router-link to="/">Studio</router-link>
        <router-link to="/gallery">Gallery</router-link>
        <router-link to="/posts">Journal</router-link>
        <router-link to="/about">Mindex</router-link>
      </div>
      
      <div class="nav-meta">
        <span class="text-muted text-elegant">Est. 2026</span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  border-top: none;
  border-left: none;
  border-right: none;
  background: rgba(10, 10, 11, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  /* Apply golden radius only to bottom for elegance if desired, or all */
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);
  transition: opacity 0.6s ease, filter 0.6s ease;
}

.nav-content {
  display: flex;
  justify-content: flex-start; /* Absolute left alignment for logo */
  align-items: center;
  width: 100%;
}

.brand-logo {
  font-size: clamp(1.25rem, 4vw, 2rem);
  text-decoration: none;
  color: var(--text-primary);
  line-height: 1;
}

.nav-links {
  display: flex;
  gap: clamp(var(--spacer-4), 3vw, var(--spacer-6));
  margin-left: auto; /* Push links to the right */
}

.nav-links a {
  text-decoration: none;
  color: var(--text-muted);
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 500;
  transition: var(--transition-fast);
  position: relative;
  white-space: nowrap;
}

.nav-links a:hover,
.nav-links .router-link-active {
  color: var(--text-primary);
}

.nav-links .router-link-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--text-primary);
}

.nav-meta {
  font-size: 0.8rem;
  opacity: 0.6;
  margin-left: var(--spacer-8);
}

@media (max-width: 640px) {
  .nav-links {
    gap: var(--spacer-4);
  }
  .nav-meta {
    display: none;
  }
}

@media (max-width: 400px) {
  .nav-links {
    gap: var(--spacer-2);
  }
  .brand-logo {
     margin-right: var(--spacer-4);
  }
}
</style>
