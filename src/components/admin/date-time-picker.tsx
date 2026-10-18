"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  RotateCcw,
} from "lucide-react";

interface DateTimePickerProps {
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Generate year options from 2022 to 2035
const YEARS = Array.from({ length: 14 }, (_, i) => 2022 + i);

export function DateTimePicker({
  name,
  label,
  defaultValue,
  required = false,
}: DateTimePickerProps) {
  const parseDate = (val?: string): Date => {
    if (val) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => parseDate(defaultValue));

  // Calendar month & year navigation
  const [viewMonth, setViewMonth] = useState<number>(() => selectedDate.getMonth());
  const [viewYear, setViewYear] = useState<number>(() => selectedDate.getFullYear());

  // Time state (12-hour format)
  const initialH24 = selectedDate.getHours();
  const [hours, setHours] = useState<number>(initialH24 % 12 || 12);
  const [minutes, setMinutes] = useState<number>(selectedDate.getMinutes());
  const [ampm, setAmpm] = useState<"AM" | "PM">(initialH24 >= 12 ? "PM" : "AM");

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if defaultValue updates
  useEffect(() => {
    if (defaultValue) {
      const d = new Date(defaultValue);
      if (!isNaN(d.getTime())) {
        setSelectedDate(d);
        setViewMonth(d.getMonth());
        setViewYear(d.getFullYear());
        const h24 = d.getHours();
        setHours(h24 % 12 || 12);
        setMinutes(d.getMinutes());
        setAmpm(h24 >= 12 ? "PM" : "AM");
      }
    }
  }, [defaultValue]);

  // Close calendar popup on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const updateFullDate = (
    newYear: number,
    newMonth: number,
    newDay: number,
    newH12: number,
    newM: number,
    newAmpm: "AM" | "PM",
  ) => {
    let hours24 = newH12 % 12;
    if (newAmpm === "PM") hours24 += 12;

    const updated = new Date(newYear, newMonth, newDay, hours24, newM, 0);
    setSelectedDate(updated);
  };

  const handleDaySelect = (day: number) => {
    updateFullDate(viewYear, viewMonth, day, hours, minutes, ampm);
  };

  const handleTimeChange = (
    newH: number,
    newM: number,
    newAmpm: "AM" | "PM",
  ) => {
    setHours(newH);
    setMinutes(newM);
    setAmpm(newAmpm);
    updateFullDate(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      newH,
      newM,
      newAmpm,
    );
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
    const h12 = today.getHours() % 12 || 12;
    const ap = today.getHours() >= 12 ? "PM" : "AM";
    setHours(h12);
    setMinutes(today.getMinutes());
    setAmpm(ap);
    setSelectedDate(today);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Format ISO value for the form submission
  const formatIsoValue = (d: Date): string => {
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString();
  };

  // Format display string: "03 Apr 2026, 09:00 AM"
  const formatDisplayString = (d: Date): string => {
    if (isNaN(d.getTime())) return "Select Date & Time";
    const pad = (n: number) => String(n).padStart(2, "0");
    const day = pad(d.getDate());
    const month = MONTHS[d.getMonth()].slice(0, 3);
    const year = d.getFullYear();
    const h12 = d.getHours() % 12 || 12;
    const m = pad(d.getMinutes());
    const ap = d.getHours() >= 12 ? "PM" : "AM";
    return `${day} ${month} ${year}, ${pad(h12)}:${m} ${ap}`;
  };

  const isSelectedDay = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-xs font-mono text-ink-muted mb-1.5">
          {label} {required && "*"}
        </label>
      )}

      {/* Hidden input passed to FormData */}
      <input
        type="hidden"
        name={name}
        value={formatIsoValue(selectedDate)}
      />

      {/* Trigger Button that opens calendar */}
      <button
        type="button"
        onClick={() => {
          setViewMonth(selectedDate.getMonth());
          setViewYear(selectedDate.getFullYear());
          setIsOpen(!isOpen);
        }}
        className={`group flex w-full items-center justify-between rounded-xl border bg-canvas px-3.5 py-2.5 text-left text-sm transition-all focus:outline-none ${
          isOpen
            ? "border-saffron shadow-[0_0_0_2px_rgba(217,142,43,0.2)]"
            : "border-border hover:border-saffron/70"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <CalendarIcon className="h-4 w-4 text-saffron shrink-0" />
          <span className="font-mono text-xs text-ink font-medium">
            {formatDisplayString(selectedDate)}
          </span>
        </div>
        <span className="rounded-md bg-canvas-raised px-2 py-0.5 font-mono text-[10px] text-ink-muted group-hover:text-ink">
          Change Date
        </span>
      </button>

      {/* Calendar Dropdown Modal */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-canvas-raised/95 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          {/* Month & Year Navigation Row */}
          <div className="mb-4 flex items-center justify-between gap-1.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-canvas text-ink-muted hover:text-ink hover:border-saffron/60"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {/* Month Dropdown Selector */}
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="rounded-lg border border-border bg-canvas px-2 py-1 text-xs font-semibold text-ink focus:border-saffron focus:outline-none"
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx}>
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Dropdown Selector (Supports easy jump to any year!) */}
              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="rounded-lg border border-border bg-canvas px-2 py-1 text-xs font-mono font-semibold text-saffron focus:border-saffron focus:outline-none"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-canvas text-ink-muted hover:text-ink hover:border-saffron/60"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="mb-1.5 grid grid-cols-7 text-center font-mono text-[11px] font-semibold text-ink-faint">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Empty slots for days before 1st of month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const selected = isSelectedDay(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDaySelect(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs transition-all ${
                    selected
                      ? "bg-saffron text-black font-bold shadow-md"
                      : today
                      ? "border border-saffron/60 text-saffron hover:bg-saffron/20 font-semibold"
                      : "text-ink hover:bg-canvas-overlay hover:text-saffron"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time Picker Section */}
          <div className="mt-4 border-t border-border pt-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                <Clock className="h-3 w-3 text-saffron" /> Time (HH:MM)
              </span>
              <button
                type="button"
                onClick={handleSetToday}
                className="flex items-center gap-1 font-mono text-[10px] text-saffron hover:underline"
              >
                <RotateCcw className="h-2.5 w-2.5" /> Set Now
              </button>
            </div>

            <div className="flex items-center justify-between gap-1.5">
              {/* Hours Select (1 to 12) */}
              <div className="flex-1">
                <select
                  value={hours}
                  onChange={(e) =>
                    handleTimeChange(Number(e.target.value), minutes, ampm)
                  }
                  className="w-full rounded-lg border border-border bg-canvas px-2 py-1.5 font-mono text-xs text-ink focus:border-saffron focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <span className="font-mono text-xs text-ink-muted">:</span>

              {/* Minutes Select (Every 5 mins + exact choices) */}
              <div className="flex-1">
                <select
                  value={minutes}
                  onChange={(e) =>
                    handleTimeChange(hours, Number(e.target.value), ampm)
                  }
                  className="w-full rounded-lg border border-border bg-canvas px-2 py-1.5 font-mono text-xs text-ink focus:border-saffron focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM / PM Toggle */}
              <div className="flex rounded-lg border border-border bg-canvas p-0.5">
                <button
                  type="button"
                  onClick={() => handleTimeChange(hours, minutes, "AM")}
                  className={`rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
                    ampm === "AM"
                      ? "bg-saffron text-black font-bold"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleTimeChange(hours, minutes, "PM")}
                  className={`rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
                    ampm === "PM"
                      ? "bg-saffron text-black font-bold"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Bar */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="font-mono text-[10.5px] text-ink-muted">
              {formatDisplayString(selectedDate)}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-1 rounded-lg bg-saffron px-3 py-1 font-mono text-xs font-semibold text-black hover:bg-saffron/90"
            >
              <Check className="h-3 w-3" /> Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
