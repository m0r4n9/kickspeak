declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
}


declare namespace JSX {
    interface IntrinsicElements {
        "swiper-container": any;
    }
}


declare namespace JSX {
    interface IntrinsicElements {
        'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            navigation: string;
            "slides-per-view": number;
            // Add more properties
        };
        'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            // Add more properties
        };
    }
}
