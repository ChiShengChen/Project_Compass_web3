"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function InvestmentPlanDialog({ children } : { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[calc(100vh-2rem)] flex flex-col p-0">
        <DialogHeader className="p-6 flex-shrink-0">
          <div className="flex justify-center items-center">
            <DialogTitle className="text-2xl font-bold">Investment Plan Details</DialogTitle>
          </div>
          <DialogDescription className="text-center mt-2">
            Comprehensive overview of our strategic investment approach
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Investment Plan Overview</h2>
              <p>
                Our investment plan is designed to provide a balanced approach to wealth accumulation, focusing on
                long-term growth while managing risk. This plan is suitable for investors with a moderate risk
                tolerance and a time horizon of 5-10 years.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Asset Allocation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Uniswap: 60%</li>
                <li>Scroll DeFi: 40%</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Diversified portfolio to spread risk across different blockchain-based assets</li>
                <li>Regular rebalancing to maintain target allocation</li>
                <li>Tax-efficient investment strategies tailored for crypto assets</li>
                <li>Access to low-cost DeFi platforms</li>
                <li>Quarterly performance reviews and adjustments to respond to dynamic market conditions</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Risk Management</h2>
              <p>
                Our risk management strategy includes diversification across blockchain technologies, regular
                monitoring of DeFi market conditions, and the use of smart contracts for automated risk assessments.
                We also employ dollar-cost averaging to reduce the impact of crypto market volatility.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Fees and Expenses</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Annual management fee: 0.75% of assets under management</li>
                <li>No load fees or transaction costs due to the decentralized nature of the investments</li>
                <li>Gas fees for transactions on blockchain networks vary based on network congestion</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Performance Expectations</h2>
              <p>
                While past performance does not guarantee future results, our investment plan targets an average
                annual return of 7-9% over the long term in the context of crypto markets. However, investors should
                be prepared for periods of high volatility and potential short-term losses.
              </p>
            </section>
          </div>
        </div>
        <Button size="lg" className="px-8 py-2 text-lg font-semibold">
          Invest Now
        </Button>
      </DialogContent>
    </Dialog>
  )
}
