"use client";

import { useEffect, useRef } from "react";

// Receives just the image URLs from the (server) root layout so the full blog
// dataset is not bundled into every page's JavaScript.
export default function BlogImagePreloader({ imageUrls }: { imageUrls: string[] }) {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Only run once per session
    if (typeof window === 'undefined' || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const preloadBlogImages = async () => {
      // All unique blog image URLs (post-level only), deduped by the layout.
      const blogImageUrls = imageUrls;

      if (blogImageUrls.length === 0) return;

      try {
        const { imageCache } = await import("@/src/utils/imageCache");
        
        // Prioritize: Load first 6 images immediately (likely to be viewed first)
        const priorityImages = blogImageUrls.slice(0, 6);
        const remainingImages = blogImageUrls.slice(6);

        // Start preloading priority images after first paint settles. Previously
        // a 500ms timeout could fire before the homepage hero LCP completed,
        // causing the blog images to compete for bandwidth on mobile. Now we
        // wait for the load event before scheduling.
        if (priorityImages.length > 0) {
          const loadPriority = () => {
            imageCache.preloadImages(priorityImages, 3).catch(() => {
              // Silently fail
            });
          };

          const schedulePriority = () => {
            if ('requestIdleCallback' in window) {
              (window as any).requestIdleCallback(loadPriority, { timeout: 2500 });
            } else {
              setTimeout(loadPriority, 800);
            }
          };

          if (document.readyState === 'complete') {
            schedulePriority();
          } else {
            window.addEventListener('load', schedulePriority, { once: true });
          }
        }

        // Load remaining images after a delay, in smaller batches
        if (remainingImages.length > 0) {
          const loadRemaining = () => {
            imageCache.preloadImages(remainingImages, 2).catch(() => {
              // Silently fail
            });
          };

          // Wait for page to be interactive before loading remaining
          if (document.readyState === 'complete') {
            // Use requestIdleCallback for remaining images
            const runOnIdle = (callback: () => void) => {
              if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(callback, { timeout: 2000 });
              } else {
                setTimeout(callback, 1000);
              }
            };
            runOnIdle(loadRemaining);
          } else {
            window.addEventListener('load', () => {
              const runOnIdle = (callback: () => void) => {
                if ('requestIdleCallback' in window) {
                  (window as any).requestIdleCallback(callback, { timeout: 2000 });
                } else {
                  setTimeout(callback, 1000);
                }
              };
              runOnIdle(loadRemaining);
            }, { once: true });
          }
        }
      } catch (error) {
        console.warn('Failed to preload blog images:', error);
      }
    };

    // Start immediately - don't wait for page load
    // This allows images to start caching as soon as possible
    if (document.readyState === 'loading') {
      // If still loading, wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', preloadBlogImages, { once: true });
    } else {
      // Already loaded or interactive
      preloadBlogImages();
    }
  }, [imageUrls]);

  return null; // This component doesn't render anything
}
