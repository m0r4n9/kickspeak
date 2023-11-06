// declare module "*.svg" {
//     import React from 'react';
//     consts SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
//     export default SVG;
// }

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
}
