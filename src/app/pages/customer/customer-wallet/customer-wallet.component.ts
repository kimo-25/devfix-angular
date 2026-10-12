import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-customer-wallet',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './customer-wallet.component.html',
  styleUrl: './customer-wallet.component.css',
})
export class CustomerWalletComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { filter: 'all', open: false, done: false, amount: 500, method: 'card' }; }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const st = this.state;
    const icons = {
      topup: 'M12 5v14M5 12h14',
      hold: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z',
      comp: 'M12 3v10M8 9l4 4 4-4M5 20h14',
      pay: 'M5 12h14M13 6l6 6-6 6'
    };
    const all = [
      { k: 'pay', type: 'hold', title: 'حجز مبلغ طلب iPhone 13', sub: 'مركز النخبة · اليوم ١٠:٠٢ ص', status: 'محجوز', amount: -850 },
      { k: 'topup', type: 'topup', title: 'شحن رصيد', sub: 'بطاقة ائتمان · أمس', status: 'مكتمل', amount: 1000 },
      { k: 'comp', type: 'comp', title: 'تعويض تأخير (٥٪ من قيمة الطلب)', sub: 'طلب سابق · قبل ٣ أسابيع', status: 'مكتمل', amount: 42.5 },
      { k: 'pay', type: 'pay', title: 'سداد صيانة تابلت', sub: 'تك كير · قبل ٣ أسابيع', status: 'مكتمل', amount: -640 },
      { k: 'topup', type: 'topup', title: 'شحن رصيد', sub: 'محفظة إلكترونية · قبل شهر', status: 'مكتمل', amount: 1500 }
    ];
    const f = st.filter;
    const rows = all.filter((t) => f === 'all' || (f === 'topup' && t.type === 'topup') || (f === 'pay' && (t.type === 'pay' || t.type === 'hold')) || (f === 'comp' && t.type === 'comp'));
    const amounts = [200, 500, 1000, 2000];
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      filters: [['all', 'الكل'], ['topup', 'شحن'], ['pay', 'دفع وحجز'], ['comp', 'تعويضات']].map(([k, l]) => ({ label: l, cls: f === k ? 'on' : '', pressed: f === k ? 'true' : 'false', pick: () => this.setState({ filter: k }) })),
      txs: rows.map((t) => {
        const plus = t.amount > 0;
        const comp = t.type === 'comp';
        return { title: t.title, sub: t.sub, status: t.status, icon: icons[t.type], amount: (plus ? '+' : '−') + ar(Math.abs(t.amount)) + ' جنيه', amountColor: plus ? 'var(--accent)' : 'var(--ink)', bg: comp ? 'var(--accent-soft)' : t.type === 'topup' ? 'var(--primary-soft)' : 'var(--bg)', fg: comp ? 'var(--accent)' : t.type === 'topup' ? 'var(--primary)' : 'var(--muted)' };
      }),
      topupOpen: st.open, topupForm: !st.done, topupDone: st.done,
      openTopup: () => this.setState({ open: true, done: false }), closeTopup: () => this.setState({ open: false, done: false }),
      amounts: amounts.map((a) => ({ label: ar(a), cls: st.amount === a ? 'on' : '', pressed: st.amount === a ? 'true' : 'false', pick: () => this.setState({ amount: a }) })),
      cardCls: st.method === 'card' ? 'on' : '', cardPressed: st.method === 'card' ? 'true' : 'false', payCard: () => this.setState({ method: 'card' }),
      ewCls: st.method === 'ew' ? 'on' : '', ewPressed: st.method === 'ew' ? 'true' : 'false', payEw: () => this.setState({ method: 'ew' }),
      amountLabel: ar(st.amount), newBalance: ar(1200 + st.amount),
      confirmTopup: () => this.setState({ done: true })
    };
  }
}
