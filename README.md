# NETSIM

A minimal LAN messaging tool built with Bun and WebSockets. One machine runs the listener (master node); any number of publisher machines connect to it and send messages that appear in the listener's terminal.

## Acknowledgments

This project was developed by Praise Daramola as part of the Open Avenues Build Fellowship.

## How it works

- **listener** — starts a WebSocket server on port 3000 and prints incoming messages to stdout
- **publisher** — connects to the listener via WebSocket and sends typed messages with the sender's name and hostname

## Requirements

- [Bun](https://bun.sh) v1.0+

## Setup

```bash
bun install
```

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```
LISTENER_IP="192.168.x.x"   # IP of the machine running the listener
MY_NAME="Your Name"          # Display name for outgoing messages
```

## Usage

**On the listener machine:**

```bash
bun run src/listener.ts
```

**On each publisher machine:**

```bash
bun run src/publisher.ts
```

Type a message and press Enter to broadcast it to the listener.
