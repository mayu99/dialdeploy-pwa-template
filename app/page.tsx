"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, CheckCircle, Circle, RefreshCw, ChevronRight, AlertCircle } from "lucide-react";
import * as brand from "../config/brand";
import { listItems, toggleItem } from "../lib/api";
import { Item } from "../types/Item";

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listItems();
      setItems(data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggle = async (e: React.MouseEvent, id: string, currentStatus: boolean) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const updated = await toggleItem(id, !currentStatus);
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, completed: updated.completed } : item))
      );
    } catch (err: any) {
      console.error(err);
      alert("Error updating item: " + err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-2 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-tight">Your Items</h1>
          <p className="text-xs text-zinc-400">Manage your list items</p>
        </div>
        <button
          onClick={fetchItems}
          className="p-2 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:text-zinc-50 transition-colors"
          title="Refresh List"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-semibold text-red-200">Connection Error</h4>
            <p className="text-xs text-red-400 mt-1">{error}</p>
            <button
              onClick={fetchItems}
              className="text-xs font-semibold mt-2 underline"
              style={{ color: brand.PRIMARY_COLOR }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {loading && items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-zinc-500">
          <RefreshCw size={24} className="animate-spin mb-4" />
          <p className="text-sm">Fetching items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20 text-zinc-500">
          <p className="text-sm mb-4">No items recorded yet.</p>
          <Link
            href="/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all shadow-lg"
            style={{ backgroundColor: brand.PRIMARY_COLOR }}
          >
            <Plus size={16} /> Create First Item
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id}`}
              className="block p-4 rounded-2xl border border-zinc-850 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleToggle(e, item.id, item.completed)}
                  className="shrink-0 transition-transform active:scale-95"
                >
                  {item.completed ? (
                    <CheckCircle
                      className="transition-colors"
                      style={{ color: brand.PRIMARY_COLOR }}
                      size={22}
                    />
                  ) : (
                    <Circle className="text-zinc-600 hover:text-zinc-500 transition-colors" size={22} />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-sm truncate transition-all ${
                      item.completed ? "line-through text-zinc-500" : "text-zinc-200"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-zinc-500 truncate mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
                <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Floating Action Button */}
      <Link
        href="/add"
        className="fixed bottom-6 right-6 p-4 rounded-full text-white shadow-2xl transition-all active:scale-95 flex items-center justify-center hover:brightness-110"
        style={{
          backgroundColor: brand.PRIMARY_COLOR,
          boxShadow: `0 10px 25px -5px ${brand.PRIMARY_COLOR}50`,
        }}
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
