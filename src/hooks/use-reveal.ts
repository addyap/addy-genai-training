import { useEffect } from 'react';

/**
 * Scroll reveals for every `[data-reveal]` element on the site (spec: docs/MOTION.md §4).
 *
 * Hidden states only exist under `html.motion-ready`, which this hook adds after it has
 * marked everything already on screen as settled — so prerendered content never flashes,
 * and no-JS / reduced-motion visitors simply see the page. Each element reveals once.
 * Elements inside a `[data-reveal-group]` that enter together are staggered.
 */

const STAGGER_CAP = 5; // item 7+ shares item 6's delay
const STAGGER_MS = 70;
const REVEAL_MS = 900; // longest reveal duration (image variant)

// Drop the reveal attributes once played, so the element's own transitions
// (card hover lift, etc.) take over again at their normal speed.
const settle = (el: HTMLElement) => {
  el.removeAttribute('data-reveal');
  el.removeAttribute('data-revealed');
  el.style.removeProperty('--i');
};

export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const html = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        const groupCounts = new Map<Element, number>();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);

          const group = el.parentElement?.closest('[data-reveal-group]');
          let i = 0;
          if (group) {
            i = Math.min(groupCounts.get(group) ?? 0, STAGGER_CAP);
            groupCounts.set(group, (groupCounts.get(group) ?? 0) + 1);
          }

          el.style.setProperty('--i', String(i));
          el.setAttribute('data-revealed', '');
          window.setTimeout(() => settle(el), REVEAL_MS + i * STAGGER_MS + 50);
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
    };

    // Anything already in view at start-up stays exactly as prerendered.
    const fold = window.innerHeight;
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < fold) settle(el);
    });
    html.classList.add('motion-ready');
    watch(document);

    // New routes and late-rendered blocks (results panels, etc.) arrive as DOM mutations.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('[data-reveal]')) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      html.classList.remove('motion-ready');
    };
  }, []);
}
