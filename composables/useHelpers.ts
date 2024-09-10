export function useHelpers() {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    formatDate,
    scrollToTop,
  }
}
