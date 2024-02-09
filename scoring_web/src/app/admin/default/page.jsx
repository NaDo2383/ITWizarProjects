"use client"
import MiniCalendar from '../../components/calendar/MiniCalendar';
import WeeklyRevenue from '../../components/admin/default/WeeklyRevenue';
import PieChartCard from '../../components/admin/default/PieChartCard';
import { MdBarChart, } from 'react-icons/md';
import Widget from '../../components/widget/Widget';
import CheckTable from '../../components/admin/default/RecentLoanApplicant';
import useApiConnections from '../../features/connections/useApiConnections';
import { useGlobalCtx } from '../../common/global/useGlobalCtx';
import React, { useEffect } from 'react';

const Dashboard = () => {
  const { getDashboardData } = useApiConnections()
  const { dashboardData } = useGlobalCtx()
  // const { loanCount, rejectedloanCount, acceptedloanCount } = dashboardData;

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Өнөөдөр'}
          subtitle={dashboardData?.loanDailyCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'7 хоногт'}
          subtitle={dashboardData?.loanWeeklyCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Сард'}
          subtitle={dashboardData?.loanMonthlyCount}
        />
      </div>

      {/* Charts */}

      {/* Traffic chart & Pie Chart & Monthly request */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1">
          {/* <div className="grid grid-cols-1 rounded-[20px] ">
            <MiniCalendar />
          </div> */}
          {dashboardData && <PieChartCard loanData={dashboardData} />}
        </div>
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1 col-span-3">
          {dashboardData && <WeeklyRevenue loanStat={dashboardData?.loanStatus} />}
        </div>
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5
      
      ">
        {/* Check Table */}
        <div>
          <CheckTable tableData={dashboardData?.result} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
