"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import React from "react";
import CachedTestimonialImage from "./CachedTestimonialImage";
import styles from "./homePageHappyUsers.module.css";
import { getLocalePrefix } from "@/src/utils/locale";

// Helper function to optimize Cloudinary URLs for fast loading
const optimizeCloudinaryUrl = (url: string, width: number = 800) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      // Extract just the image path (everything after the last slash in parts[1])
      const pathParts = parts[1].split('/');
      const imagePath = pathParts[pathParts.length - 1];
      // Reconstruct with optimized parameters
      return `${parts[0]}/upload/f_auto,q_auto:best,w_${width},c_limit,dpr_auto/${imagePath}`;
    }
  }
  return url;
};

const R2 = "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/happy-users-sc%20copy";

export const ALL_REVIEW_IMAGES = [
  `${R2}/image47.png`,
  `${R2}/image48.png`,
  `${R2}/image49.png`,
  `${R2}/image51.png`,
  `${R2}/image52.png`,
  `${R2}/image53.png`,
  `${R2}/image29.png`,
  `${R2}/image30.png`,
  `${R2}/image31.png`,
  `${R2}/image28.png`,
  `${R2}/image26.png`,
  `${R2}/image22.png`,
  `${R2}/image25.png`,
  `${R2}/image27.jpg`,
  `${R2}/image24.png`,
  `${R2}/image23.png`,
  `${R2}/image3.jpg`,
  `${R2}/image34.png`,
  `${R2}/image43.png`,
  `${R2}/image44.png`,
  `${R2}/image45.png`,
  `${R2}/image46.png`,
  `${R2}/image20.png`,
  `${R2}/image21.jpg`,
  `${R2}/image13.png`,
  `${R2}/image19.png`,
  `${R2}/image15.png`,
  `${R2}/image17.png`,
  `${R2}/image16.png`,
  `${R2}/image14.png`,
  `${R2}/image18.jpg`,
  `${R2}/image9.png`,
  `${R2}/image12.jpg`,
  `${R2}/image8.jpg`,
  `${R2}/image7.jpg`,
  `${R2}/image32.png`,
  `${R2}/image33.png`,
  `${R2}/image36.png`,
  `${R2}/image1.jpg`,
  `${R2}/image37.png`,
  `${R2}/image38.png`,
  `${R2}/image39.png`,
  `${R2}/image40.png`,
  `${R2}/image41.png`,
  `${R2}/image42.png`,
  `${R2}/image5.jpg`,
  `${R2}/image6.jpg`,
  `${R2}/image2.jpg`,
  `${R2}/image10.jpg`,
  `${R2}/image11.jpg`,
  `${R2}/image4.jpg`,
  `${R2}/image35.png`,
];


interface HomePageHappyUsersProps {
  variant?: "default" | "pricing" | "pricingVideos";
  heading?: string;
  headingClassName?: string;
  ctaLabel?: string;
}

const DEFAULT_PRICING_HEADING_CLASS =
  "mb-[720px] max-w-[430px] text-[64px] font-black leading-[1.02] tracking-[-0.02em] text-white max-[1024px]:mb-[560px] max-[1024px]:text-[50px] max-[768px]:mb-4 max-[768px]:max-w-[360px] max-[768px]:text-[40px] max-[480px]:text-[34px]";

export default function HomePageHappyUsers({
  variant = "default",
  heading = "1000+ Happy User’s Love",
  headingClassName = DEFAULT_PRICING_HEADING_CLASS,
  ctaLabel = "Book a Demo",
}: HomePageHappyUsersProps) {
  const pathname = usePathname();
  const prefix = getLocalePrefix(pathname);

  const handleTryItYourself = () => {
    if (typeof window === "undefined") {
      return;
    }

    const currentPath = pathname || window.location.pathname;
    const currentScrollY = window.scrollY || window.pageYOffset || 0;

    sessionStorage.setItem("previousPageBeforeBookADemo", currentPath);
    sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString());
    window.history.pushState({}, "", `${prefix}/book-a-demo`);
    window.dispatchEvent(new CustomEvent("showCalendlyModal"));
  };

  const videos = [
    {
      videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
      name: "Anjali Shah",
      company: "Skyworks Solutions, Inc.",
      linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-19.jpg",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg"
    },
    {
      videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
      name: "Rijul Jain",
      company: "Wise",
      linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-20.jpg",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg"
    },
    {
      videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
      name: "Aryan Gupta",
      company: "IBM",
      linkedinUrl: "#",
      profileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/website_thumbnails-18.jpg",
      smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg"
    },
  ];

  // Show a subset on the homepage (24 images)
  const reviewImages = ALL_REVIEW_IMAGES.slice(0, 24);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPricingVideoPaused, setIsPricingVideoPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [loadedProfileImages, setLoadedProfileImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const profileImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Persistent cache for preloaded images - survives re-renders
  const preloadedImageCache = useRef<Set<string>>(new Set());

  const handlePlay = (index: number) => {
    // Close all other videos
    setPlayingIndex(index);
  };

  // Preload images immediately on mount - only runs once
  useEffect(() => {
    const preloadImages = () => {
      // Preload video profile images first (critical for UX)
      videos.forEach((video, index) => {
        const profileImageUrl = optimizeCloudinaryUrl(video.profileImage, 800);
        const smallProfileImageUrl = optimizeCloudinaryUrl(video.smallProfileImage, 100);

        // Only preload if not already cached
        if (!preloadedImageCache.current.has(profileImageUrl)) {
          preloadedImageCache.current.add(profileImageUrl);
          const profileImg = new window.Image();
          profileImg.src = profileImageUrl;
          profileImg.onload = () => {
            setLoadedProfileImages(prev => new Set(prev).add(index * 2));
          };
          profileImg.onerror = () => {
            if (video.profileImage.includes('res.cloudinary.com')) {
              const fallbackUrl = video.profileImage.replace('f_auto', 'f_jpg');
              profileImg.src = fallbackUrl;
              preloadedImageCache.current.add(fallbackUrl);
            }
            setLoadedProfileImages(prev => new Set(prev).add(index * 2));
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedProfileImages(prev => new Set(prev).add(index * 2));
        }

        if (!preloadedImageCache.current.has(smallProfileImageUrl)) {
          preloadedImageCache.current.add(smallProfileImageUrl);
          const smallProfileImg = new window.Image();
          smallProfileImg.src = smallProfileImageUrl;
          smallProfileImg.onload = () => {
            setLoadedProfileImages(prev => new Set(prev).add(index * 2 + 1));
          };
          smallProfileImg.onerror = () => {
            const fallbackUrl = video.smallProfileImage.replace('f_auto', 'f_jpg');
            smallProfileImg.src = fallbackUrl;
            preloadedImageCache.current.add(fallbackUrl);
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedProfileImages(prev => new Set(prev).add(index * 2 + 1));
        }
      });

      // Preload first batch of review images
      const firstBatch = reviewImages.slice(0, 8);
      firstBatch.forEach((url, index) => {
        const optimizedUrl = optimizeCloudinaryUrl(url, 800);
        if (!preloadedImageCache.current.has(optimizedUrl)) {
          preloadedImageCache.current.add(optimizedUrl);
          const img = new window.Image();
          img.src = optimizedUrl;
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(index));
          };
        } else {
          // Already cached, mark as loaded immediately
          setLoadedImages(prev => new Set(prev).add(index));
        }
      });
    };

    preloadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Intersection Observer for lazy loading remaining images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            const isProfileImage = entry.target.hasAttribute('data-profile');

            if (isProfileImage) {
              const videoIndex = Math.floor(index / 2);
              const isSmallImage = index % 2 === 1;

              if (!loadedProfileImages.has(index)) {
                const video = videos[videoIndex];
                const imageUrl = isSmallImage ? video.smallProfileImage : video.profileImage;
                const optimizedUrl = optimizeCloudinaryUrl(imageUrl, isSmallImage ? 100 : 800);

                // Check if already cached
                if (preloadedImageCache.current.has(optimizedUrl)) {
                  setLoadedProfileImages(prev => new Set(prev).add(index));
                } else {
                  preloadedImageCache.current.add(optimizedUrl);
                  const img = new window.Image();
                  img.src = optimizedUrl;
                  img.onload = () => {
                    setLoadedProfileImages(prev => new Set(prev).add(index));
                  };
                  img.onerror = () => {
                    if (imageUrl.includes('res.cloudinary.com')) {
                      const fallbackUrl = imageUrl.replace('f_auto', 'f_jpg');
                      img.src = fallbackUrl;
                      preloadedImageCache.current.add(fallbackUrl);
                    }
                    setLoadedProfileImages(prev => new Set(prev).add(index));
                  };
                }
              }
            } else if (!loadedImages.has(index) && index >= 8) {
              // Handle review images
              const optimizedUrl = optimizeCloudinaryUrl(reviewImages[index], 800);

              // Check if already cached
              if (preloadedImageCache.current.has(optimizedUrl)) {
                setLoadedImages(prev => new Set(prev).add(index));
              } else {
                preloadedImageCache.current.add(optimizedUrl);
                const img = new window.Image();
                img.src = optimizedUrl;
                img.onload = () => {
                  setLoadedImages(prev => new Set(prev).add(index));
                };
              }
            }

            if (!isProfileImage) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before image enters viewport
        threshold: 0.01
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    profileImageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      profileImageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [reviewImages, loadedImages, loadedProfileImages, videos]);

  if (variant === "pricingVideos") {
    return (
      <section className="bg-[#fffaf8] py-20 px-8 text-center max-[768px]:py-16 max-[768px]:px-4">
        <div
          className={`${styles.pricingVideoDeck} ${
            playingIndex !== null || isPricingVideoPaused
              ? styles.pricingVideoDeckPaused
              : ""
          }`}
          onMouseEnter={() => setIsPricingVideoPaused(true)}
          onMouseLeave={() => setIsPricingVideoPaused(false)}
          onPointerEnter={() => setIsPricingVideoPaused(true)}
          onPointerLeave={() => setIsPricingVideoPaused(false)}
        >
          <div className={styles.pricingVideoTrack}>
          {[...videos, ...videos].map((video, itemIndex) => {
            const index = itemIndex % videos.length;
            const animationDelay = `-${itemIndex * 5}s`;

            return (
            <div
              key={`${video.name}-${itemIndex}`}
              className={styles.pricingVideoCard}
              style={
                {
                  animationDelay,
                  animationPlayState:
                    playingIndex !== null || isPricingVideoPaused
                      ? "paused"
                      : "running",
                } as React.CSSProperties
              }
            >
              <div className="relative w-full h-full rounded-none overflow-hidden">
                {playingIndex === itemIndex && (
                  <>
                    <iframe
                      id={`pricingUserVideo-${itemIndex}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="w-full h-full object-cover block rounded-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-30"
                      aria-label="Close video"
                    >
                      ×
                    </button>
                  </>
                )}

                {playingIndex !== itemIndex && (
                  <>
                    <div
                      ref={(el) => {
                        profileImageRefs.current[index * 2] = el;
                      }}
                      data-index={index * 2}
                      data-profile="true"
                      className="w-full h-full relative"
                    >
                      <CachedTestimonialImage
                        src={video.profileImage}
                        alt={`${video.name} - Click to play video`}
                        width={800}
                        height={1280}
                        className="w-full h-full object-cover rounded-none cursor-pointer"
                        onClick={() => setPlayingIndex(itemIndex)}
                        priority
                        sizes="(max-width: 768px) 100vw, 330px"
                      />
                    </div>
                    <div
                      className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/65 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-all duration-250 backdrop-blur-[2px] hover:bg-black/75 hover:scale-105 z-10"
                      onClick={() => setPlayingIndex(itemIndex)}
                    >
                      ▶
                    </div>
                  </>
                )}

                <div className="absolute bottom-3 left-3 right-3 h-[94px] bg-black border border-[#ff4c00] text-white text-left py-4 px-5 flex items-center z-20">
                  <div className="flex items-center gap-3 w-full h-full">
                    <div className="relative w-[46px] h-[46px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
                      <Image
                        src={video.smallProfileImage}
                        alt={video.name}
                        width={46}
                        height={46}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-[18px] font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.name}
                      </p>
                      <p className="text-[13px] m-0 text-white/90 leading-tight mt-1 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.company}
                      </p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={video.linkedinUrl !== "#" ? "noopener noreferrer" : undefined}
                      className={`flex-shrink-0 w-7 h-7 bg-white rounded flex items-center justify-center transition-colors ${
                        video.linkedinUrl !== "#"
                          ? "hover:bg-[#ff4c00] cursor-pointer"
                          : "cursor-default opacity-50"
                      }`}
                      aria-label="LinkedIn Profile"
                      onClick={(e) => {
                        if (video.linkedinUrl === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "pricing") {
    const pricingReviewImages = ALL_REVIEW_IMAGES.slice(0, 18);

    return (
      <section
        id="testimonials"
        className="relative w-full overflow-visible bg-[#ff5a18] font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
      >
        <div className="relative mx-auto grid min-h-[1560px] w-full grid-cols-[500px_minmax(0,1fr)] overflow-hidden px-[59px] pt-[65px] max-[1024px]:grid-cols-[360px_minmax(0,1fr)] max-[1024px]:px-7 max-[768px]:flex max-[768px]:min-h-0 max-[768px]:flex-col max-[768px]:gap-8 max-[768px]:px-5 max-[768px]:py-10">
          <div className="relative z-[2] flex flex-col items-start pt-[3px] text-left max-[768px]:pt-0">
            <h2 className={headingClassName}>
              {heading}
            </h2>

            <button
              type="button"
              onClick={handleTryItYourself}
              className="inline-flex h-[56px] items-center gap-4 bg-black px-[24px] text-[20px] font-bold leading-none text-white transition-colors hover:bg-[#1c1c1c]"
            >
              {ctaLabel}
              <span className="text-[34px] font-normal leading-none" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>

          <div className={`${styles.pricingReviewViewport} relative h-[1300px] min-w-0 overflow-hidden max-[768px]:h-[1400px] max-[480px]:h-[1200px]`}>
            <div className={`${styles.pricingReviewTrack} columns-4 gap-[10px] max-[1200px]:columns-3 max-[768px]:columns-3 max-[520px]:columns-2`}>
              {[...pricingReviewImages, ...pricingReviewImages].map((imageSrc, i) => (
                <div
                  key={`${imageSrc}-${i}`}
                  className="mb-[10px] inline-block w-full overflow-hidden rounded-[3px] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] [break-inside:avoid]"
                >
                  <CachedTestimonialImage
                    src={imageSrc}
                    alt={`Flashfire user review ${i + 1}`}
                    width={340}
                    height={480}
                    className="block h-auto w-full object-contain"
                    priority={i < 8}
                    sizes="(max-width: 520px) 50vw, (max-width: 768px) 33vw, 180px"
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[92px] bg-gradient-to-b from-[#ff5a18] via-[rgba(255,90,24,0.82)] to-[rgba(255,90,24,0)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[150px] bg-gradient-to-b from-[rgba(255,90,24,0)] via-[rgba(255,90,24,0.82)] to-[#ff5a18]" />
          </div>
        </div>

        <div className="absolute bottom-[-75px] left-1/2 z-[5] h-[150px] w-[150px] -translate-x-1/2 max-[768px]:hidden">
          <Image
            src="/images/character1.png"
            alt="Flashfire mascot"
            fill
            sizes="150px"
            className="object-contain"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden font-['Space_Grotesk',sans-serif] scroll-mt-[90px] max-[768px]:scroll-mt-[70px]"
    >
      {/* === Top Orange Section === */}
      <div className="relative border-t border-[#111] bg-[#fbf3ee] px-8 pb-20 pt-[90px] text-left text-[#111] max-[768px]:pt-[56px] max-[768px]:pb-12 max-[600px]:px-4">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.08em] text-[#f55d1d]">Flashfire / Customer feedback</p>
        <h2
          className="mb-4 text-[44px] font-bold max-[600px]:text-[30px]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            lineHeight: "110%",
            letterSpacing: "-0.02em",
          }}
        >
          Feedback from happy customers
        </h2>
        <p
          className="mb-8 max-[600px]:!text-[15px]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "140%",
            textAlign: "left",
            color: "#5a524d",
          }}
        >
          Conversations from 1000+ job seekers using our <span style={{ color: "#111", fontWeight: 600 }}>AI Job Search Platform</span>
        </p>
        </div>

        {/* Masonry Layout */}
        <div
          id="happy-users-gallery"
          className="columns-3 gap-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[600px]:gap-3 max-[600px]:[&>div:nth-child(n+9)]:hidden"
        >
          {reviewImages.map((imageSrc, i) => {
            const isEager = i < 8; // First 8 images load eagerly

            return (
              <div
                key={i}
                ref={(el) => {
                  imageRefs.current[i] = el;
                }}
                data-index={i}
                className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
              >
                <CachedTestimonialImage
                  src={imageSrc}
                  alt={`Flashfire user review ${i + 1}`}
                  width={400}
                  height={600}
                  className="w-full h-auto object-contain block rounded-[0.4rem] transition-opacity duration-300"
                  priority={isEager}
                  sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 28vw"
                />
              </div>
            );
          })}
        </div>
        </div>

      </div>

      {/* === Bottom White Section === */}
      <div id="video-testimonials" className="border-t border-[#111] bg-[#f5f5f2] py-24 px-8 pb-20 text-center max-[768px]:py-12 max-[768px]:px-4">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#5a524d]">Flashfire / Video testimonials</p>
        <h2 className="mb-3 text-[40px] font-bold leading-[1.1] text-[#111] max-[600px]:text-[28px]">Hear from Flashfire customers</h2>
        <p className="mb-8 text-[16px] text-[#5a524d]">Customer stories about their job-search experience.</p>
        <div className="mx-auto grid w-full max-w-[760px] grid-cols-2 gap-8 text-left max-[768px]:max-w-[340px] max-[768px]:grid-cols-1">
          {videos.slice(0, 2).map((video, index) => (
            <div key={video.videoUrl}>
              <div className="relative aspect-[5/8] w-full overflow-hidden border border-[#111]/40 bg-[#e8e2dd]">
                {playingIndex === index ? (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      title={`${video.name} video testimonial`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute right-2 top-2 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white transition-all duration-200 hover:bg-black/90"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePlay(index)}
                    aria-label={`Play ${video.name} video testimonial`}
                    className="group absolute inset-0 h-full w-full"
                  >
                    <CachedTestimonialImage
                      src={video.profileImage}
                      alt={`${video.name} - Click to play video`}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 340px"
                    />
                    <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#111]/60 bg-white text-[18px] text-[#111] shadow transition group-hover:scale-105 max-[600px]:h-10 max-[600px]:w-10 max-[600px]:text-[14px]">
                      ▶
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-3 text-[14px] text-[#5a524d]">
                {video.name} · {video.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
