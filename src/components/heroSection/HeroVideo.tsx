export default function HeroVideo() {
  return (
    <div id="demo" className="w-full">
      <div className="relative aspect-[2074/998] w-full overflow-hidden border border-black bg-[#fff6f4] shadow-[8px_8px_0_#ff4c00]">
        <video
          className="absolute inset-0 h-full w-full object-contain"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/video-thumbnail.png"
        >
          <source src="/videos/Untitled%20design.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="mt-6 font-['Satoshi',sans-serif] text-[13px] text-[#6b625d]">
        Demo scope: preferences → matching → tailoring → applications → tracking
      </p>
    </div>
  );
}
