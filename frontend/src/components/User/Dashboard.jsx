import { Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSolvedProblems,
  getAllSubmissions,
} from "../../features/problem/problemThunks";
import UserProgress from "./UserProgress";
import RecentActivity from "./RecentActivity";
import FavoriteProblems from "../ui/FavoriteProblems";
import StreakWidget from "../ui/StreakWidget";
import CertificateList from "../ui/CertificateList";
import Modal from "../ui/Modal";
import Certificate from "../ui/Certificate";

function Dashboard() {
  const { allSubmission } = useSelector((state) => state.problems);
  const { user } = useSelector((state) => state.auth);

  const [showCertificate, setShowCertificate] = useState(false);
  const dispatch = useDispatch();
  const solved50 = user?.problemSolved?.length === 3;

  useEffect(() => {
    dispatch(getAllSubmissions());
    dispatch(fetchSolvedProblems());
  }, [dispatch]);

  return (
    <div className="h-full py-2 flex flex-col gap-2">
      <div className="text-black text-3xl pl-5 py-3 dark:text-white mb-1">
        All info{" "}
      </div>
      <UserProgress allSubmission={allSubmission} />
      <div className="flex justify-center gap-2 mt-2">
        <RecentActivity allSubmission={allSubmission} />
        <div className="md:w-[50%] pb-2">
          <StreakWidget streak={user.streak} />
        </div>
      </div>
      <div className="flex gap-2 mt-2 w-full rounded-2xl pb-5">
        <FavoriteProblems />
        <CertificateList
          title="🏆 50 Problems Solved"
          unlocked={solved50}
          onClick={() => setShowCertificate(true)}
        />
      </div>
      <Modal
        isOpen={!!showCertificate}
        onClose={() => setShowCertificate(false)}
        title="My Portfolio"
        size="xl"
      >
        {showCertificate && (
          <Certificate
            user={user}
            solved50
          />
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;
