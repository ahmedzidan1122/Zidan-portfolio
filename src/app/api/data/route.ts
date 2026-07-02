import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { defaultData } from "@/lib/defaultData";
import type { SiteData } from "@/lib/types";

const DATA_FILE = path.join(process.cwd(), "data.json");

async function readData(): Promise<SiteData> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return defaultData;
  }
}

async function writeData(data: SiteData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || "admin-secret-123"}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Partial<SiteData> = await request.json();
    const current = await readData();
    const updated = { ...current, ...body };
    await writeData(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
