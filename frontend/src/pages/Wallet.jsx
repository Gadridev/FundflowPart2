import WalletCard from "../components/WalletCard";

export default function Wallet() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Wallet</h1>
        <p className="text-stone-400 text-sm mt-1">
          Manage your funds and view transaction history.
        </p>
      </div>
      <WalletCard />
    </div>
  );
}
