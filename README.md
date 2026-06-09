# Loaf's Video Game Store

Fyrir þetta verkefni ákvað ég að byggja vefsíðu fyrir tölvuleikjabúð, byggt með: React, Typescript, Supabase, Zustand, React Query og MUI

Notendur geta leitað af leikjum, searchað og filterað vörur, skoðað details um vörurnar, Signað upp/signað inn, addað leikjum í cartið og svo klárað "fake checkout"

## Live Demo

[Opnaðu appið hér] lokaverkefni2.vercel.app

## Features

- Heimasíða fyrir búðina
- Listi fyrir vörur
- Details síða fyrir hverja vöru
- Search fyrir vörur
- Filters fyrir flokka
- Supabase product data
- User authentification með Supabase
- Cart með "add", "remove", og "quantity controls"
- "Fake checkout" og "Fake payment flow"
- Staðfestingar state eftir fake checkoutið
- Responsive uppsetning
- Zustand state management fyrir cartið
- React Query fyrir product fetching
- Tests fyrir bæði cart logic og checkout logic

## Tech Stack

- React
- TypeScript
- Vite
- MUI
- Zustand
- TanStack React Query
- Supabase
- Vitest

## Local Setup

1. Clonaðu repositoryið
2. Installaðu dependancies:
"npm install"
3. búðu til .env file í project rootinu og skrifaðu:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. runnaðu development serverinn:
"npm run dev"
5. runnaðu testin:
"npm run test:run"