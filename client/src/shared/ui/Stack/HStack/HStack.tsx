import { memo } from 'react';
import { Flex, FlexProps } from '../Flex/Flex.tsx';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack = memo((props: HStackProps) => {
    return (
        <Flex direction="row" {...props}>
            {props.children}
        </Flex>
    );
});

HStack.displayName = "HStack"