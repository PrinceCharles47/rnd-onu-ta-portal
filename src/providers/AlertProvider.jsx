import { createContext, useCallback, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { alertBus } from "../utils/alertBus";

export const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const showAlert = useCallback((alert, options = {}) => {
    setAlerts((prev) => [...prev, alert]);
    notifications.show({
      withBorder: true,
      autoClose: 5000,
      position: "top-right",
      withCloseButton: false,
      title: alert.title,
      message: alert.message,
      ...options,
    });
  }, []);

  useEffect(() => {
    alertBus.register(showAlert);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, alerts }}>
      {children}
    </AlertContext.Provider>
  );
}
