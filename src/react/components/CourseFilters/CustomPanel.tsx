import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from "@/components/ui/button";

interface CustomPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

export const CustomPanel: React.FC<CustomPanelProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children
}) => {
    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200"
                    onClick={onClose}
                />
            )}
            
            {/* Panel */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-50 transform transition-transform duration-200 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 pt-4 pb-2">
                        <div>
                            <h2 className="text-lg font-semibold">{title}</h2>
                            {description && (
                                <p className="text-sm text-gray-500">{description}</p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}; 