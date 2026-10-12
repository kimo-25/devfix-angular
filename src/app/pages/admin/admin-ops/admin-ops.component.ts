import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-admin-ops',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './admin-ops.component.html',
  styleUrl: './admin-ops.component.css',
})
export class AdminOpsComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super();
    this.state = { tab: 'pickup',
      pickups: [{ id: 1, device: 'Galaxy A54', center: 'تك كير', days: 8, amount: 520, contacted: false, closed: false }, { id: 2, device: 'HP Pavilion', center: 'لاب كير', days: 7, amount: 1250, contacted: false, closed: false }],
      bans: [{ id: 1, center: 'فيكس برو', reason: '٣ مخالفات خلال ٣٠ يوماً', ends: 'بعد ٤ أيام', length: '٧ أيام', released: false }, { id: 2, center: 'ورشة النور', reason: 'تكرار الحظر خلال نفس السنة', ends: 'بعد ١٩ يوماً', length: '٣٠ يوماً', released: false }],
      cases: [{ id: 1, type: 'مطالبة ضمان', order: 'iPhone 12 — بطارية', by: 'عميل', text: 'ظهر العطل نفسه بعد ٣ أيام من الاستلام.', decision: null }, { id: 2, type: 'نزاع', order: 'Dell Inspiron — سخونة', by: 'محل', text: 'العميل يرفض سداد التكلفة الإضافية المعتمدة.', decision: null }]
    };
  }
  upd(key, id, fn) { this.setState((s) => ({ [key]: s[key].map((x) => (x.id === id ? { ...x, ...fn(x) } : x)) })); }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const st = this.state;
    const openP = st.pickups.filter((p) => !p.closed).length, activeB = st.bans.filter((b) => !b.released).length, openC = st.cases.filter((c) => !c.decision).length;
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      tabs: [['pickup', 'مهلة الاستلام ٧ أيام', openP], ['bans', 'المحلات المحظورة', activeB], ['cases', 'الضمان والنزاعات', openC]].map(([k, l, n]) => ({ label: l, count: ar(n), cls: st.tab === k ? 'on' : '', pressed: st.tab === k ? 'true' : 'false', pick: () => this.setState({ tab: k }) })),
      tabPickup: st.tab === 'pickup', tabBans: st.tab === 'bans', tabCases: st.tab === 'cases',
      pickups: st.pickups.map((p) => ({ device: p.device, center: p.center, days: ar(p.days), amount: ar(p.amount), open: !p.closed, closed: p.closed, cantClose: !p.contacted, contactText: p.contacted ? 'تم التواصل مع العميل' : 'تواصل مع العميل',
        contact: () => this.upd('pickups', p.id, () => ({ contacted: true })), close: () => this.upd('pickups', p.id, () => ({ closed: true })) })),
      bans: st.bans.map((b) => ({ center: b.center, reason: b.reason, ends: b.ends, length: b.length, active: !b.released, released: b.released, unban: () => this.upd('bans', b.id, () => ({ released: true })) })),
      cases: st.cases.map((c) => ({ type: c.type, order: c.order, by: c.by, text: c.text, open: !c.decision, decided: !!c.decision, decision: c.decision || '',
        accept: () => this.upd('cases', c.id, () => ({ decision: 'قُبلت لصالح مقدّم الطلب وسُجّل القرار' })), reject: () => this.upd('cases', c.id, () => ({ decision: 'رُفضت وسُجّل القرار' })) }))
    };
  }
}
