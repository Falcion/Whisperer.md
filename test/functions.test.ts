import { SC_HOSTS, YT_HOSTS } from './../source/utils/constants'
import { isUrl, getEmbedUrl, extractId, isAllowedHost, isEmptyString } from './../source/utils/functions'

describe('Utils › functions', () => {
  describe('isUrl()', () => {
    it('returns true for http(s) URLs', () => {
      expect(isUrl('https://example.com')).toBe(true)
      expect(isUrl('http://foo.bar')).toBe(true)
    })
    it('returns false otherwise', () => {
      expect(isUrl('ftp://example.com')).toBe(false)
      expect(isUrl('')).toBe(false)
    })
  })

  describe('getEmbedUrl()', () => {
    it('embeds youtube.com URLs', () => {
      expect(getEmbedUrl('https://www.youtube.com/watch?v=ABCDEFGHIJK'))
        .toBe('https://www.youtube.com/embed/ABCDEFGHIJK?autoplay=1&start=0')
    })
    it('embeds youtu.be URLs', () => {
      expect(getEmbedUrl('https://youtu.be/ABCDEFGHIJK'))
        .toBe('https://www.youtube.com/embed/ABCDEFGHIJK?autoplay=1&start=0')
    })
    it('embeds soundcloud URLs', () => {
      const url = 'https://soundcloud.com/artist/track'
      const out = getEmbedUrl(url)
      expect(out).toContain('w.soundcloud.com/player')
      expect(out).toContain(encodeURIComponent(url))
    })
    it('throws on unsupported URLs', () => {
      expect(() => getEmbedUrl('https://vimeo.com/123')).toThrow('Unsupported URL type.')
    })
  })

  describe('extractId()', () => {
    it('extracts from youtube.com', () => {
      expect(extractId('https://www.youtube.com/watch?v=ABCDEFGHIJK')).toBe('ABCDEFGHIJK')
    })
    it('extracts from youtu.be', () => {
      expect(extractId('https://youtu.be/ABCDEFGHIJK')).toBe('ABCDEFGHIJK')
    })
    it('returns empty string when no ID present', () => {
      expect(extractId('https://example.com')).toBe('')
    })
  })

  describe('Utils › url › isAllowedHost()', () => {
    it('returns true for exact allowed hosts', () => {
      expect(isAllowedHost('https://youtube.com/watch?v=123', YT_HOSTS)).toBe(true)
      expect(isAllowedHost('http://youtu.be/ABCDEFGHIJK', YT_HOSTS)).toBe(true)
      expect(isAllowedHost('https://soundcloud.com/artist/track', SC_HOSTS)).toBe(true)
    })

    it('returns true for subdomains of allowed hosts', () => {
      expect(isAllowedHost('https://www.youtube.com/watch?v=XYZ', YT_HOSTS)).toBe(true)
      expect(isAllowedHost('https://m.youtu.be/ABC', YT_HOSTS)).toBe(true)
      expect(isAllowedHost('https://api.soundcloud.com/xyz', SC_HOSTS)).toBe(true)
    })

    it('is case‐insensitive when matching hosts', () => {
      expect(isAllowedHost('HTTPS://YouTube.COM/watch?v=1', YT_HOSTS)).toBe(true)
      expect(isAllowedHost('https://SOUNDCLOUD.com/foo', SC_HOSTS)).toBe(true)
    })

    it('rejects URLs whose host merely appears in the path or query', () => {
      // "evil-example.com" contains "example.com" in the hostname but is not allowed
      expect(isAllowedHost('https://evil-example.com/?redirect=youtube.com', YT_HOSTS)).toBe(false)
      // path contains "youtube.com" but host is not allowed
      expect(isAllowedHost('https://foobar.com/watch?url=youtube.com', YT_HOSTS)).toBe(false)
    })

    it('rejects untrusted hosts', () => {
      expect(isAllowedHost('https://vimeo.com/123', YT_HOSTS)).toBe(false)
      expect(isAllowedHost('https://example.com', SC_HOSTS)).toBe(false)
    })

    it('returns false for invalid or non‐absolute URLs', () => {
      expect(isAllowedHost('not a url', YT_HOSTS)).toBe(false)
      expect(isAllowedHost('/relative/path', SC_HOSTS)).toBe(false)
      expect(isAllowedHost('', YT_HOSTS)).toBe(false)
    })
  })

  describe('Utils › functions › isEmptyString()', () => {
    it('returns true for null or undefined', () => {
      expect(isEmptyString(null)).toBe(true)
      expect(isEmptyString(undefined)).toBe(true)
    })

    it('returns true for the empty string', () => {
      expect(isEmptyString('')).toBe(true)
    })

    it('returns false for non-empty strings', () => {
      expect(isEmptyString(' ')).toBe(false)       // space is not empty
      expect(isEmptyString('hello')).toBe(false)
      expect(isEmptyString('0')).toBe(false)       // numeric character
      expect(isEmptyString('\n')).toBe(false)      // newline character
    })
  })
})
