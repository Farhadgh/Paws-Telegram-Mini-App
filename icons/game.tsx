import { IconProps } from "../utils/types";

const Game: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            height={svgSize}
            width={svgSize}
            viewBox="0 0 24 24"
            fill="none"
        >
            {/* Game Controller Body */}
            <path
                d="M12 5C7.58172 5 4 8.58172 4 13V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V13C20 8.58172 16.4183 5 12 5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Buttons */}
            <circle cx="9" cy="13" r="1" fill="currentColor" />
            <circle cx="15" cy="13" r="1" fill="currentColor" />
            <path
                d="M12 10V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 10V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 10V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Game;