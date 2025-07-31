import { Lock, Trophy, CheckCircle } from "lucide-react";

const CertificateList = ({ title, unlocked, onClick }) => {
    return (
        <div
            className={`relative w-full rounded-lg overflow-y-scroll scrollbar-hide max-h-150 border border-black/10 dark:border-white/10 p-6 transition duration-300 ${unlocked ? "bg-white dark:bg-white/10" : "bg-gray-100"
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Trophy className="text-yellow-500" size={28} />
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                {unlocked ? (
                    <CheckCircle className="text-green-500" size={24} />
                ) : (
                    <Lock className="text-gray-400" size={24} />
                )}
            </div>

            <div className="mt-6">
                {unlocked ? (
                    <button
                        onClick={onClick}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                    >
                        View Certificate
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-500 cursor-not-allowed"
                    >
                        Locked
                    </button>
                )}
            </div>

        </div>
    );
};

export default CertificateList