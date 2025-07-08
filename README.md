# ⚡ Metavault – Web3 Wallet Playground

**⚡ Metavault** is an interactive seed-based wallet playground that lets users generate, view, and manage Solana and Ethereum wallets effortlessly. Built with `Next.js 15`, `Redux`, `Tailwind CSS v4`, and `OGL` for a stunning background — it's a smooth blend of frontend polish and cryptographic utility.

![image](https://github.com/user-attachments/assets/320c641d-ce5c-4965-a2ad-19f90e85f28d)

---

## ✨ Features

* 🔐 Seed phrase based wallet generation
* 🌱 Create Solana & Ethereum wallets using `bip39`, `tweetnacl`, and `ethers`
* ⚡ Dynamic particle + lightning background with OGL
* 🎛 Clipboard copy, eye toggle, and key masking for security
* 💡 Dark mode with smooth transitions
* 🍞 Instant feedback with Sonner toasts
* 🧠 Redux store for global mnemonic state

---

## 🧑‍💻 Tech Stack

| Category       | Tech                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| **Framework**  | [Next.js 15](https://nextjs.org/) + Turbopack                                                                 |
| **Blockchain** | [ethers.js](https://docs.ethers.io/), [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)         |
| **HD Wallets** | [bip39](https://github.com/bitcoinjs/bip39), [ed25519-hd-key](https://www.npmjs.com/package/ed25519-hd-key)   |
| **Redux**      | [Redux Toolkit](https://redux-toolkit.js.org/) + [React-Redux](https://react-redux.js.org/)                   |
| **Styling**    | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css`                                                 |
| **UI/UX**      | [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/), [Sonner](https://sonner.emilkowal.dev/) |
| **Effects**    | [OGL](https://github.com/oframe/ogl) for WebGL particles and lightning                                        |

---

## 🚀 Getting Started

```bash
# 1. Clone
git clone https://github.com/satyam-code45/metavault.git
cd metavault

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

---

## 📁 Folder Structure

```
📆 metavault/
📄 src/
│  📄 app/
│  │  📄 layout.tsx         # Root layout
│  │  📄 page.tsx           # Main wallet UI
│  📄 components/
│  │  📄 ui/                # Button, Dropdown, Sonner, etc.
│  │  📄 ethereumWallet.tsx # ETH wallet generator
│  │  📄 solanaWallet.tsx   # Solana wallet generator
│  │  📄 lightning.tsx      # OGL lightning background
│  │  📄 particles.tsx      # Particle effect
│  │  📄 seed-phrase.tsx    # Seed phrase input + generator
│  📄 store/                 # Redux slices and provider
│  📄 lib/                   # (Optional) custom utilities
📄 public/                    # Static files
📄 styles/                    # globals.css (Tailwind)
📄 .eslintrc, tailwind.config.ts, next.config.ts
📄 README.md
```

---

## 📜 Scripts

```bash
npm run dev     # Start dev server (Turbopack)
npm run build   # Create production build
npm run start   # Run production server
npm run lint    # Run linter
```
---

## 👤 Author

Built with ❤️ by [Satyam](https://github.com/satyam-code45)
[![GitHub Followers](https://img.shields.io/github/followers/satyam-code45?label=Follow%20Me\&style=social)](https://github.com/satyam-code45)
[![X](https://img.shields.io/twitter/follow/satyam45dev?label=Follow%20on%20X\&style=social\&logo=twitter)](https://x.com/satyam45dev)

---

## 📄 License

MIT Licensed. [Read here](LICENSE)

---

> Like the project? Consider giving it a ⭐ on GitHub!
