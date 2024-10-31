
import { cn } from '@/lib/utils';
import { FC } from 'react';

type LoaderProps = {
    className?: string;
    size?: string; // Allows customizable size
    color?: string; // Allows customizable color
};

const Loader: FC<LoaderProps> = ({ className, size = '36px', color = "black" }) => {
    return (
        <div
            className={cn(
                'w-16 h-16 border-4 border-black rounded-full spin-loader',
                className
            )}
            style={{ width: size, height: size, borderColor: color }}
        />
    );
};

export default Loader;
