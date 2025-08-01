
const ChatScreen = () => {

    return (

        <div className="h-screen flex flex-col  text-white font-sans">
            <header className="px-4 sm:px-6 py-4 bg-[#1e293b]/80 backdrop-blur-md border-b border-slate-700 flex items-center justify-between shadow-md">
                <div className="flex items-center space-x-3">
                    {/* <MessageSquare className="text-teal-400" /> */}
                    <img src="/public/assets/header/login-user.svg" alt="Logo" className="w-8 h-8 rounded-full" />
                    <h1 className="text-xl font-semibold tracking-wider">NyayaTech.AI</h1>
                </div>
                <div className="text-xs text-slate-400 italic">v1.0 Beta</div>
            </header>


        </div>

    );
};

export default ChatScreen;