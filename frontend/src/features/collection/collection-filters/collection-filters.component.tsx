import React, { useEffect, useState } from 'react';

export enum CollectionFilter {
    All = 'all',
    Caught = 'caught',
    Uncaught = 'uncaught',
}

interface CollectionFiltersProps {
    value?: CollectionFilter; // controlled selected value
    onChange?: (val: CollectionFilter) => void;
    name?: string;
    className?: string;
}

/**
 * CollectionFilters
 * - Renders 4 accessible radio buttons: All, Caught, Uncaught, Current Rotation
 * - Can be controlled (provide `value`) or uncontrolled
 */
export const CollectionFilters: React.FC<CollectionFiltersProps> = ({
    value,
    onChange,
    name = 'collection-filter',
    className,
}) => {
    const [selected, setSelected] = useState(value ?? CollectionFilter.All);

    useEffect(() => {
        if (value !== undefined) setSelected(value);
    }, [value]);

    const handleChange = (v) => {
        if (value === undefined) setSelected(v); // only update internal when uncontrolled
        onChange?.(v);
    };

    const options = [
        { key: CollectionFilter.All, label: 'All' },
        { key: CollectionFilter.Caught, label: 'Caught' },
        { key: CollectionFilter.Uncaught, label: 'Uncaught' },
    ];

    return (
        <fieldset
            className={`border-none p-0 ${className || ''}`}
            aria-label="Collection filters"
        >
            <legend className="sr-only">Filter collection</legend>
            <div
                role="radiogroup"
                aria-labelledby="collection-filters-label"
                className="flex w-full flex-wrap space-x-4 space-x-6 rounded-xl"
            >
                {options.map((opt) => {
                    const id = `${name}-${opt.key}`;
                    const isChecked = selected === opt.key;
                    return (
                        <label
                            key={opt.key}
                            htmlFor={id}
                            className={`flex cursor-pointer items-center space-x-2 rounded-lg p-2 transition-colors duration-150`}
                        >
                            <input
                                id={id}
                                name={name}
                                type="radio"
                                value={opt.key}
                                checked={isChecked}
                                onChange={() => handleChange(opt.key)}
                                aria-checked={isChecked}
                                className="h-4 w-4 appearance-none rounded-full border border-gray-500 transition duration-150 checked:border-indigo-500 checked:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                            />
                            <span className="text-md font-medium">
                                {opt.label}
                            </span>
                        </label>
                    );
                })}
            </div>
        </fieldset>
    );
};
