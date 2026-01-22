"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePriceAlerts, PriceAlert } from "@/hooks/usePriceAlerts";
import { useTokenData, formatPrice } from "@/hooks/useTokenData";

function AlertItem({ alert, onRemove }: { alert: PriceAlert; onRemove: () => void }) {
  const tokenName = alert.token === "wreckit" ? "$WRECKIT" : "$RALPH";
  const colorClass = alert.token === "wreckit" ? "text-[var(--wreckit-primary)]" : "text-[var(--ralph-primary)]";
  const bgClass = alert.token === "wreckit" ? "bg-[var(--wreckit-subtle)]" : "bg-[var(--ralph-subtle)]";

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className={`flex items-center justify-between p-3 rounded-lg ${bgClass} ${alert.triggered ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${colorClass}`}>{tokenName}</span>
        <span className="text-[var(--text-muted)]">
          {alert.type === "above" ? ">" : "<"} {formatPrice(alert.price)}
        </span>
        {alert.triggered && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-success)]/20 text-[var(--accent-success)]">
            Triggered
          </span>
        )}
      </div>
      <button
        onClick={onRemove}
        className="p-1 rounded hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}

export function PriceAlerts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<"wreckit" | "ralph">("wreckit");
  const [alertType, setAlertType] = useState<"above" | "below">("above");
  const [priceInput, setPriceInput] = useState("");

  const { wreckit, ralph } = useTokenData(5000);
  const {
    alerts,
    notificationPermission,
    requestNotificationPermission,
    addAlert,
    removeAlert,
    clearTriggeredAlerts,
    checkAlerts,
  } = usePriceAlerts();

  // Check alerts when prices update
  useEffect(() => {
    if (wreckit?.price && ralph?.price) {
      checkAlerts(wreckit.price, ralph.price);
    }
  }, [wreckit?.price, ralph?.price, checkAlerts]);

  const handleAddAlert = () => {
    const price = parseFloat(priceInput);
    if (isNaN(price) || price <= 0) return;

    addAlert(selectedToken, alertType, price);
    setPriceInput("");
  };

  const activeAlerts = alerts.filter((a) => !a.triggered);
  const triggeredAlerts = alerts.filter((a) => a.triggered);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-lg flex items-center justify-center hover:bg-[var(--bg-surface)] transition-colors group"
        title="Price Alerts"
      >
        <svg
          className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {activeAlerts.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--wreckit-primary)] text-white text-xs flex items-center justify-center">
            {activeAlerts.length}
          </span>
        )}
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-md bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Price Alerts</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Notification permission */}
                {notificationPermission !== "granted" && (
                  <div className="p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      Enable notifications to receive alerts when prices hit your targets.
                    </p>
                    <button
                      onClick={requestNotificationPermission}
                      className="text-sm font-medium text-[var(--wreckit-primary)] hover:underline"
                    >
                      Enable Notifications
                    </button>
                  </div>
                )}

                {/* Add alert form */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedToken("wreckit")}
                      className={`p-2 rounded-lg border transition-colors ${
                        selectedToken === "wreckit"
                          ? "border-[var(--wreckit-primary)] bg-[var(--wreckit-subtle)]"
                          : "border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                      }`}
                    >
                      <span className={selectedToken === "wreckit" ? "text-[var(--wreckit-primary)]" : "text-[var(--text-secondary)]"}>
                        $WRECKIT
                      </span>
                    </button>
                    <button
                      onClick={() => setSelectedToken("ralph")}
                      className={`p-2 rounded-lg border transition-colors ${
                        selectedToken === "ralph"
                          ? "border-[var(--ralph-primary)] bg-[var(--ralph-subtle)]"
                          : "border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                      }`}
                    >
                      <span className={selectedToken === "ralph" ? "text-[var(--ralph-primary)]" : "text-[var(--text-secondary)]"}>
                        $RALPH
                      </span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={alertType}
                      onChange={(e) => setAlertType(e.target.value as "above" | "below")}
                      className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm"
                    >
                      <option value="above">Price above</option>
                      <option value="below">Price below</option>
                    </select>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">$</span>
                      <input
                        type="number"
                        step="any"
                        placeholder="0.000001"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddAlert()}
                        className="w-full pl-7 pr-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                    <button
                      onClick={handleAddAlert}
                      className="px-4 py-2 rounded-lg bg-[var(--wreckit-primary)] text-white text-sm font-medium hover:bg-[var(--wreckit-primary)]/90 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {/* Current prices */}
                  <div className="text-xs text-[var(--text-muted)]">
                    Current: $WRECKIT {wreckit ? formatPrice(wreckit.price) : "..."} | $RALPH{" "}
                    {ralph ? formatPrice(ralph.price) : "..."}
                  </div>
                </div>

                {/* Active alerts */}
                {activeAlerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[var(--text-secondary)]">Active Alerts</h4>
                    <AnimatePresence mode="popLayout">
                      {activeAlerts.map((alert) => (
                        <AlertItem key={alert.id} alert={alert} onRemove={() => removeAlert(alert.id)} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Triggered alerts */}
                {triggeredAlerts.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-[var(--text-secondary)]">Triggered</h4>
                      <button
                        onClick={clearTriggeredAlerts}
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                    <AnimatePresence mode="popLayout">
                      {triggeredAlerts.map((alert) => (
                        <AlertItem key={alert.id} alert={alert} onRemove={() => removeAlert(alert.id)} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {alerts.length === 0 && (
                  <p className="text-center text-sm text-[var(--text-muted)] py-4">
                    No alerts set. Add one above to get notified when prices hit your targets.
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
