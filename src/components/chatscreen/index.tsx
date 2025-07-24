import { generateChatAPI } from '@/lib/services/chatbot';
import { useMutation } from '@tanstack/react-query';
import { MessageSquare, SendHorizonal } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ChatScreen = () => {
    const [messageToSend, setMessageToSend] = useState("");
    const [chatHistory, setChatHistory] = useState<
        { message: string; response: string }[]>([]);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { mutateAsync: generateChat, isPending } = useMutation({
        mutationKey: ["generate-chat"],
        retry: false,
        mutationFn: async () => {
            const payload = {
                query: messageToSend.trim(),
            };
            // const response = await generateChatAPI();
            // return response;
            const botReply = "Sorry, no reply.";
            setChatHistory(prev => [
                ...prev,
                { message: messageToSend.trim(), response: botReply },
            ]);
            setMessageToSend("");

        },
        // onSuccess: (response: any) => {
        //     const botReply = response?.message || "Sorry, no reply.";
        //     setChatHistory(prev => [
        //         ...prev,
        //         { message: messageToSend.trim(), response: botReply },
        //     ]);
        //     setMessageToSend("");
        // },
        // onError: () => {
        //     setChatHistory(prev => [
        //         ...prev,
        //         {
        //             message: messageToSend.trim(),
        //             response: "Oops! Something went wrong. Try again later.",
        //         },
        //     ]);
        //     setMessageToSend("");
        // },
    });


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = 200;

            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
            if (scrollHeight > maxHeight) {
                textareaRef.current.style.overflowY = "auto";
            } else {
                textareaRef.current.style.overflowY = "hidden";
            }
        }
    }, [messageToSend]);

    const handleGenerate = async () => {
        if (messageToSend.trim()) {
            await generateChat();
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await handleGenerate();
        }
    };

    const showChat = chatHistory.length > 0;



    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">

            {showChat && (
                <header className="px-6 py-4 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between shadow-md">
                    <div className="flex items-center space-x-3">
                        <MessageSquare className="text-teal-400" />
                        <h1 className="text-xl font-semibold tracking-wide">NyayaTech.AI</h1>
                    </div>
                    <div className="text-sm text-slate-400">v1.0 Beta</div>
                </header>
            )}
            {showChat ? (
                <div className="flex-1 mx-60 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
                    <h2 className='flex text-2xl justify-center items-center font-semibold text-teal-400'>Hello User</h2>
                    <div className="flex flex-col gap-3">
                        {chatHistory.map((chat, index) => (
                            <React.Fragment key={index}>
                                <div className="self-end max-w-[70%] bg-teal-600 px-4 py-3 rounded-xl rounded-tr-none shadow-md">
                                    <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                                </div>
                                <div className="self-start max-w-[70%] bg-[#334155] px-4 py-3 rounded-xl rounded-tl-none shadow-sm">
                                    <p className="text-sm whitespace-pre-wrap">{chat.response}</p>
                                </div>
                            </React.Fragment>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col justify-center items-center px-6 text-center space-y-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-teal-400">Welcome to NyayaTech.AI</h1>
                        <p className="text-slate-400 text-sm">Start chatting with your AI assistant...</p>
                    </div>
                    <div className="w-full max-w-2xl px-4">
                        <div className="flex items-end gap-4">
                            <textarea
                                ref={textareaRef}
                                placeholder="Type your message..."
                                value={messageToSend}
                                onChange={(e) => setMessageToSend(e.target.value)}
                                onKeyDown={handleKeyPress}
                                rows={3}
                                className="w-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 text-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 max-h-[150px] custom-scrollbar-textarea"
                                style={{ scrollbarWidth: 'thin' }}
                            />

                            <button
                                disabled={!messageToSend.trim() || isPending}
                                onClick={handleGenerate}
                                className={`p-3 rounded-full transition mb-1 ${!messageToSend.trim() || isPending
                                    ? "bg-teal-800 cursor-not-allowed opacity-50"
                                    : "bg-teal-600 hover:bg-teal-500"
                                    }`}
                            >
                                <SendHorizonal size={22} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showChat && (
                <footer className="px-6 py-4 mx-60">
                    <div className="flex items-end gap-4 h-[150px]">
                        <textarea
                            ref={textareaRef}
                            placeholder="Type your message..."
                            value={messageToSend}
                            onChange={(e) => setMessageToSend(e.target.value)}
                            onKeyDown={handleKeyPress}
                            rows={3}
                            className="w-full h-full bg-[#0f172a] border border-slate-600 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 max-h-[150px] custom-scrollbar-textarea"
                        />
                        <button
                            disabled={!messageToSend.trim() || isPending}
                            onClick={handleGenerate}
                            className={`p-3 rounded-full transition ${!messageToSend.trim() || isPending
                                ? "bg-teal-800 cursor-not-allowed opacity-50"
                                : "bg-teal-600 hover:bg-teal-500"
                                }`}
                        >
                            <SendHorizonal size={22} className="text-white" />
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );


};

export default ChatScreen;