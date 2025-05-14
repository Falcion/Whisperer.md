export function isUrl (str: string): boolean {
  return /^(https?:\/\/)/.test(str)
}

export function getEmbedUrl (url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be')
      ? url.split('/').pop()
      : new URL(url).searchParams.get('v')

    if (isEmptyString(videoId)) {
      throw new Error('Could not extract video ID from YouTube URL')
    }

    return `https://www.youtube.com/embed/${videoId ?? ''}?autoplay=1&start=0`
  } else if (new URL(url).host === 'soundcloud.com' || new URL(url).host === 'www.soundcloud.com') {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true`
  } else throw new Error('Unsupported URL type.')
}

export function extractId (url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|.*v=))([\w-]{11})/)

  return (match != null) ? match[1] : ''
}

/**
 * Safely test whether a URL string belongs to an allowed host (or subdomain).
 *
 * @param urlStr        The URL string to validate.
 * @param allowedHosts  An array of hostnames you trust, e.g. ['youtube.com', 'soundcloud.com'].
 * @returns             `true` if `urlStr` parses to a URL whose hostname is exactly one of
 *                      the `allowedHosts` or a subdomain thereof (e.g. 'www.youtube.com').
 *                      Returns `false` on parse errors or mismatches.
 */
export function isAllowedHost (urlStr: string, allowedHosts: string[]): boolean {
  let hostname: string
  try {
    hostname = new URL(urlStr).hostname.toLowerCase()
  } catch {
    return false
  }

  return allowedHosts.some((allowed) => {
    const norm = allowed.toLowerCase()
    return hostname === norm || hostname.endsWith(`.${norm}`)
  })
}

/**
 * Checks whether a given string is empty, null, or undefined.
 *
 * @param str - The string to check; may be `string`, `null`, or `undefined`.
 * @returns `true` if `str` is `null`, `undefined`, or the empty string `''`; otherwise `false`.
 *
 * @example
 * isEmptyString(null)        // true
 * isEmptyString(undefined)   // true
 * isEmptyString('')          // true
 * isEmptyString('hello')     // false
 */
export function isEmptyString (str: string | null | undefined): boolean {
  return str === null || str === undefined || str === ''
}
