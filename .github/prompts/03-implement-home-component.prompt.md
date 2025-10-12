---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

---
title: Home landing Page 
description: Build home landing page for MyEzGift App.
priority: critical
---

# 🧩 Home Landing Page

## 🎯 Goal
Implement a responsive and user-friendly home landing page for the MyEzGift based on following description of the MyEzGift application:

B2E Gift Card Platform – Non‑Technical Product Requirements
Purpose & Goals
This document defines the non‑technical product rules and behaviors for a B2E gift‑card issuing platform. It is written so Backend, Frontend, and Design can each derive their own implementation docs without needing API or database details.
Primary goals
Enable Admins to onboard business Clients, accept offline payments, manage catalogs, and view reports.
Enable Clients to fund wallets, create Voucher (PIN) cards in bundles, distribute them, and manage status.
Enable Customers to authenticate with a PIN and order product Gift Cards from the assigned catalog, with delivery by SMS/WhatsApp/Email or download.
Enforce strict business rules for currencies, FX, pricing/discounts, vouchers, orders, ledgers, and auditability.
Out of scope (v1)
KYC/identity verification of clients or customers.
Automatic notifications for expiry or stock delays.
Multi‑factor auth/OTP for customers.
Automated delivery fallback (manual retries only).
Personas & Roles
Admin
Super Admin: full visibility across all clients and actions.
Scoped Admin: can see and manage only assigned clients (manual assignment by Super Admin).
Accountant: global read‑only access to reports and finance extracts; no operational actions.
Client (Business)
Business Owner: full access to own organization.
Client Accountant: view reports and financials for own organization.
Customer (End‑user)
Authenticates with a PIN (voucher card). Places orders for gift cards within the catalog assigned to that PIN.
Glossary
Client: a business using the platform. May hold multiple wallets (one per enabled currency).
Customer: end‑user who authenticates with a Voucher (PIN) card.
Voucher (PIN card): a balance‑bearing access token tied to exactly one catalog; used by customers to purchase gift cards. Identified by a 16‑character PIN and an integer serial.
Gift card (product card): the final product voucher code delivered to a customer for a specific product and value.
System Product List (System Products): platform‑wide master list of products managed by Admin/Stock integration.
Client Catalog (per‑wallet): a catalog of products (with per‑product percentage discounts) that an Admin assigns to a specific Client wallet. One wallet → exactly one Client Catalog. A single Client Catalog may be assigned to multiple wallets.
Product List (Client Product List): a Client‑defined subset of the assigned Client Catalog used to restrict which products can be ordered with vouchers from a specific bundle. Selected during voucher bundle creation, then frozen for that bundle. Products inside a Product List have an active flag.
Wallet: a client balance container in a specific currency. Used to fund voucher creation and to check spending capacity.
Order: a customer purchase for up to 5 gift cards of one product.
Hierarchy of subsets:
System Product List ⊇ Client Catalog ⊇ Product List
High‑Level Journeys
4.1 Admin
Create Client and initial Wallets.
Record an offline payment (amount, currency, reference, date, payer name) → increases the Client’s wallet balance.
Create or edit Client Catalogs (products + % discounts). Assign a catalog to each wallet (1 wallet ↔ 1 Client Catalog; 1 catalog ↔ many wallets).
View and export reports (balances, issued vouchers, delivery outcomes, stock outcomes, refunds).
4.2 Client
View wallet balances and the Client Catalog assigned to each wallet.
1a) Create and manage Product Lists (Client‑defined subsets of the assigned Client Catalog) to control which products will be available for a voucher bundle.
Create Voucher Bundles: select Product List, confirm wallet’s Client Catalog (implicit via wallet), set expiry (UTC), count, face value per voucher, and delivery method (download CSV or send via uploaded CSV of recipients).
On creation, the platform checks total required funds and debits the wallet; vouchers start as Active with the set face value and expiry.
Manage vouchers: search by serial or PIN, and deactivate unused vouchers (cannot deactivate if any purchase exists).
Stop Bundle (new): stop all vouchers in a bundle to make them unusable at any stage.
View reports and export CSVs.
4.3 Customer
Enter PIN (case‑insensitive; hyphens/spacing ignored).
See the remaining balance and expiry (UTC) of the voucher card.
Pick one product from the voucher’s Product List (subset of its wallet’s Client Catalog), obeying product rules; place an Order for up to 5 gift cards.
Choose delivery: WhatsApp, SMS, Email, or Download (file).
Receive receipt/summary; can re‑send or re‑download past orders.

---

## 🧱 existing Component
src/app/features/pages/auth/home.component.ts
src/app/features/pages/auth/home.component.html
src/app/features/pages/auth/home.component.css


### Behavior
- Display a welcome message and brief app description.
- Provide two navigation links, one for Admin login and one for Customer login pages.
- Use Angular Router for navigation.
- Ensure the component is responsive and user-friendly.


### UI
- Clean, minimal layout (Tailwind or Angular Material form).
- Responsive design for desktop and mobile.

---

## ✅ Completion
- [ ] Home landing page functional with navigation links.
- [ ] Responsive design implemented.

---


////this landing page is implemented by bolt.new 