"use client";

import { useState, useEffect, useCallback } from "react";

export interface PriceAlert {
  id: string;
  token: "wreckit" | "ralph";
  type: "above" | "below";
  price: number;
  triggered: boolean;
  createdAt: number;
}

const STORAGE_KEY = "price-alerts";

export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");

  // Load alerts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAlerts(JSON.parse(stored));
      } catch {
        // Invalid JSON, reset
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Check notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Save alerts to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }, [alerts]);

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      return "denied" as NotificationPermission;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    return permission;
  }, []);

  const addAlert = useCallback((token: "wreckit" | "ralph", type: "above" | "below", price: number) => {
    const newAlert: PriceAlert = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      token,
      type,
      price,
      triggered: false,
      createdAt: Date.now(),
    };

    setAlerts((prev) => [...prev, newAlert]);
    return newAlert;
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearTriggeredAlerts = useCallback(() => {
    setAlerts((prev) => prev.filter((alert) => !alert.triggered));
  }, []);

  const checkAlerts = useCallback((wreckitPrice: number, ralphPrice: number) => {
    const triggeredAlerts: PriceAlert[] = [];

    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.triggered) return alert;

        const currentPrice = alert.token === "wreckit" ? wreckitPrice : ralphPrice;
        const shouldTrigger =
          (alert.type === "above" && currentPrice >= alert.price) ||
          (alert.type === "below" && currentPrice <= alert.price);

        if (shouldTrigger) {
          triggeredAlerts.push(alert);

          // Send notification
          if (notificationPermission === "granted") {
            const tokenName = alert.token === "wreckit" ? "$WRECKIT" : "$RALPH";
            const direction = alert.type === "above" ? "above" : "below";
            new Notification(`${tokenName} Price Alert`, {
              body: `${tokenName} is now ${direction} $${alert.price.toFixed(6)} (Current: $${currentPrice.toFixed(6)})`,
              icon: "/icon-192.png",
              tag: alert.id,
            });
          }

          return { ...alert, triggered: true };
        }

        return alert;
      })
    );

    return triggeredAlerts;
  }, [notificationPermission]);

  return {
    alerts,
    notificationPermission,
    requestNotificationPermission,
    addAlert,
    removeAlert,
    clearTriggeredAlerts,
    checkAlerts,
  };
}
