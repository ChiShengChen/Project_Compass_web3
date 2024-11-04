'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function WalletConnectComponent() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Connected</CardTitle>
          <CardDescription>Your wallet info below:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Address: {address}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => disconnect()}>Disconnect</Button>
        </CardFooter>
      </Card>
    )
    }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Press the button below to connect your crypto wallet</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => connect({ connector: injected() })}>Connect Wallet</Button>
      </CardFooter>
    </Card>
  )
}