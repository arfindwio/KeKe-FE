# Frontend Repository

This repository contains the frontend code for our application, structured using React Router for navigation. Below is an overview of the available routes in the application.

## Table of Contents

- [Installation](#installation)
- [Routes Overview](#routes-overview)
- [Authentication Routes](#authentication-routes)
- [Account Routes](####account-routes)
- [Product Routes](#product-routes)
- [Payment Routes](#payment-routes)
- [Admin Routes](#admin-routes)

## Installation

To get started with the frontend application, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:arfindwio/KeKe-FE.git

   ```

2. Navigate into the project directory:

   ```bash
   cd KeKe-FE

   ```

3. Install the dependencies:

   ```bash
   yarn install

   ```

4. Start the development server:
   ```bash
   yarn start
   ```

## Routes Overview

### Error Route

- `*` - Renders the `<Error404 />` component for any undefined routes.

### Home Route

- `/` - Renders the <Home /> component.

### Authentication Routes

- `/login` - Renders the `<Login />` component.
- `/register` - Renders the `<Register />` component.
- `/otp` - Renders the `<Otp />` component.
- `/verify-account` - Renders the `<VerifyAccount />` component.
- `/forget-password` - Renders the `<ForgetPassword />` component.
- `/update-password` - Renders the `<UpdatePassword />` component.

### Account Routes

Protected by a token:

- `/account-profile` - Renders the `<Profile />` component.
- `/account-setting` - Renders the `<Setting />` component.
- `/notification` - Renders the `<Notification />` component.
- `/history` - Renders the `<History />` component.
- `/cart` - Renders the `<Cart />` component.

### Product Routes

- `/product` - Renders the `<Products />` component.
- `/product/:productId` - Renders the `<DetailProduct />` component for a specific product.

### Payment Routes

Protected by a token:

- `/payment` - Renders the `<Payment />` component.
- `/payment/success` - Renders the `<PaymentSuccess />` component.

### Admin Routes

Protected by admin authentication:

- `/admin/dashboard` - Renders the `<AdminDashboard />` component.
- `/admin/user` - Renders the `<AdminUser />` component.
- `/admin/promotion` - Renders the `<AdminPromotion />` component.
- `/admin/category` - Renders the `<AdminCategory />` component.
- `/admin/product` - Renders the `<AdminProduct />` component.
- `/admin/discussion` - Renders the `<AdminDiscussion />` component.
