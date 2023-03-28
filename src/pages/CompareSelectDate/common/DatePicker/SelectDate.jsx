import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "./DatePicker.css";
import "./swiper.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { getMonthStringShort } from "services/dates/format.helpers";
import { getPrepareObj } from "./getPrepareObj";
import { useSelector } from "react-redux";
import { status } from "features/expenses/expensesSlice";

export const SelectDate = ({ activityList, setDate }) => {
  const expensesStatus = useSelector(status);

  const { objExpenses } =
    expensesStatus === "succeeded" && getPrepareObj(activityList);

  const [currentYear1, setCurrentYear1] = useState(new Date().getFullYear());
  const [currentYear2, setCurrentYear2] = useState(new Date().getFullYear());
  const [currentMonth1, setCurrentMonth1] = useState(new Date().getMonth());
  const [currentMonth2, setCurrentMonth2] = useState(new Date().getMonth());

  useLayoutEffect(() => {
    if (expensesStatus === "succeeded") {
      setCurrentMonth1(objExpenses[currentYear1][0]);
    }
  }, [currentYear1]);

  useLayoutEffect(() => {
    if (expensesStatus === "succeeded") {
      setCurrentMonth2(objExpenses[currentYear2][0]);
    }
  }, [currentYear2]);

  useEffect(() => {
    const ar = [
      {
        from: new Date(currentYear1, currentMonth1),
        to: new Date(currentYear1, currentMonth1 + 1, 0),
      },
      {
        from: new Date(currentYear2, currentMonth2),
        to: new Date(currentYear2, currentMonth2 + 1, 0),
      },
    ];
    setDate(ar);
  }, [currentYear1, currentYear2, currentMonth1, currentMonth2, setDate]);

  const yearRender =
    expensesStatus === "succeeded" &&
    Object.keys(objExpenses)
      .sort((a, b) => b - a)
      .map((yearSlide) => (
        <SwiperSlide key={yearSlide}>
          <div className="create">{yearSlide}</div>
        </SwiperSlide>
      ));

  const monthRender1 =
    expensesStatus === "succeeded" &&
    objExpenses[currentYear1]
      .sort((a, b) => b - a)
      .map((monthSlide) => {
        const month = getMonthStringShort(new Date(currentYear1, monthSlide));
        return (
          <SwiperSlide id={monthSlide} key={monthSlide}>
            <div className="create">{month}</div>
          </SwiperSlide>
        );
      });

  const monthRender2 =
    expensesStatus === "succeeded" &&
    objExpenses[currentYear2]
      .sort((a, b) => b - a)
      .map((monthSlide) => {
        const month = getMonthStringShort(new Date(currentYear2, monthSlide));
        return (
          <SwiperSlide id={monthSlide} key={monthSlide}>
            <div className="create">{month}</div>
          </SwiperSlide>
        );
      });

  let content;

  if (expensesStatus !== "succeeded") {
    content = <div>loading...</div>;
  } else if (expensesStatus === "succeeded") {
    content = (
      <div className="flex">
        <div className="year">
          <div className="year1">
            <Swiper
              onSlideChange={(e) => {
                setCurrentYear1(
                  Number(
                    Object.keys(objExpenses).sort((a, b) => b - a)[
                      e.activeIndex
                    ]
                  )
                );
              }}
              slidesPerView={3}
              centeredSlides={true}
              spaceBetween={0}
              direction={"vertical"}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {yearRender}
            </Swiper>
          </div>
          <div className="year2">
            <Swiper
              onSlideChange={(e) => {
                setCurrentYear2(
                  Number(
                    Object.keys(objExpenses).sort((a, b) => b - a)[
                      e.activeIndex
                    ]
                  )
                );
              }}
              slidesPerView={3}
              centeredSlides={true}
              spaceBetween={0}
              direction={"vertical"}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {yearRender}
            </Swiper>
          </div>
        </div>
        <div className="month">
          <div className="month1">
            <Swiper
              onSlideChange={(e) => {
                setCurrentMonth1(objExpenses[currentYear1][e.activeIndex]);
              }}
              onSlidesGridLengthChange={(e) => {
                e.activeIndex = 0
              }}
              slidesPerView={5}
              centeredSlides={true}
              spaceBetween={0}
              direction={"vertical"}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {monthRender1}
            </Swiper>
          </div>
          <div className="month2">
            <Swiper
              onSlideChange={(e) => {
                setCurrentMonth2(objExpenses[currentYear2][e.activeIndex]);
              }}
              onSlidesGridLengthChange={(e) => {
                e.activeIndex = 0
              }}
              slidesPerView={5}
              centeredSlides={true}
              spaceBetween={0}
              direction={"vertical"}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {monthRender2}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  return content;
};
