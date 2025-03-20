import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Layout, Row, Col, Card, Spin } from "antd";
import getallStat from "../../graphql/queries/allStat";
import getgenderweekStat from "../../graphql/queries/genderWeek";
import getagerangeStat from "../../graphql/queries/agerange";
import "./Stats.css";
// import StatRenderChart from "../chart/allStatLinechart";
// import GenderWeekChart from "../chart/genderWeekBarChart";
// import AgeRageChart from "../chart/ageRangeChart";
import AppFooter from "../Footer";
import AllStatLineChartJS from "../chart/AllStatLineChartJS";
import GenderWeekBarChartJS from "../chart/GenderWeekBarChartJS";
import AgeRangeChartJS from "../chart/AgeRangeChartJS";

const Stats = () => {
  //CHECK EACH QUERY HERE
  const statall = useQuery(getallStat, { fetchPolicy: "network-only" });
  const statgenderweek = useQuery(getgenderweekStat, {
    fetchPolicy: "network-only",
  });
  const statage = useQuery(getagerangeStat, { fetchPolicy: "network-only" });

  if (statall.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading...data" />
      </div>
    );
  }
  if (statgenderweek.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading...data" />
      </div>
    );
  }
  if (statage.loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading...data" />
      </div>
    );
  }

  const statresult = statall.data.resultStats;
  const statGenderWeek = statgenderweek.data.genderWeekStats;
  const statAgeRange = statage.data.ageRangeStat;
  // console.log(statage);
  // console.log(statGenderWeek);

  return (
    <Layout>
      <Layout.Content
        style={{
          background: "#fff",
          minHeight: 280,
          marginTop: 80,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Row gutter={16} justify="center" style={{ width: "100%" }}>
          <Col xs={24} lg={24} style={{ width: "100%", paddingBottom: "10px" }}>
            <Card
              title="กราฟแสดงจำนวนงานทั้งหมดในระบบ"
              hoverable
              headStyle={{ backgroundColor: "#CAE4E5" }}
              cover={
                <div className="chart-pie-cover">
                  <AllStatLineChartJS statresult={statresult} />
                  {/* <StatRenderChart data={statresult} /> */}
                </div>
              }
            />
          </Col>
          <Col xs={24} lg={24} style={{ width: "100%" }}>
            <Card
              title="กราฟแท่งแสดงจำนวนคนแบ่งตามเพศของนักวิ่งในแต่ละสัปดาห์"
              hoverable
              headStyle={{ backgroundColor: "#f3eac2" }}
              cover={
                <div className="chart-pie-cover">
                  {/* <GenderWeekChart data={statGenderWeek} /> */}
                  <GenderWeekBarChartJS statGenderWeek={statGenderWeek} />
                </div>
              }
            />
          </Col>
          <Col xs={24} lg={24} style={{ width: "100%" }}>
            <Card
              title="กราฟแท่งแสดงจำนวนคนแบ่งตามช่วงอายุของนักวิ่งในแต่ละสัปดาห์"
              hoverable
              headStyle={{ backgroundColor: "#ff9999" }}
              cover={
                <div className="chart-pie-cover">
                  {/* <AgeRageChart data={statAgeRange} /> */}
                  <AgeRangeChartJS statAgeRange={statAgeRange} />
                </div>
              }
            />
          </Col>
        </Row>
      </Layout.Content>
      {/* ----------------------footer---------------------------------- */}
      <AppFooter description="795 ถนน บรรทัดทอง แขวง วังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330" />
    </Layout>
  );
};

export default Stats;
