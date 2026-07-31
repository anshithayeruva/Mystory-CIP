import MetricsRow from "./components/MetricsRow";
import LiveSessionMonitor from "./components/LiveSessionMonitor";
import ProgramsCard from "./components/ProgramsCard";
import UpcomingEvents from "./components/UpcomingEvents";
import QuickActions from "./components/QuickActions";
import OverallIndexCard from "./components/OverallIndexCard";
import UniversityBanner from "./components/UniversityBanner";
import styles from "./dashboard.module.css";

export default function HodDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* University Banner */}
      <UniversityBanner />

      {/* Top 3 Metrics Cards */}
      <MetricsRow />

      {/* Main Two-Column Layout */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <ProgramsCard />
          <LiveSessionMonitor />
        </div>


        {/* Right Column */}
        <div className={styles.rightColumn}>
          <UpcomingEvents />
          <QuickActions />
          <OverallIndexCard />
        </div>
      </div>
    </div>
  );
}
