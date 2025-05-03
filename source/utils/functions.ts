export function isUrl(str: string): boolean {
  return /^(https?:\/\/)/.test(str)
}

export function getEmbedUrl(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be')
      ? url.split('/').pop()
      : new URL(url).searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=0`
  } else if (new URL(url).host === 'soundcloud.com' || new URL(url).host === 'www.soundcloud.com') {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true`
  }
  throw new Error('Unsupported URL type.')
}

export function extractId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|.*v=))([\w-]{11})/)

  return match ? match[1] : ''
}
