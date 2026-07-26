import OverviewCard from "./components/OverviewCard";
import RecentActivity from "./components/RecentActivity";
import TodaysSummary from "./components/TodaysSummary";
import LiveSessionMonitor from "./components/LiveSessionMonitor";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <OverviewCard />
      
      <div className={styles.middleGrid}>
        <RecentActivity />
        <TodaysSummary />
      </div>
      
      <LiveSessionMonitor />
    </div>
  );
}
