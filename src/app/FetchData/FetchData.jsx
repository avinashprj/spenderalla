import { activityFetch, createActivity } from "features/activity/activitySlice";
import { budgetFetch } from "features/budget/budgetSlice";
import { expensesFetch } from "features/expenses/expensesSlice";
import { fetchUser, user } from "features/user/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentDate } from "services/dates/format.helpers";
import { app } from "services/firebase/config";

export const FetchData = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { userId } = useSelector(user);
  
  useEffect(() => {
    const currentDate = getCurrentDate();
    
    onAuthStateChanged(auth, async (user) => {
      if (auth.currentUser && !userId) {
        const {
          payload: { userId },
        } = await dispatch(fetchUser(user.uid));

        const { payload: activityList } = await dispatch(
          activityFetch({ userId, date: currentDate })
        );

        const isCurrentMonth = activityList.some((el) => el.current);
        !isCurrentMonth && (await dispatch(createActivity(userId)));

        activityList.some((el) => el.current === "ad");
        await dispatch(budgetFetch({ userId, date: currentDate }));
        await dispatch(expensesFetch({ userId, date: currentDate }));
      } else {
        navigate("/welcome");
      }
    });
  }, []);

  return false;
};
