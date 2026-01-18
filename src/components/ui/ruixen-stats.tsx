"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

import Link from "next/link";
import { useCalendly } from "@/context/calendly-context";

// --- Data Constants from Impact Chart ---

// Agency Success Data 1: Client Revenue Growth (Consistent Upward Trend)
const revenueData = [
  { value: 15000 }, { value: 18000 }, { value: 22000 }, { value: 24000 }, { value: 28000 },
  { value: 32000 }, { value: 35000 }, { value: 38000 }, { value: 42000 }, { value: 45000 },
  { value: 48000 }, { value: 52000 }, { value: 55000 }, { value: 60000 }, { value: 65000 },
  { value: 68000 }, { value: 72000 }, { value: 78000 }, { value: 85000 }, { value: 92000 },
  { value: 95000 }, { value: 105000 }, { value: 110000 }, { value: 115000 }, { value: 120000 },
  { value: 125000 }, { value: 130000 }, { value: 135000 }, { value: 142000 }, { value: 148000 },
  { value: 155000 }, { value: 160000 }, { value: 168000 }, { value: 175000 }, { value: 180000 },
  { value: 185000 }, { value: 195000 }, { value: 205000 }, { value: 215000 }, { value: 220000 },
  { value: 230000 }, { value: 240000 }, { value: 250000 }, { value: 260000 }, { value: 275000 },
  { value: 285000 }, { value: 295000 }, { value: 310000 }, { value: 320000 }, { value: 335000 },
  { value: 350000 }, { value: 365000 }, { value: 380000 }, { value: 400000 }, { value: 420000 },
  { value: 440000 }, { value: 460000 }, { value: 480000 }, { value: 500000 }, { value: 525000 },
];

// Agency Success Data 2: Conversion Rate Uplift
const conversionData = [
  { value: 1.2 }, { value: 1.3 }, { value: 1.5 }, { value: 1.6 }, { value: 1.8 }, { value: 2.0 },
  { value: 2.1 }, { value: 2.3 }, { value: 2.4 }, { value: 2.6 }, { value: 2.8 }, { value: 2.9 },
  { value: 3.1 }, { value: 3.3 }, { value: 3.5 }, { value: 3.6 }, { value: 3.8 }, { value: 4.0 },
  { value: 4.1 }, { value: 4.3 }, { value: 4.5 }, { value: 4.6 }, { value: 4.8 }, { value: 5.0 },
  { value: 5.2 }, { value: 5.3 }, { value: 5.5 }, { value: 5.7 }, { value: 5.8 }, { value: 6.0 },
  { value: 6.2 }, { value: 6.3 }, { value: 6.5 }, { value: 6.7 }, { value: 6.8 }, { value: 7.0 },
  { value: 7.1 }, { value: 7.3 }, { value: 7.4 }, { value: 7.5 }, { value: 7.6 }, { value: 7.8 },
  { value: 7.9 }, { value: 8.0 }, { value: 8.1 }, { value: 8.2 }, { value: 8.3 }, { value: 8.4 },
  { value: 8.5 }, { value: 8.4 }, { value: 8.5 }, { value: 8.6 }, { value: 8.7 }, { value: 8.8 },
  { value: 8.9 }, { value: 9.0 }, { value: 9.1 }, { value: 9.2 }, { value: 9.3 }, { value: 9.5 },
];

// Agency Success Data 3: Store Speed (Time to Interactive - Lower is Better, but we show improvement)
// Let's show "Speed Score" going UP instead to match the visual language of "Growth"
const performanceData = [
  { value: 45 }, { value: 48 }, { value: 50 }, { value: 52 }, { value: 55 }, { value: 58 },
  { value: 60 }, { value: 62 }, { value: 65 }, { value: 68 }, { value: 70 }, { value: 72 },
  { value: 75 }, { value: 78 }, { value: 80 }, { value: 82 }, { value: 85 }, { value: 88 },
  { value: 90 }, { value: 92 }, { value: 91 }, { value: 93 }, { value: 94 }, { value: 95 },
  { value: 96 }, { value: 95 }, { value: 97 }, { value: 98 }, { value: 99 }, { value: 98 },
  { value: 99 }, { value: 100 }, { value: 99 }, { value: 100 }, { value: 98 }, { value: 99 },
  { value: 100 }, { value: 99 }, { value: 100 }, { value: 98 }, { value: 99 }, { value: 100 },
  { value: 99 }, { value: 100 }, { value: 100 }, { value: 99 }, { value: 100 }, { value: 99 },
  { value: 100 }, { value: 100 }, { value: 99 }, { value: 100 }, { value: 100 }, { value: 99 },
  { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 }, { value: 100 },
];

const businessCards = [
  {
    title: 'Revenue Growth',
    metric: 'Client revenue scaling',
    baseValue: '$15k',
    baseCurrency: 'Start',
    targetValue: '$525k',
    targetCurrency: 'Now',
    data: revenueData,
    change: 'Explosive',
    isPositive: true,
    color: 'var(--color-emerald-500)',
  },
  {
    title: 'Conversion Boost',
    metric: 'Conversion Rate',
    baseValue: '1.2%',
    baseCurrency: 'Before',
    targetValue: '9.5%',
    targetCurrency: 'After',
    data: conversionData,
    change: 'Optimized',
    isPositive: true,
    color: 'var(--color-blue-500)',
  },
  {
    title: 'Speed Score',
    metric: 'Google PageSpeed',
    baseValue: '45',
    baseCurrency: 'Mobile',
    targetValue: '100',
    targetCurrency: 'Mobile',
    data: performanceData,
    change: 'Optimized',
    isPositive: true,
    color: 'var(--color-amber-500)',
  },
];

export default function RuixenStats() {
  const { openCalendly } = useCalendly();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
      {/* Left: Text & CTA */}
      <div className="flex flex-col justify-center gap-6 items-center md:items-start text-center md:text-left">
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            We Don't Just Build.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
               We Scale Brands.
            </span>
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Our data-driven approach ensures every pixel serves a purpose: 
            maximizing your ROI and elevating your brand authority.
        </p>
        <button 
          onClick={openCalendly}
          className="mt-4 group relative px-8 py-3 bg-primary text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] transition-all duration-300 flex items-center gap-2 w-fit"
        >
          Start Scaling <span className="group-hover:translate-x-1 transition-transform">↗</span>
        </button>
      </div>

      {/* Right: Impact Charts Grid */}
      <div className="flex flex-col gap-4 w-full">
         {/* Render the 3 cards in a vertical stack or grid depending on preference. 
             User requested "3 card... put them in ruxien stats". 
             A clean vertical stack fits the "Right column" layout well. */}
          {businessCards.map((card, i) => (
            <Card key={i} className="bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-foreground m-0">{card.title}</h3>
                        <p className="text-xs text-muted-foreground m-0">{card.metric}</p>
                    </div>
                     <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">{card.targetValue}</div>
                         <div className="text-xs text-muted-foreground font-medium">{card.targetCurrency}</div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="h-16 relative w-full min-w-0">
                    <ResponsiveContainer width="99%" height="100%" minWidth={0}>
                      <LineChart
                        data={card.data}
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                      >
                        <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                        <ReferenceLine y={0} stroke="var(--border)" strokeWidth={1} strokeDasharray="3 3" />
                         <Tooltip
                          cursor={{ stroke: card.color, strokeWidth: 1, strokeDasharray: '2 2' }}
                          content={({ active, payload }) => {
                             if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-popover border border-border rounded px-2 py-1 text-xs text-popover-foreground shadow-md">
                                        {payload[0].value}
                                    </div>
                                  )
                             }
                             return null;
                          }}
                         />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={card.color}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: card.color, stroke: 'var(--background)' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  );
}
