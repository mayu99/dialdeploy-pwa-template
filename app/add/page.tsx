"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";
import * as brand from "../../config/brand";
import { createItem } from "../../lib/api";

export default function AddPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await createItem({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Error creating item: " + err.message);
    } finally {
      setLoading(false);
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
          <h1 className="text-xl font-bold font-heading tracking-tight">Create Item</h1>
          <p className="text-xs text-zinc-400">Add a new record to your tracker</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Morning workout"
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add extra context..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all text-sm resize-none"
            />
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 disabled:pointer-events-none text-sm"
            style={{
              backgroundColor: brand.PRIMARY_COLOR,
              boxShadow: `0 10px 20px -5px ${brand.PRIMARY_COLOR}30`,
            }}
          >
            {loading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <>
                <Plus size={18} /> Add Item
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
