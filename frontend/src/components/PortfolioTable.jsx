export default function PortfolioTable({ investments = [] }) {
  const fmt = (n) =>
    Number(n ?? 0).toLocaleString("en-US", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    });

  if (investments.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-stone-400 border border-stone-100 shadow-sm">
        <p className="text-base">No investments yet.</p>
        <p className="text-sm mt-1">
          Go explore some projects and make your first investment!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-stone-50 border-b border-stone-100">
          <tr>
            <th className="text-left px-6 py-4 text-stone-500 font-medium">
              Project
            </th>
            <th className="text-left px-6 py-4 text-stone-500 font-medium">
              Amount Invested
            </th>
            <th className="text-left px-6 py-4 text-stone-500 font-medium">
              % Owned
            </th>
            <th className="text-left px-6 py-4 text-stone-500 font-medium">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {investments.map((inv, i) => {
            const title =
              inv.project?.title ?? inv.projectTitle ?? inv.title ?? `Project #${i + 1}`;
            const amount = inv.amountInvested ?? inv.amount ?? inv.investedAmount ?? 0;
            const pct = inv.percentage ?? inv.ownershipPercentage ?? 0;
            const date = inv.investedAt ?? inv.createdAt ?? inv.date;

            return (
              <tr
                key={inv.projectId ?? inv._id ?? i}
                className="hover:bg-stone-50 transition-colors"
              >
                <td className="px-6 py-4 text-stone-800 font-medium">
                  {title}
                </td>
                <td className="px-6 py-4 text-amber-600 font-semibold">
                  {fmt(amount)}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">
                    {Number(pct).toFixed(2)}%
                  </span>
                </td>
                <td className="px-6 py-4 text-stone-400">
                  {date
                    ? new Date(date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
