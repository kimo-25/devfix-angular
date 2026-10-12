import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-center-feed',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './center-feed.component.html',
  styleUrl: './center-feed.component.css',
})
export class CenterFeedComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { filter: 'all', modalId: null, price: '', hours: '', offers: {} }; }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const st = this.state;
    const icons = { mobile: 'M8.5 2.5h7a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2zM11 18.5h2', tablet: 'M6.5 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 17.5h2', laptop: 'M5 6h14a1 1 0 0 1 1 1v9H4V7a1 1 0 0 1 1-1zM2 19h20', pc: 'M4 4h16a1 1 0 0 1 1 1v10H3V5a1 1 0 0 1 1-1zM9 21h6M12 15v6' };
    const all = [
      { id: 1, type: 'mobile', device: 'iPhone 13', issue: 'شاشة مكسورة', desc: 'الشاشة مكسورة واللمس يعمل جزئياً. ٣ صور مرفقة.', meta: 'منذ ٤ دقائق · سموحة', left: '٠٢:١٤:٣٣' },
      { id: 2, type: 'mobile', device: 'Galaxy S22', issue: 'بطارية', desc: 'الشحن لا يصمد أكثر من ساعتين. بدون صور.', meta: 'منذ ١٢ دقيقة · سيدي بشر', left: '٠١:٤٨:١٠' },
      { id: 3, type: 'laptop', device: 'Dell XPS 13', issue: 'سخونة زائدة', desc: 'الجهاز يُغلق نفسه بعد نحو ٢٠ دقيقة من التشغيل. صورتان مرفقتان.', meta: 'منذ ٢٥ دقيقة · العجمي', left: '٠٣:٠٥:٥٢' },
      { id: 4, type: 'tablet', device: 'iPad Air', issue: 'اللمس لا يستجيب', desc: 'نصف الشاشة السفلي لا يستجيب للمس. صورة واحدة.', meta: 'منذ ٤٠ دقيقة · المنتزه', left: '٠٤:٣٠:٠٠' }
    ];
    const labels = { mobile: 'موبايل', tablet: 'تابلت', laptop: 'لابتوب', pc: 'PC' };
    const rows = all.filter((r) => st.filter === 'all' || r.type === st.filter);
    const open = all.find((r) => r.id === st.modalId);
    const h = Number(st.hours) || 0;
    const grace = Math.min(h * 0.2, 24);
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      filters: [['all', 'كل الطلبات'], ['mobile', 'موبايل'], ['tablet', 'تابلت'], ['laptop', 'لابتوب'], ['pc', 'PC']].map(([k, l]) => ({ label: l, cls: st.filter === k ? 'on' : '', pressed: st.filter === k ? 'true' : 'false', pick: () => this.setState({ filter: k }) })),
      requests: rows.map((r) => {
        const o = st.offers[r.id];
        return { ...r, icon: icons[r.type], sent: !!o, notSent: !o, offerText: o ? ar(o.price) + ' جنيه · ' + ar(o.hours) + ' ساعة' : '',
          open: () => this.setState({ modalId: r.id, price: o ? String(o.price) : '', hours: o ? String(o.hours) : '' }) };
      }),
      modal: !!open, mDevice: open ? open.device : '', mIssue: open ? open.issue + ' · ' + labels[open.type] : '',
      price: st.price, hours: st.hours, grace: ar(Number(grace.toFixed(1))),
      setPrice: (e) => this.setState({ price: e.target.value }), setHours: (e) => this.setState({ hours: e.target.value }),
      close: () => this.setState({ modalId: null }),
      submit: () => this.setState((s) => ({ offers: { ...s.offers, [s.modalId]: { price: Number(s.price) || 0, hours: Number(s.hours) || 0 } }, modalId: null }))
    };
  }
}
