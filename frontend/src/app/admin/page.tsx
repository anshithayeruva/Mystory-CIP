import OverviewCard from "./components/OverviewCard";
import UpcomingEvents from "./components/UpcomingEvents";
import TodaysSummary from "./components/TodaysSummary";
import LiveSessionMonitor from "./components/LiveSessionMonitor";
import CrossModuleTelemetry from "./components/CrossModuleTelemetry";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <OverviewCard />
      
      <div className={styles.middleGrid}>
        <UpcomingEvents />
        <TodaysSummary />
      </div>
      
      <LiveSessionMonitor />
      <CrossModuleTelemetry />
    </div>
  );
}

