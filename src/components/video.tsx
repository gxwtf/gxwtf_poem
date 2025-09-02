interface BilibiliVideoProps {
  url: string;
  title?: string;
  width?: number | string;
  className?: string;
}

export function BilibiliVideo({ 
  url, 
  title = "B站视频", 
  width = "100%",
  className = ""
}: BilibiliVideoProps) {
  // 从B站URL中提取视频ID
  const extractVideoId = (url: string): string | null => {
    // 处理多种B站URL格式
    const patterns = [
      /bilibili\.com\/video\/([a-zA-Z0-9]+)/,
      /b23\.tv\/([a-zA-Z0-9]+)/,
      /BV([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1].startsWith('BV') ? match[1] : `BV${match[1]}`;
      }
    }
    return null;
  };

  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <div className={`border border-red-300 bg-red-50 p-4 rounded ${className}`}>
        <p className="text-red-700">无效的B站视频链接: {url}</p>
      </div>
    );
  }

  const embedUrl = `https://player.bilibili.com/player.html?bvid=${videoId}&page=1&high_quality=1&autoplay=0`;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-lg shadow-md">
        <iframe
          src={embedUrl}
          width={width}
          height="auto"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={title}
          className="w-full aspect-video"
        />
      </div>
      <div className="mt-3 text-center">
        <p className="truncate text-muted-foreground">
          {title}
        </p>
      </div>
    </div>
  );
}

// 视频列表组件
export function BilibiliVideos({ videos }: { videos: Array<{ title: string; url: string }> }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无视频内容
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <BilibiliVideo
          key={index}
          url={video.url}
          title={video.title}
          className=""
        />
      ))}
    </div>
  );
}