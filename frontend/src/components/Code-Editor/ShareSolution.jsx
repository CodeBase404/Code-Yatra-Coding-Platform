import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Code, Share, Copy, Check } from "lucide-react";

import { useSelector } from "react-redux";
import axiosClient from "../../utils/axiosClient";
import { useParams } from "react-router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const ShareSolution = () => {
    const [solutions, setSolutions] = useState([]);
    const [code, setCode] = useState("");
    const [explanation, setExplanation] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isCodeCopied, setIsCodeCopied] = useState(false);
    const [language, setLanguage] = useState("");

    const user = useSelector((state) => state.auth.user);
    const { problemId } = useParams();

    const fetchSolutions = async () => {
        try {
            const res = await axiosClient.get(`/solutions/${problemId}`);
            setSolutions(res.data.solutions || []);
        } catch (err) {
            console.error("Failed to fetch solutions", err);
        }
    };

    const handleShare = async () => {
        if (!code.trim()) return;
        try {
            await axiosClient.post(`/solutions/${problemId}`, {
                code,
                explanation,
                language,
            });
            setCode("");
            setExplanation("");
            fetchSolutions();
            setIsFormVisible(false);
        } catch (err) {
            console.error("Failed to share solution", err);
        }
    };

    const handleVote = async (solutionId, action) => {
        try {
            await axiosClient.post(`/solutions/${solutionId}/vote`, { action });
            fetchSolutions();
        } catch (err) {
            console.error("Vote failed", err);
        }
    };

    useEffect(() => {
        if (problemId) fetchSolutions();
    }, [problemId]);

    return (
        <div className="p-6 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
            {!isFormVisible && solutions.length>0 && (
                <div className="flex w-full justify-end mb-4">
                    <button
                        onClick={() => setIsFormVisible((prev) => !prev)}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-2 rounded-lg text-white"
                    >
                        Share Solution
                    </button>
                </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Share New Solution */}
                {isFormVisible && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 mt-4 animate-fade-in">
                        <h2 className="text-xl font-bold mb-4">Share Your Solution</h2>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-3 rounded-lg mb-4"
                        >
                            <option value="">Select Language</option>
                            <option value="javascript">JavaScript</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                        </select>
                        <textarea
                            placeholder="Paste your code here..."
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-3 rounded-lg mb-4 h-40 font-mono resize-y"
                        />
                        <textarea
                            placeholder="Add an explanation (optional)"
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                            className="w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-3 rounded-lg mb-4 resize-y"
                        />
                        <div className="w-full flex justify-end">
                            <button
                                onClick={() => setIsFormVisible((prev) => !prev)}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 mr-2 px-6 py-2 rounded-lg text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-6 py-2 rounded-lg text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {/* All Shared Solutions */}
                {solutions.length > 0 ? (


                    <div className="space-y-6">
                        {solutions.map((solution) => (
                            <div
                                key={solution._id}
                                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={solution.userId?.profileImage?.secureUrl}
                                            className="w-8 h-8 rounded-full"
                                            alt="User"
                                        />
                                        <span className="text-black dark:text-white font-medium">
                                            {solution.userId?.firstName || "User"}
                                        </span>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm capitalize">
                                        {solution.language}
                                    </span>
                                </div>

                                <div className="relative bg-gray-900">
                                    <SyntaxHighlighter
                                        language={solution?.language?.toLowerCase() || "javascript"}
                                        style={codeTheme}
                                        customStyle={{
                                            margin: 0,
                                            padding: "2rem",
                                            fontSize: "16px",
                                            lineHeight: "1.6",
                                            background: "transparent",
                                        }}
                                    >
                                        {solution.code}
                                    </SyntaxHighlighter>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(solution.code);
                                            setIsCodeCopied(true);
                                            setTimeout(() => setIsCodeCopied(false), 2000);
                                        }}
                                        className="absolute top-1 right-2 flex items-center justify-center w-9 gap-1.5 px-2 py-2 bg-blue-600 dark:bg-gray-400/50 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                                    >
                                        {isCodeCopied ? (
                                            <Check className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Copy className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {solution.explanation && (
                                    <div className="text-gray-600 dark:text-gray-300 mt-2">
                                        <strong>Explanation:</strong>
                                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                                            {solution.explanation}
                                        </p>
                                    </div>
                                )}

                                {/* Voting */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 mt-4">
                                        <button
                                            onClick={() => handleVote(solution._id, "upvote")}
                                            className="text-gray-500 dark:text-gray-400 hover:text-orange-500"
                                        >
                                            <ChevronUp size={18} />
                                        </button>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {solution.upvotes?.length - solution.downvotes?.length}
                                        </span>
                                        <button
                                            onClick={() => handleVote(solution._id, "downvote")}
                                            className="text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                        >
                                            <ChevronDown size={18} />
                                        </button>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                        {new Date(solution.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
    <div className="text-center mt-20 p-6 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            No solutions shared yet!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
            Be the first to share your solution and help others in the community.
        </p>
        <button
            onClick={() => setIsFormVisible(true)}
            className="inline-block mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all"
        >
            Share Your Solution
        </button>
    </div>
)

                }
            </div>
        </div>
    );
};

export default ShareSolution;
