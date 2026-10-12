import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-bids-comparison',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './bids-comparison.component.html',
  styleUrl: './bids-comparison.component.css',
})
export class BidsComparisonComponent extends DcBase {
  override defaults: Record<string, any> = {"balance": 2050, "tokenBalance": 23};
  constructor() { super(); this.state = { sel: 'o1', sort: 'best', delivery: false, tokens: false, accepted: false, secs: 2 * 3600 + 14 * 60 + 33 }; }
  componentDidMount() { this.timer = setInterval(() => this.setState((s) => ({ secs: s.secs > 0 ? s.secs - 1 : 0 })), 1000); }
  componentWillUnmount() { clearInterval(this.timer); }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const all = [
      { id: 'o1', name: 'مركز النخبة', area: 'سموحة · الإسكندرية', rating: 4.8, price: 850, hours: 24, onTime: 96, delivery: 40 },
      { id: 'o2', name: 'فيكس برو', area: 'سيدي بشر · الإسكندرية', rating: 4.6, price: 780, hours: 36, onTime: 91, delivery: 0 },
      { id: 'o3', name: 'تك كير', area: 'العجمي · الإسكندرية', rating: 4.9, price: 720, hours: 48, onTime: 98, delivery: 30 },
      { id: 'o4', name: 'لاب كير', area: 'المنتزه · الإسكندرية', rating: 4.4, price: 690, hours: 72, onTime: 88, delivery: 0 }
    ];
    const minPrice = Math.min(...all.map((o) => o.price));
    const minHours = Math.min(...all.map((o) => o.hours));
    const maxRate = Math.max(...all.map((o) => o.rating));
    const sorters = {
      best: (a, b) => (b.rating * 100 + b.onTime - b.price / 20) - (a.rating * 100 + a.onTime - a.price / 20),
      price: (a, b) => a.price - b.price,
      fast: (a, b) => a.hours - b.hours,
      rate: (a, b) => b.rating - a.rating
    };
    const st = this.state;
    const sorted = all.slice().sort(sorters[st.sort]);
    const sel = all.find((o) => o.id === st.sel);
    const hasDelivery = sel.delivery > 0;
    const useDelivery = st.delivery && hasDelivery;
    const tokenBal = this.props.tokenBalance ?? 23;
    const hasTokens = tokenBal >= 10;
    const useTokens = st.tokens && hasTokens;
    const discount = useTokens ? Math.round(sel.price * 0.1) : 0;
    const fee = useDelivery ? sel.delivery : 0;
    const total = sel.price - discount + fee;
    const bal = this.props.balance ?? 2050;
    const lowBalance = total > bal;
    const h = Math.floor(st.secs / 3600), m = Math.floor((st.secs % 3600) / 60), s = st.secs % 60;
    const pad = (x) => String(x).padStart(2, '0');
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      balanceText: ar(bal),
      offerCount: ar(all.length),
      countdown: pad(h) + ':' + pad(m) + ':' + pad(s),
      sorts: [['best', 'الأنسب لك'], ['price', 'الأقل سعراً'], ['fast', 'الأسرع'], ['rate', 'الأعلى تقييماً']].map(([k, l]) => ({ label: l, cls: st.sort === k ? 'on' : '', pressed: st.sort === k ? 'true' : 'false', pick: () => this.setState({ sort: k }) })),
      offers: sorted.map((o) => {
        const tags = [];
        if (o.price === minPrice) tags.push({ label: 'الأقل سعراً', cls: 't-price' });
        if (o.hours === minHours) tags.push({ label: 'الأسرع', cls: 't-fast' });
        if (o.rating === maxRate) tags.push({ label: 'الأعلى تقييماً', cls: 't-rate' });
        const on = o.id === st.sel;
        return {
          name: o.name, area: o.area, rating: ar(o.rating), price: ar(o.price), hours: ar(o.hours), onTime: ar(o.onTime),
          grace: ar(Math.min(o.hours * 0.2, 24).toFixed(1)),
          deliveryText: o.delivery > 0 ? 'متاح · ' + ar(o.delivery) + ' جنيه' : 'استلام شخصي فقط',
          tags, cls: on ? 'sel' : '', pressed: on ? 'true' : 'false',
          btnCls: on ? 'btn-primary' : 'btn-ghost', btnText: on ? 'العرض المختار' : 'اختر هذا العرض',
          pick: () => this.setState({ sel: o.id, delivery: false })
        };
      }),
      notAccepted: !st.accepted, accepted: st.accepted,
      sel: { name: sel.name },
      pickupCls: !useDelivery ? 'on' : '', pickupPressed: !useDelivery ? 'true' : 'false',
      deliveryCls: useDelivery ? 'on' : '', deliveryPressed: useDelivery ? 'true' : 'false', deliveryDisabled: !hasDelivery,
      deliveryLabel: hasDelivery ? 'طلب توصيل من وإلى عنوانك' : 'المحل لا يقدم خدمة توصيل',
      deliveryFeeText: hasDelivery ? ar(sel.delivery) + ' جنيه' : '—',
      setPickup: () => this.setState({ delivery: false }), setDelivery: () => this.setState({ delivery: true }),
      showAddress: useDelivery,
      hasTokens, tokens: ar(tokenBal), tokensLeft: ar(tokenBal - 10),
      tokenCls: useTokens ? 'on' : '', tokenPressed: useTokens ? 'true' : 'false', tokenBtn: useTokens ? 'مفعّل' : 'تفعيل',
      toggleTokens: () => this.setState((x) => ({ tokens: !x.tokens })),
      useTokens, useDelivery, baseText: ar(sel.price), discountText: ar(discount), feeText: ar(fee), totalText: ar(total),
      earnText: ar(Math.floor(total / 100)),
      lowBalance, canAccept: !lowBalance,
      accept: () => this.setState({ accepted: true })
    };
  }
}
