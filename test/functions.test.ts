import { isUrl, getEmbedUrl, extractId } from 'source/utils/functions'

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
})
