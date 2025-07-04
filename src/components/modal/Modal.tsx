import CloseIcon from "../../assets/icons/CloseIcon.tsx";
import {useEffect} from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    iframeLink: string;
}

export function Modal({iframeLink, isOpen, onClose}: ModalProps) {

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4" style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(3px)'
        }}>
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-medium text-lg">Modal Header</span>
                    <button className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={onClose}>
                        <CloseIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-2">
                    <iframe
                        key={iframeLink}
                        id="inlineFrame"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        title="Modal Content"
                        className="w-full h-full min-h-[500px]"
                        frameBorder="0"
                        src={iframeLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                </div>
            </div>
        </div>
    )
}