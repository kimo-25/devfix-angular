import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'DevFix — landing', loadComponent: () => import('./pages/public/landing/landing.component').then((m) => m.LandingComponent) },
  { path: 'auth', title: 'DevFix — auth', loadComponent: () => import('./pages/public/auth/auth.component').then((m) => m.AuthComponent) },
  { path: 'center/register', title: 'DevFix — center-register', loadComponent: () => import('./pages/public/center-register/center-register.component').then((m) => m.CenterRegisterComponent) },
  { path: 'devices', title: 'DevFix — my-devices', loadComponent: () => import('./pages/customer/my-devices/my-devices.component').then((m) => m.MyDevicesComponent) },
  { path: 'wizard', title: 'DevFix — request-wizard', loadComponent: () => import('./pages/customer/request-wizard/request-wizard.component').then((m) => m.RequestWizardComponent) },
  { path: 'bids', title: 'DevFix — bids-comparison', loadComponent: () => import('./pages/customer/bids-comparison/bids-comparison.component').then((m) => m.BidsComparisonComponent) },
  { path: 'tracking', title: 'DevFix — order-tracking', loadComponent: () => import('./pages/customer/order-tracking/order-tracking.component').then((m) => m.OrderTrackingComponent) },
  { path: 'scope-change', title: 'DevFix — scope-change-dialog', loadComponent: () => import('./pages/customer/scope-change-dialog/scope-change-dialog.component').then((m) => m.ScopeChangeDialogComponent) },
  { path: 'otp-dialogs', title: 'DevFix — otp-dialogs', loadComponent: () => import('./pages/customer/otp-dialogs/otp-dialogs.component').then((m) => m.OtpDialogsComponent) },
  { path: 'wallet', title: 'DevFix — customer-wallet', loadComponent: () => import('./pages/customer/customer-wallet/customer-wallet.component').then((m) => m.CustomerWalletComponent) },
  { path: 'account', title: 'DevFix — account', loadComponent: () => import('./pages/customer/account/account.component').then((m) => m.AccountComponent) },
  { path: 'center/feed', title: 'DevFix — center-feed', loadComponent: () => import('./pages/center/center-feed/center-feed.component').then((m) => m.CenterFeedComponent) },
  { path: 'center/jobs', title: 'DevFix — center-jobs', loadComponent: () => import('./pages/center/center-jobs/center-jobs.component').then((m) => m.CenterJobsComponent) },
  { path: 'center/wallet', title: 'DevFix — center-wallet', loadComponent: () => import('./pages/center/center-wallet/center-wallet.component').then((m) => m.CenterWalletComponent) },
  { path: 'admin/verify', title: 'DevFix — admin-verify', loadComponent: () => import('./pages/admin/admin-verify/admin-verify.component').then((m) => m.AdminVerifyComponent) },
  { path: 'admin/ops', title: 'DevFix — admin-ops', loadComponent: () => import('./pages/admin/admin-ops/admin-ops.component').then((m) => m.AdminOpsComponent) },
  { path: 'admin/finance', title: 'DevFix — admin-finance', loadComponent: () => import('./pages/admin/admin-finance/admin-finance.component').then((m) => m.AdminFinanceComponent) },
  { path: '**', redirectTo: '' },
];
