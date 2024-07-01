import { Invoice } from "../types"

export const transformDataForGraph = (
  invoices: Invoice[],
  period: "daily" | "weekly" | "monthly"
) => {
  const groupedData: { [key: string]: number } = {};

  invoices.forEach((invoice) => {
    const date = new Date(invoice.date);
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    let key = "";

    switch (period) {
      case "daily":
        key = date.toISOString().split("T")[0]; // YYYY-MM-DD
        break;
      case "weekly":
        key = startOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD
        break;
      case "monthly":
        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
        break;
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += invoice.totalAmount;
  });

  return Object.keys(groupedData).map((date) => ({
    date,
    revenue: groupedData[date],
  }));
};
