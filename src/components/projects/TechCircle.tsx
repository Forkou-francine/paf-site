import React from "react";
const abbrev: Record<string, string> = {
  Databricks: "DB", Spark: "SP", Python: "PY", "Power BI": "PBI", Azure: "AZ",
  Hadoop: "HD", MapReduce: "MR", SQL: "SQL", Tailwind: "TW", Java: "JV",
  Scala: "SC", Airflow: "AF", Dbt: "DBT", LookerStudio: "LS", PostgreSQL: "PG",
};
export default function TechCircle({ name }:{ name: string }) {
  return (
    <div title={name} className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-bold text-white shadow-sm dark:bg-violet-600">
      {abbrev[name] || name.slice(0, 2).toUpperCase()}
    </div>
  );
}
