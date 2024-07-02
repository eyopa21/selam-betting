export function useHelpers() {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();

    const formatDate = (date: string): string => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        formatDate,
        scrollToTop
    }
}