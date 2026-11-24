"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./homePageCustomerStories.module.css";

type CustomerVideo = {
  videoUrl: string;
  name: string;
  company: string;
  linkedinUrl: string;
  profileImage: string;
  smallProfileImage: string;
};

type Props = {
  reviewImages: string[];
  featuredVideo: CustomerVideo;
  videos: CustomerVideo[];
};

function LinkedInBadge({ url, name }: { url: string; name: string }) {
  const icon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  if (url === "#") {
    return <span className={`${styles.linkedinBadge} ${styles.linkedinDisabled}`} aria-label={`${name} LinkedIn profile unavailable`}>{icon}</span>;
  }

  return (
    <a className={styles.linkedinBadge} href={url} target="_blank" rel="noopener noreferrer" aria-label={`View ${name}'s LinkedIn profile`}>
      {icon}
    </a>
  );
}

export default function HomePageCustomerStories({ reviewImages, featuredVideo, videos }: Props) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="customer-stories-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}><i /> CUSTOMER STORIES / HUMAN SUPPORT</span>
          <h2 id="customer-stories-title">Real people. Real job-search progress.</h2>
          <p>See how Flashfire combines personalized support, role-tailored resumes, and a more organized job search.</p>
        </header>

        <div className={styles.storyGrid}>
          <article className={styles.featuredStory}>
            <div className={styles.featuredTop}>
              <span className={styles.storyLabel}>FEATURED CUSTOMER STORY</span>
              <span className={styles.storyMark}>01</span>
            </div>
            <div className={styles.personRow}>
              <div className={styles.personImage}>
                <Image src={featuredVideo.smallProfileImage} alt="" fill sizes="72px" unoptimized />
              </div>
              <div>
                <h3>{featuredVideo.name}</h3>
                <p>{featuredVideo.company}</p>
              </div>
            </div>
            <h4>Job-search support, from the first match to the next opportunity.</h4>
            <p className={styles.storyCopy}>
              Flashfire helps take the busywork off your plate with targeted applications, a resume tailored to every role, and progress updates along the way.
            </p>
            <div className={styles.storyDivider} />
            <div className={styles.serviceList}>
              <div><span>01</span><b>Roles matched to your goals</b></div>
              <div><span>02</span><b>Resume tailored for each application</b></div>
              <div><span>03</span><b>Applications and progress tracked</b></div>
            </div>
            <div className={styles.featureNote}>
              <span className={styles.noteIcon}>✦</span>
              <div><b>A dedicated team, with AI working behind the scenes</b><small>Human guidance and smart tools support your search at every step.</small></div>
            </div>
          </article>

          <div className={styles.evidenceColumn}>
            <div className={styles.reviewGrid}>
              {[0, 1].map((index) => (
                <article className={styles.reviewCard} key={index}>
                  <div className={styles.cardTitle}><span>{index === 0 ? "CUSTOMER REVIEW" : "JOB-SEEKER FEEDBACK"}</span><b>0{index + 1}</b></div>
                  <div className={styles.reviewImage}>
                    <Image
                      src={reviewImages[index]}
                      alt={index === 0 ? "Flashfire customer review" : "Feedback from a Flashfire job seeker"}
                      fill
                      sizes="(max-width: 700px) 90vw, 300px"
                      className={styles.evidenceImage}
                      unoptimized
                    />
                  </div>
                  <p>Feedback shared by Flashfire users.</p>
                </article>
              ))}
            </div>

            <article className={styles.videoCard}>
              <div className={styles.cardTitle}><span>CUSTOMER VIDEO STORY</span><b>{featuredVideo.name}</b></div>
              <div className={styles.videoFrame}>
                {playingVideo === "featured" ? (
                  <iframe
                    src={`${featuredVideo.videoUrl}?autoplay=1&rel=0`}
                    title={`${featuredVideo.name} customer story`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image src={featuredVideo.profileImage} alt="" fill sizes="(max-width: 700px) 90vw, 700px" className={styles.videoPoster} unoptimized />
                    <button type="button" data-story-play onClick={() => setPlayingVideo("featured")} className={styles.playButton} aria-label={`Play ${featuredVideo.name}'s customer story`}>
                      <span>▶</span>
                    </button>
                    <span className={styles.videoCaption}>Watch {featuredVideo.name}&apos;s story</span>
                  </>
                )}
              </div>
            </article>
          </div>
        </div>

        <section className={styles.videoTestimonials} aria-labelledby="video-testimonials-title">
          <div className={styles.videoTestimonialsHeader}>
            <div>
              <span className={styles.eyebrow}><i /> CUSTOMER VIDEO STORIES</span>
              <h3 id="video-testimonials-title">Hear it from the people who have been there.</h3>
            </div>
            <p>Real job seekers share their experience with Flashfire.</p>
          </div>
          <div className={styles.videoGrid}>
            {videos.map((video, index) => {
              const videoId = `customer-${index}`;
              return (
                <article className={styles.videoTestimonialCard} key={video.name}>
                  <div className={styles.testimonialVideo}>
                    {playingVideo === videoId ? (
                      <iframe
                        src={`${video.videoUrl}?autoplay=1&rel=0`}
                        title={`${video.name} customer testimonial`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <Image src={video.profileImage} alt="" fill sizes="(max-width: 640px) 90vw, 360px" className={styles.videoPoster} unoptimized />
                        <button type="button" data-story-play onClick={() => setPlayingVideo(videoId)} className={styles.playButton} aria-label={`Play ${video.name}'s testimonial`}>
                          <span>▶</span>
                        </button>
                        <span className={styles.videoCaption}>Watch {video.name}&apos;s story</span>
                      </>
                    )}
                  </div>
                  <div className={styles.videoIdentity}>
                    <div className={styles.videoAvatar}>
                      <Image src={video.smallProfileImage} alt="" fill sizes="44px" unoptimized />
                    </div>
                    <div><b>{video.name}</b><span>{video.company}</span></div>
                    <span className={styles.videoType}>VIDEO STORY</span>
                    <LinkedInBadge url={video.linkedinUrl} name={video.name} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
