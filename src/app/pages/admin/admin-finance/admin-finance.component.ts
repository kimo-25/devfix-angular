import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DcBase } from '../../../core/dc-base';
import { DemoNavComponent } from '../../../shared/demo-nav/demo-nav.component';

@Component({
  selector: 'app-admin-finance',
  standalone: true,
  imports: [RouterLink, DemoNavComponent],
  templateUrl: './admin-finance.component.html',
  styleUrl: './admin-finance.component.css',
})
export class AdminFinanceComponent extends DcBase {
  override defaults: Record<string, any> = {};
  constructor() { super(); this.state = { w: [{ id: 1, center: 'مركز النخبة', dest: 'حساب بنكي', amount: 1000, res: null }, { id: 2, center: 'تك كير', dest: 'محفظة إلكترونية', amount: 2400, res: null }, { id: 3, center: 'لاب كير', dest: 'حساب بنكي', amount: 750, res: null }] }; }
  setRes(id, res) { this.setState((s) => ({ w: s.w.map((x) => (x.id === id ? { ...x, res } : x)) })); }
  renderVals() {
    const ar = (n) => Number(n).toLocaleString('ar-EG');
    const data = [[30, 3, 1], [34, 4, 1], [29, 5, 2], [38, 3, 1], [41, 4, 2], [36, 3, 1], [44, 5, 2], [47, 4, 1]];
    const max = Math.max(...data.map((d) => d[0] + d[1] + d[2]));
    return {
      themeClass: (this.props.theme ?? 'light') === 'dark' ? 'dark' : '',
      bars: data.map((d, i) => ({ ok: d[0], grace: d[1], late: d[2], h: Math.round(((d[0] + d[1] + d[2]) / max) * 220), label: 'أ' + ar(i + 1) })),
      withdrawals: this.state.w.map((x) => ({ center: x.center, dest: x.dest, amount: ar(x.amount), open: !x.res, done: !!x.res,
        result: x.res === 'ok' ? 'تم الاعتماد' : 'معلّق للمراجعة', color: x.res === 'ok' ? 'var(--accent)' : 'var(--warn)',
        approve: () => this.setRes(x.id, 'ok'), hold: () => this.setRes(x.id, 'hold') }))
    };
  }
}
