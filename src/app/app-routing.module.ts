import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateGuard } from './services/sharedData/can-activate.guard';
import { ExchangeGuard } from './services/sharedData/exchange.guard';
import { P2pGuard } from './services/sharedData/p2p.guard';
const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./module/login/login.module').then((m) => m.LoginModule ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./module/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./module/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'reset/:id',
    loadChildren: () =>
      import('./module/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      )
  },
  {
    path: 'forget-password',
    loadChildren: () =>
      import('./module/forget-password/forget-password.module').then(
        (m) => m.ForgetPasswordModule
      ),
  },
  {
    path: 'ex-all-order',
    loadChildren: () =>
      import('./module/ex-yourorder/ex-yourorder.module').then(
        (m) => m.ExYourorderModule
      ), canActivate: [canActivateGuard]
  },
  {
    path: 'ex-all-trade',
    loadChildren: () =>
      import('./module//ex-tradebook-trade/ex-tradebook-trade.module').then(
        (m) => m.ExTradebookTradeModule
      ), canActivate: [canActivateGuard]
  },
  {
    path: 'payment-status/:id/:gatewayId',
    loadChildren: () =>
      import('./module/payment-status/payment-status.module').then(
        (m) => m.PaymentStatusModule
      ), canActivate: [canActivateGuard]
  },
 
      {
        path: 'exchange',
        loadChildren: () =>
          import(
            './module/client-exchange-dash/client-exchange-dash.module'
          ).then((m) => m.ClientExchangeDashModule), canActivate: [canActivateGuard, ExchangeGuard]
      },
      {
        path: 'deposit',
        loadChildren: () =>
          import('./module/deposit/deposit.module').then(
            (m) => m.DepositModule
          ), canActivate: [canActivateGuard,ExchangeGuard]
       
      },
      {
        path: 'withdraw',
        loadChildren: () =>
          import('./module/withdraw/withdraw.module').then(
            (m) => m.WithdrawModule
          ), canActivate: [canActivateGuard,ExchangeGuard]
       
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./module/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ), canActivate: [canActivateGuard,ExchangeGuard]
       
      },
      {
        path: 'invite-earn',
        loadChildren: () =>
          import('./module/invite-earn/invite-earn.module').then(
            (m) => m.InviteEarnModule
          ), canActivate: [canActivateGuard,ExchangeGuard]
             },
      // {
      //   path: 'supports',
      //   loadChildren: () =>
      //     import('./module/supports/supports.module').then(
      //       (m) => m.SupportsModule
      //     ), canActivate: [canActivateGuard]
      //        },
      {
        path: 'add-new-ticket',
        loadChildren: () =>
          import('./module/add-new-ticket/add-new-ticket.module').then(
            (m) => m.AddNewTicketModule
          ), canActivate: [canActivateGuard]
             },
      {
        path: 'wallet',
        loadChildren: () =>
          import('./module/wallet-account/wallet-account.module').then(
            (m) => m.WalletAccountModule
          ), canActivate: [canActivateGuard]
      },
      {
        path: 'deposit-details',
        loadChildren: () =>
          import('./module/deposit-details/deposit-details.module').then(
            (m) => m.DepositDetailsModule
          ), canActivate: [canActivateGuard,ExchangeGuard]
        // canActivate: [canActivateGuard],
      },

      {
        path: 'transfer-money',
        loadChildren: () =>
          import('./module/transfer-money/transfer-money.module').then(
            (m) => m.TransferMoneyModule
          ), canActivate: [canActivateGuard]
        // canActivate: [canActivateGuard],
      },
   
  
      {
        path: 'p2p',
        loadChildren: () =>
          import('./module/client-p2p-dash/client-p2p-dash.module').then(
            (m) => m.ClientP2pDashModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./module/profile/profile.module').then(
            (m) => m.ProfileModule
          )
      },
      {
        path: 'p2p-transaction-view',
        loadChildren: () =>
          import('./module/p2p-transaction-view/p2p-transaction-view.module').then(
            (m) => m.P2pTransactionViewModule
          ), canActivate: [canActivateGuard,P2pGuard]
      },
      {
        path: 'p2p-pending-order',
        loadChildren: () =>
          import('./module/p2p-pending-order/p2p-pending-order.module').then(
            (m) => m.P2pPendingOrderModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path: 'p2p-pending-details',
        loadChildren: () =>
          import('./module/p2p-pending-details/p2p-pending-details.module').then(
            (m) => m.P2pPendingDetailsModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path: 'trade',
        loadChildren: () =>
          import('./module/trade/trade.module').then(
            (m) => m.TradeModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path: 'my-listing/:statusId',
        loadChildren: () =>
          import('./module/my-order-list/my-order-list.module').then(
            (m) => m.MyOrderListModule
          ), canActivate: [canActivateGuard,P2pGuard]
      },
      {
        path: 'Cancel-order-list/:statusId',
        loadChildren: () =>
          import('./module/my-order-list/my-order-list.module').then(
            (m) => m.MyOrderListModule
          ), canActivate: [canActivateGuard,P2pGuard]
      },
      {
        path: 'onboading-kyc',
        loadChildren: () =>
          import('./module/onboardkyc/onboardkyc.module').then(
            (m) => m.OnboardkycModule
          ), canActivate: [canActivateGuard]
      },
      {
        path: 'myOrder',
        loadChildren: () =>
          import('./module/my-order/my-order.module').then(
            (m) => m.MyOrderModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },{
        path:'reports',
        loadChildren: () =>
          import('./module/reports/reports.module').then(
            (m) => m.ReportsModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path:'ticket',
        loadChildren: () =>
          import('./module/ticket/ticket.module').then(
            (m) => m.TicketModule
          )
      },
      {
        path:'packages',
        loadChildren: () =>
          import('./module/p2p-package/p2p-package.module').then(
            (m) => m.P2pPackageModule
          ), canActivate: [canActivateGuard, P2pGuard]
      },
      {
        path: 'ledger',
        loadChildren: () =>
          import('./module/ledger/ledger.module').then(
            (m) => m.LedgerModule
          ), canActivate: [canActivateGuard]
      },
   
  {
    path: '**',
    redirectTo: 'login',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
