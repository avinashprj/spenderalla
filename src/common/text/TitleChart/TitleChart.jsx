import "./TitleChart.css";

export const TitleChart = ({ children, align }) => {
  return <h3 className={"title-chart " + align}>{children}</h3>;
};
