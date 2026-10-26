"use client";

function HeroVideo() {
  return (
    <div id="demo" className="w-full">
      <div className="relative aspect-[2074/998] w-full overflow-hidden border border-black bg-[#fff6f4] shadow-[4px_4px_0_#ff4c00] sm:shadow-[8px_8px_0_#ff4c00]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/Untitled%20design.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
      <p className="mt-4 font-['Satoshi',sans-serif] text-[12px] leading-[1.4] text-[#6b625d] sm:text-[13px]">
        Preferences → matching → resume tailoring → applications → tracking
      </p>
    </div>
  );
}

export default HeroVideo;
