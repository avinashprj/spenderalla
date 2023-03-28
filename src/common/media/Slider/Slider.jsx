import "swiper/css";
import "swiper/css/navigation";
import { OneMonthSlide } from "./OneMonthSlide/OneMonthSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper";
import { useSelector } from "react-redux";
import { activity, nextMonthCurrent, previousMonthCurrent } from "features/activity/activitySlice";
import { useDispatch } from "react-redux";
import { user } from "features/user/userSlice";
import { budgetFetch } from "features/budget/budgetSlice";
import { expensesFetch } from "features/expenses/expensesSlice";



export const Slider = () => {
  const dispatch = useDispatch()

  const { userId } = useSelector(user)
  const activityList = useSelector(activity)
  const indexCurrentMonth = useSelector(state => state.activity.activity.findIndex(el => el.current))

  const settings = {
    keyboard: true,
    slidesPerView: 1.1,
    spaceBetween: 10,
    initialSlide: indexCurrentMonth,
    centeredSlides: true,
    runCallbacksOnInit: false,
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    modules: [Navigation, Keyboard],
    onSlideNextTransitionEnd: e => {
      dispatch(nextMonthCurrent(e.activeIndex))
      const {month, year} = activityList[e.activeIndex]
      const date = new Date(year, month)
      dispatch(budgetFetch({userId, date}))
      dispatch(expensesFetch({userId, date}))
    },
    onSlidePrevTransitionEnd: e => {
      dispatch(previousMonthCurrent(e.activeIndex))
      const {month, year} = activityList[e.activeIndex]
      const date = new Date(year, month)
      dispatch(budgetFetch({userId, date}))
      dispatch(expensesFetch({userId, date}))
    },
  }

  const prepareSliderList = activityList.map(el => {
    const { month, year } = el
    const key = month + year

    return (
      <SwiperSlide key={key}>
        <OneMonthSlide month={month} year={year} />
      </SwiperSlide>
    )
  })

  return (
    <Swiper {...settings}>
      {prepareSliderList}
    </Swiper>
  )
}