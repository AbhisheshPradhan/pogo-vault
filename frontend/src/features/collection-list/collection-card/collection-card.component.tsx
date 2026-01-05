import React from 'react';

interface CollectionCardProps {
    collectionType: any;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
    collectionType,
}) => {
    const cardClasses = `
        cursor-pointer rounded-lg bg-white shadow-xl ring ring-gray-900/5 
        transition-transform duration-200 hover:scale-[1.03] dark:bg-gray-800 `;

    // Handler to toggle caught status (single-click on the card body)
    const handleCardClick = (event: React.MouseEvent) => {
        console.log('handleCardClick');
    };

    return (
        <div className={cardClasses} onClick={handleCardClick}>
            <div className="relative flex w-full items-center justify-center px-4 py-4">
                {collectionType.name}
            </div>
        </div>
    );
};
