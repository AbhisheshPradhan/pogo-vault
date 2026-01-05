import React from 'react';

interface ToggleSwitchProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    colorOn?: string;
    colorOff?: string;
}

/**
 * ToggleSwitch - Atomic toggle component
 *
 * @example
 * <ToggleSwitch
 *   enabled={isOn}
 *   onChange={setIsOn}
 *   disabled={isLoading}
 * />
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    enabled,
    onChange,
    disabled = false,
    size = 'md',
    colorOn = 'bg-green-600 hover:bg-green-700',
    colorOff = 'bg-red-600 hover:bg-red-700',
}) => {
    const sizeClasses = {
        sm: {
            container: 'h-6 w-11',
            toggle: 'h-4 w-4',
            translate: enabled ? 'translate-x-6' : 'translate-x-1',
        },
        md: {
            container: 'h-8 w-14',
            toggle: 'h-6 w-6',
            translate: enabled ? 'translate-x-7' : 'translate-x-1',
        },
        lg: {
            container: 'h-10 w-16',
            toggle: 'h-8 w-8',
            translate: enabled ? 'translate-x-7' : 'translate-x-1',
        },
    };

    const currentSize = sizeClasses[size];

    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => !disabled && onChange(!enabled)}
            disabled={disabled}
            className={`relative inline-flex cursor-pointer items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${currentSize.container} ${
                disabled
                    ? 'cursor-not-allowed bg-gray-400 opacity-50'
                    : enabled
                      ? colorOn
                      : colorOff
            } `}
        >
            <span
                className={`inline-block transform rounded-full bg-white shadow-lg transition-transform ${currentSize.toggle} ${currentSize.translate} `}
            />
        </button>
    );
};
