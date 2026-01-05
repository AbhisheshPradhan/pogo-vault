interface AvailabilityTagProps {
    label: string;
}

export const AvailabilityTag: React.FC<AvailabilityTagProps> = ({ label }) => {
    return (
        <>
            <span className="absolute top-3 right-2 z-20 rotate-12 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
                {label}
            </span>
            <div className={`absolute inset-10 z-0 -m-0.5 rounded-lg`}>
                <span className="absolute inset-0 animate-ping rounded-lg bg-red-400 opacity-75"></span>
                <span className="animation-delay-500 absolute inset-0 animate-ping rounded-lg bg-red-400 opacity-75"></span>
            </div>
        </>
    );
};
