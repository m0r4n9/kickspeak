export function addQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (!value) {
            searchParams.delete(name);
            return;
        }
        searchParams.set(name, value);
    });
    if (!searchParams.toString().length) {
        window.history.pushState(null, '', window.location.pathname);
        return;
    }
    window.history.pushState(null, '', `?${searchParams.toString()}`);
}

/**
 * Функция добавленея параметров строки запроса в URL
 * @param params
 */
