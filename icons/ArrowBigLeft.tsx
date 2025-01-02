import { IconProps } from "../utils/types";

const ArrowBigLeft: React.FC<IconProps> = ({ size = 24, className = "" }) => {
    const svgSize = `${size}px`;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} height={svgSize} width={svgSize} viewBox="0 0 20 21" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M17 10.25C17 10.6642 16.6642 11 16.25 11L5.6121 11L9.7698 14.9594C10.0684 15.2465 10.0777 15.7213 9.79063 16.0198C9.50353 16.3184 9.02875 16.3277 8.73017 16.0406L3.23017 10.7906C3.08312 10.6492 3 10.454 3 10.25C3 10.046 3.08312 9.85078 3.23017 9.70937L8.73017 4.45937C9.02875 4.17228 9.50353 4.18159 9.79063 4.48017C10.0777 4.77875 10.0684 5.25353 9.7698 5.54062L5.6121 9.5L16.25 9.5C16.6642 9.5 17 9.83579 17 10.25Z" fill="currentColor" />
        </svg>
    );
};

export default ArrowBigLeft;