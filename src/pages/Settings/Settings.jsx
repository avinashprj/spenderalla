import styles from "./Settings.module.css";

import { Button } from "common/buttons";
import { Icon } from "common/media";
import { Switch } from "common/forms";
import { ChakraProvider, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
    clearUser,
    currencyChange,
    statusUser,
    user,
} from "features/user/userSlice";
import { getCurrencySymbol } from "services/currency.helpers";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { signOutUser } from "services/firebase/auth/auth";
import { useNavigate } from "react-router-dom";
import { clearActivity } from "features/activity/activitySlice";
import { clearExpenses } from "features/expenses/expensesSlice";
import { clearBudget } from "features/budget/budgetSlice";

export const Settings = () => {
    const userStatus = useSelector(statusUser);
    const navigate = useNavigate();
    const { currency, userId } = useSelector(user);

    const symbolCyrrency = useMemo(() => {
        return getCurrencySymbol(currency);
    }, [currency]);

    const dispatch = useDispatch();

    const onSignOutClick = async () => {
        await signOutUser();
        dispatch(clearUser());
        dispatch(clearActivity());
        dispatch(clearExpenses());
        dispatch(clearBudget());
        navigate("/welcome");
    };

    const onCurencyChange = async (e) => {
        dispatch(currencyChange({ userId: userId, currency: e.target.value }));
    };

    const { email } = useSelector(user);

    let checkedCurrency;

    checkedCurrency =
        userStatus === "succeeded" ? (
            <ChakraProvider>
                <Select
                    onChange={onCurencyChange}
                    variant="unstyled"
                    value={currency}
                    icon={<Icon variant={styles.chevron}>chevronRight</Icon>}
                    color="#214ff1"
                >
                    <option value="US">IND</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </Select>
            </ChakraProvider>
        ) : (
            <ChakraProvider>
                <Select
                    variant="unstyled"
                    placeholder="loading..."
                    icon={<Icon variant={styles.chevron}>chevronRight</Icon>}
                    color="#214ff1"
                ></Select>
            </ChakraProvider>
        );

    return (
        <div className={styles.wrapper}>
            <header>
                <div className={styles.page}>
                    <h1>Settings</h1>
                    <Button onClick={onSignOutClick} variant="secondary_white">
                        Log Out
                    </Button>
                </div>
                <div className={styles.email}>
                    <h4>E-mail</h4>
                    <h4>{email}</h4>
                </div>
            </header>
            <main>
                {/* <button className={styles.password}>
          <span className={styles.name}>Change Password</span>

          <Icon variant={styles.chevron}>chevronRight</Icon>
        </button> */}
                <div className={styles.switch}>
                    <span className={styles.name}>Use Face ID</span>
                    <Switch type="checkbox" />
                </div>
                <div className={styles.currency}>
                    <div className={styles.name}>Currency</div>
                    <button>
                        <div className={styles.circle}>
                            <span>{symbolCyrrency}</span>
                        </div>
                        {checkedCurrency}
                    </button>
                </div>
            </main>
        </div>
    );
};
