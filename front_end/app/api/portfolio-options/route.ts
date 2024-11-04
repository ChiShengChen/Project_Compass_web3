export async function GET() {
  // const data = await fetch('https://api.vercel.app/blog')
  // const posts = await data.json()
 
  return Response.json({
    "options": [
      {
        "optionId": 1,
        "optionName": "Steady Growth Vault",
        "risk": "Low",
        "arr": "5%",
        "description": "The vault is designed for ...",
        "allocations": [
          {
            "vault": "Beefy USDC Vault",
            "vaultAddress": "0xVaultAddress1",
            "token": "USDC",
            "amount": "400",
            "ratio": "0.4"
          },
          {
            "vault": "Compound DAI Vault",
            "vaultAddress": "0xVaultAddress2",
            "token": "DAI",
            "amount": "600",
            "ratio": "0.6"
          }
        ]
      },
      {
        "optionId": 2,
        "optionName": "Balanced Yield Vault",
        "risk": "Medium",
        "arr": "8%",
        "allocations": [
          {
            "vault": "AAVE ETH Vault",
            "vaultAddress": "0xVaultAddress3",
            "token": "ETH",
            "amount": "2"
          }
        ]
      },
      {
        "optionId": 3,
        "optionName": "High-Octane Yield Vault",
        "risk": "High",
        "arr": "12%",
        "allocations": [
          {
            "vault": "Beefy High-Yield Vault",
            "vaultAddress": "0xVaultAddress4",
            "token": "USDT",
            "amount": "2000"
          }
        ]
      }
    ]
  }
  )
}