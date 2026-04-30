import { NextRequest, NextResponse } from "next/server";
import { calculateSaju, type SajuInput } from "@/lib/saju";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SajuInput & { name?: string };
    const { name, birthDate, birthTime, calendarType, gender, isLeapMonth } = body;

    const reportData = calculateSaju({
      birthDate,
      birthTime,
      calendarType,
      gender,
      isLeapMonth,
    });

    return NextResponse.json({
      success: true,
      data: {
        ...reportData,
        name,
        gender,
        timestamp: new Date().toISOString(),
      }
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to calculate saju" }, { status: 500 });
  }
}
