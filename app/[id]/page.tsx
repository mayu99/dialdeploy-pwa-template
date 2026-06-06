"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Circle, RefreshCw, AlertCircle, Calendar } from "lucide-react";
import * as brand from "../../config/brand";
import { getItem, toggleItem } from "../../lib/api";
import { Item } from "../../types/Item";

export default function DetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItem(id);
      setItem(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load item detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleToggle = async () => {
    if (!item) return;
    try {
      const updated = await toggleItem(item.id, !item.completed);
      setItem(updated);
    } catch (err: any) {
      console.error(err);
      alert("Error updating item: " + err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-2">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="p-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-xl font-bold font-heading tracking-tight">Item Details</h1>
          <p className="text-xs text-zinc-400">View and update tracking status</p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-zinc-500">
          <RefreshCw size={24} className="animate-spin mb-4" />
          <p className="text-sm">Fetching item details...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-sm font-semibold text-red-200">Error</h4>
            <p className="text-xs text-red-400 mt-1">{error}</p>
            <button
              onClick={fetchItem}
              className="text-xs font-semibold mt-2 underline"
              style={{ color: brand.PRIMARY_COLOR }}
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !item ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-sm">Item not found.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-900/20 space-y-6">
            <div>
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                Title
              </span>
              <h2 className="text-lg font-bold text-zinc-100">{item.title}</h2>
            </div>

            {item.description && (
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                  Description
                </span>
                <p className="text-sm text-zinc-350 leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/60">
              <div>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                  Status
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.completed ? "#10b981" : brand.PRIMARY_COLOR }}
                  />
                  <span className="text-xs font-semibold text-zinc-300">
                    {item.completed ? "Completed" : "Active"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest block mb-1">
                  Created At
                </span>
                <div className="flex items-center gap-1 text-zinc-400 mt-0.5">
                  <Calendar size={12} />
                  <span className="text-xs">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className="w-full py-3.5 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-semibold active:scale-95 mt-auto"
            style={{
              borderColor: item.completed ? "rgba(244, 63, 94, 0.2)" : `${brand.PRIMARY_COLOR}30`,
              backgroundColor: item.completed ? "rgba(244, 63, 94, 0.05)" : "transparent",
              color: item.completed ? "#f43f5e" : "#ffffff",
            }}
          >
            {item.completed ? (
              <>
                <Circle size={18} /> Mark as Incomplete
              </>
            ) : (
              <>
                <CheckCircle size={18} /> Mark as Completed
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
