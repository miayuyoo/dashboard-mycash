import { useEffect, useState } from 'react';
import { animate } from "framer-motion";
import { formatCurrency } from '../../utils/format';

interface AnimatedCounterProps {
    value: number;
    duration?: number; // seconds
}

export function AnimatedCounter({ value, duration = 0.8 }: AnimatedCounterProps) {
    const [display, setDisplay] = useState(formatCurrency(0));

    useEffect(() => {
        const controls = animate(0, value, {
            duration: duration,
            onUpdate: (v) => setDisplay(formatCurrency(v)),
            ease: "easeOut"
        });

        return () => controls.stop();
    }, [value, duration]);

    return <span>{display}</span>;
}
