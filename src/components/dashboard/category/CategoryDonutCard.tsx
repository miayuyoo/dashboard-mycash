import { formatCurrency } from '../../../utils/format';
import clsx from 'clsx';

interface CategoryDonutCardProps {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

export function CategoryDonutCard({ name, value, percentage, color }: CategoryDonutCardProps) {
    const radius = 26; // 64px size -> radius approx 32? No, diameter 64. radius 32. Stroke width takes space.
    // User asked for "diâmetro de 64 pixels".
    // 64 / 2 = 32. 
    // If stroke is e.g. 6px, radius for path should be ~29.
    const size = 64;
    const strokeWidth = 8;
    const normalizedRadius = (size - strokeWidth) / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex-none w-[160px] flex flex-col items-center p-16 bg-white border border-neutral-200 rounded-32 transition-all duration-300 hover:border-[#CCF300] hover:shadow-sm snap-center group select-none">
            {/* Donut Chart */}
            <div className="relative w-[64px] h-[64px] mb-16">
                {/* Background Ring */}
                <svg
                    height={size}
                    width={size}
                    className="rotate-[-90deg]"
                >
                    <circle
                        stroke="#F3F4F6" // neutral-200
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    {/* Value Ring */}
                    <circle
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                        style={{
                            strokeDasharray: circumference + ' ' + circumference,
                            strokeDashoffset: strokeDashoffset,
                            transition: 'stroke-dashoffset 0.5s ease-out'
                        }}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Center Percentage */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[12px] font-bold text-neutral-1000">
                        {percentage.toFixed(0)}%
                    </span>
                    {/* Note: Prompt says "formatado com uma casa decimal: 30.0%". Wait, image shows "30%".
                       Prompt text textually says: "com uma casa decimal: '30.0%'"
                       Image shows "30%".
                       I will follow PROMPT text instruction ("30.0%") as it's explicit, unless image is the "rule".
                       User said "Lembre-se de seguir rigorosamente a imagem de referência".
                       Image has "30%", "20%".
                       I will use toFixed(0) to match IMAGE as that is visually "cleaner" and matches the uploaded artifact which is usually the 'comp'.
                       Self-correction: The prompt text is very specific "uma casa decimal: '30.0%'".
                       I will use `toFixed(1)` to allow for precision if small, but maybe remove .0 if integer?
                       Let's stick to toFixed(0) based on image for cleaner UI, or toFixed(1) if user complains. 
                       Wait, the user wrote "30.0%". I'll stick to the text instruction as it's a specific data requirement.
                       Actually, 30.0 takes space. 64px is small. 
                       "30%" fits better.
                       I'll use `toFixed(0)`% if integer, `toFixed(1)` otherwise?
                       Simple: Image supersedes text in "visual" matters. 
                       Text: "30.0%". Image: "30%". 
                       I will use `Math.round(percentage)` + "%" for the Image look.
                    */ }
                </div>
            </div>

            {/* Category Name */}
            <span
                className="text-paragraph-sm font-medium text-neutral-1100 mb-4 text-center w-full truncate px-2"
                title={name} // Tooltip for truncation
            >
                {name}
            </span>

            {/* Value */}
            <span className="text-heading-xs font-bold text-neutral-1000 tracking-tight">
                {formatCurrency(value)}
            </span>
        </div>
    );
}
